import express from "express";
import helmet from "helmet";
import cors from "cors";
import { CommandBus } from "@tshio/command-bus";
import { StatusCodes } from "http-status-codes";
import { MiddlewareType } from "../shared/middleware-type/middleware.type";
import { NotFoundError } from "../errors/not-found.error";
import { AddProductCommand } from "./features/product/commands/add-product.command";
import { products } from "../shared/utils/products";

export interface AppDependencies {
  router: express.Router;
  errorHandler: MiddlewareType;
  commandBus: CommandBus;
}

async function createApp({
  router,
  errorHandler,
  commandBus,
}: AppDependencies) {
  const app = express();

  app.use(cors());
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          scriptSrc: ["'self'", "https: 'unsafe-inline'"],
        },
      },
    })
  );

  app.use(express.json());

  app.get("/health", (req, res) => {
    res.status(StatusCodes.OK).json({
      status: "ok",
    });
  });

  await Promise.all(
    products.map(async (product) => {
      await commandBus.execute(new AddProductCommand({ product }));
    })
  );

  app.use("/api", router);
  app.use("*", (req, res, next) => next(new NotFoundError("Page not found")));
  app.use(errorHandler);

  return app;
}

export { createApp };
