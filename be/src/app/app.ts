import express from "express";
import helmet from "helmet";
import cors from "cors";
import http from "http";
import { CommandBus } from "@tshio/command-bus";
import { QueryBus } from "@tshio/query-bus";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { StatusCodes } from "http-status-codes";
import pkg from "body-parser";
import { MiddlewareType } from "../shared/middleware-type/middleware.type";
import { NotFoundError } from "../errors/not-found.error";
import { multiFileSwagger } from "../tools/multi-file-swagger";
import { AppConfig } from "../config/app";
import { AddProductCommand } from "./features/product/commands/add-product.command";
import { products } from "../shared/utils/products";

export interface AppDependencies {
  router: express.Router;
  errorHandler: MiddlewareType;
  commandBus: CommandBus;
  queryBus: QueryBus<any>;
  appConfig: AppConfig;
}

async function createApp({
  router,
  errorHandler,
  commandBus,
  queryBus,
  appConfig,
}: AppDependencies) {
  const app = express();
  const httpServer = http.createServer(app);

  const { json } = pkg;

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

  const swaggerDocument = await multiFileSwagger(
    YAML.load("../swagger/api.yaml")
  );
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use("/api", router);
  app.use("*", (req, res, next) => next(new NotFoundError("Page not found")));
  app.use(errorHandler);

  return app;
}

export { createApp };
