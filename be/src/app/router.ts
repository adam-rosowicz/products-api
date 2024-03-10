import express from "express";

export interface RoutingDependencies {
  productRouting: express.Router;
  // ROUTES_INTERFACE
}

export const createRouter = ({
  productRouting,
  // ROUTES_DEPENDENCIES
}: RoutingDependencies) => {
  const router = express.Router();
  router.use("/products", productRouting);
  // ROUTES_CONFIG
  return router;
};
