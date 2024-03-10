import { AwilixContainer, asClass } from "awilix";
import { asArray } from "@tshio/awilix-resolver";

import GetProductsQueryHandler from "../app/features/product/query-handlers/get-products.query.handler";
// HANDLERS_IMPORTS

export async function registerQueryHandlers(container: AwilixContainer) {
  container.register({
    queryHandlers: asArray<any>([
      asClass(GetProductsQueryHandler),
      // QUERY_HANDLERS_SETUP
    ]),
  });

  return container;
}
