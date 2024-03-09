import { MongoClient } from "mongodb";
import { MongoDbConfig } from "../../config/db";

export interface MongoDBClientDependencies {
  mongoDbConfig: MongoDbConfig;
}

export class MongoDbClient {
  private client: MongoClient;

  constructor(private dependencies: MongoDBClientDependencies) {
    this.client = new MongoClient(this.dependencies.mongoDbConfig.uri);
  }

  private async init() {
    await this.client.connect();
  }

  public async getClient(collectionName: string) {
    await this.init();

    return this.client.db().collection(collectionName);
  }
}
