import { CommandHandler } from "@tshio/command-bus";
import { Logger } from "@tshio/logger";
import {
  ADD_PRODUCT_COMMAND_TYPE,
  AddProductCommand,
} from "../commands/add-product.command";
import { ProductRepository } from "../repositories/product.repository";
import { ProductEntity } from "../models/product.model";

export interface AddProductHandlerDependencies {
  logger: Logger;
  productRepository: ProductRepository;
}

export default class AddProductHandler
  implements CommandHandler<AddProductCommand>
{
  public commandType: string = ADD_PRODUCT_COMMAND_TYPE;

  constructor(private dependencies: AddProductHandlerDependencies) {}

  async execute(command: AddProductCommand) {
    // execute body
    this.dependencies.logger.info("Command AddProduct executed");

    const { productRepository } = this.dependencies;
    const { product } = command.payload;

    await productRepository.addProduct(ProductEntity.create(product));

    return {
      result: command,
    };
  }
}
