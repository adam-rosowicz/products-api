import { MongoCollection, MongoDbClient } from "../../../clients/mongo.client";
import { ProductEntity } from "../models/product.model";
import { ProductRepository } from "./product.repository";

export interface MongoDbProductRepositoryDependencies {
  mongoDbClient: MongoDbClient;
}

export class MongoDbProductRepository implements ProductRepository {
  private client: MongoDbClient;

  constructor(private dependencies: MongoDbProductRepositoryDependencies) {
    this.client = this.dependencies.mongoDbClient;
  }

  async getProducts(): Promise<ProductEntity[]> {
    const collection = await this.client.getCollection("products");
    const result = await collection.find({}).toArray();

    return result as any;
  }

  async addProduct(product: ProductEntity): Promise<void> {
    const collection = await this.client.getCollection("products");
    const x = this.client
    await collection.insertOne(product);
  }
}
