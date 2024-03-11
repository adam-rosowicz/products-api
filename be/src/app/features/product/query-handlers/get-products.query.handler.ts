import { QueryHandler } from "@tshio/query-bus";
import {
  GET_PRODUCTS_QUERY_TYPE,
  GetProductsQuery,
  GetProductsQueryResult,
} from "../queries/get-products";
import { ProductRepository } from "../repositories/product.repository";
import { ProductEntity } from "../models/product.model";

export interface GetProductsQueryHandlerDependencies {
  productRepository: ProductRepository;
}

export default class GetProductsQueryHandler
  implements QueryHandler<GetProductsQuery, GetProductsQueryResult>
{
  constructor(private dependencies: GetProductsQueryHandlerDependencies) {}

  public queryType: string = GET_PRODUCTS_QUERY_TYPE;

  async execute(query: GetProductsQuery): Promise<GetProductsQueryResult> {
    const { productRepository } = this.dependencies;

    const products = await productRepository.getProducts();

    return { result: products };
  }
}
