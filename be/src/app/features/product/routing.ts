import express from "express";
import { Action } from "../../../shared/http/types";

import { getProductsActionValidation } from "./actions/get-products.action";

export interface ProductRoutingDependencies {
  getProductsAction: Action;
}

export const productRouting = (actions: ProductRoutingDependencies) => {
  const router = express.Router();

  router.get(
    "/",
    [getProductsActionValidation],
    actions.getProductsAction.invoke.bind(actions.getProductsAction)
  );

  return router;
};
