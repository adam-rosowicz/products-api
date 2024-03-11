import { AwilixContainer, asFunction } from "awilix";
import { errorHandler } from "../middleware/error-handler";
import { authorization } from "../middleware/auth";

export async function registerMiddlewares(container: AwilixContainer) {
  container.register({
    errorHandler: asFunction(errorHandler),
    authorization: asFunction(authorization),
  });

  return container;
}
