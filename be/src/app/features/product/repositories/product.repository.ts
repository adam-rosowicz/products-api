import { ProductEntity } from "../models/product.model";

export interface ProductRepository {
  getProducts: () => Promise<ProductEntity[]>;
  addProduct(product: ProductEntity): Promise<void>;
}
