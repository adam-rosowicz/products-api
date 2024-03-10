import { Command } from "@tshio/command-bus";
import { IProduct } from "../models/product.model";

export const ADD_PRODUCT_COMMAND_TYPE = "products/ADD_PRODUCT";

interface AddProductCommandPayload {
  product: IProduct;
}

export class AddProductCommand implements Command<AddProductCommandPayload> {
  public type: string = ADD_PRODUCT_COMMAND_TYPE;

  constructor(public payload: AddProductCommandPayload) {}
}
