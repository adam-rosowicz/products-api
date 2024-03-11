import { AwilixContainer, Lifetime, asClass, asFunction } from "awilix";
import { productRouting } from "../app/features/product/routing";
// ROUTING_IMPORTS

export async function registerRouting(container: AwilixContainer) {
  container.loadModules(["src/app/**/*.action.js"], {
    formatName: "camelCase",
    resolverOptions: {
      lifetime: Lifetime.SCOPED,
      register: asClass,
    },
  });

  container.register({
    productRouting: asFunction(productRouting),
  });

  return container;
}
