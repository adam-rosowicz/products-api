import { AwilixContainer, asClass } from "awilix";
import { asArray } from "@tshio/awilix-resolver";

import GetProductsQueryHandler from "../app/features/product/query-handlers/get-products.query.handler";
import AddProductsCommandHandler from "../app/features/product/handlers/add-product.handler";
// HANDLERS_IMPORTS

export async function registerCommandHandlers(container: AwilixContainer) {
  container.register({
    commandHandlers: asArray<any>([
      asClass(GetProductsQueryHandler),
      asClass(AddProductsCommandHandler),
      // COMMAND_HANDLERS_SETUP
    ]),
  });

  return container;
}
