import { Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { QueryBus } from "@tshio/query-bus";
import { GetProductsQuery } from "../queries/get-products";
import { Action } from "../../../../shared/http/types";

export interface GetProductsActionDependencies {
  queryBus: QueryBus<any>;
}

export const getProductsActionValidation = celebrate(
  {
    headers: Joi.object(),
  },
  { abortEarly: false }
);

class GetProductsAction implements Action {
  constructor(private dependencies: GetProductsActionDependencies) {}

  async invoke(_req: Request, res: Response) {
    const queryResult = await this.dependencies.queryBus.execute(
      new GetProductsQuery({})
    );

    res.json(queryResult.result);
  }
}
export default GetProductsAction;
