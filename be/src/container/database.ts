import { AwilixContainer, asValue, asClass } from "awilix";
import { MongoDbClient } from "../app/clients/mongo.client";

export async function registerDatabase(container: AwilixContainer) {
  container.register({
    mongoDbClient: asClass(MongoDbClient),
  });
}
