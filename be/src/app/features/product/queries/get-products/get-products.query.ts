import { Query } from "@tshio/query-bus";

export const GET_PRODUCTS_QUERY_TYPE = "product/GET_PRODUCTS";

export interface GetProductsQueryPayload {}

export class GetProductsQuery implements Query<GetProductsQueryPayload> {
  public type: string = GET_PRODUCTS_QUERY_TYPE;

  constructor(public payload: GetProductsQueryPayload) {}
}
