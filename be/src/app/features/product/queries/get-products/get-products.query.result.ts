import { QueryResult } from "@tshio/query-bus";

export class GetProductsQueryResult implements QueryResult<any> {
  constructor(public result: any) {}
}
