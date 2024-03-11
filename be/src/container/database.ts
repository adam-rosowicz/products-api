import { AwilixContainer, asValue, asClass } from "awilix";
import { MongoDbClient } from "../app/clients/mongo.client";
import { MongoDbProductRepository } from "../app/features/product/repositories/mongodb-product.repository";

export async function registerDatabase(container: AwilixContainer) {
  container.register({
    mongoDbClient: asClass(MongoDbClient),
    productRepository: asClass(MongoDbProductRepository),
  });
}
