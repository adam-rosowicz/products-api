import express from "express";
import { Action } from "../../../shared/http/types";

import { getProductsActionValidation } from "./actions/get-products.action";
// VALIDATION_IMPORTS

export interface ProductRoutingDependencies {
  getProductsAction: Action;
  // ACTIONS_IMPORTS
}

export const productRouting = (actions: ProductRoutingDependencies) => {
  const router = express.Router();

  router.get("/", [getProductsActionValidation], actions.getProductsAction.invoke.bind(actions.getProductsAction));
  // ACTIONS_SETUP

  return router;
};
