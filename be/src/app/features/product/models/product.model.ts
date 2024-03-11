import { randomUUID } from "crypto";

export type EnergyClass = "A" | "B" | "C";

export type Capacity = 8 | 9 | 10.5;

export type Features =
  | "Drzwi AddWash™"
  | "Panel AI Control"
  | "Silnik inwerterowy"
  | "Wyświetlacz elektroniczny";

export interface IProduct {
  id?: string;
  image: string;
  code: string;
  name: string;
  color: string;
  capacity: Capacity;
  dimensions: string;
  features: Features[];
  energyClass: EnergyClass;
  price: {
    value: number;
    currency: string;
    installment: {
      value: number;
      period: number;
    };
    validFrom: Date;
    validTo: Date;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export class ProductEntity {
  public static create(data: Partial<IProduct>): ProductEntity {
    const entity = new ProductEntity();
    entity.id = randomUUID();
    entity.createdAt = new Date();
    entity.updatedAt = new Date();
    Object.assign(entity, data);
    return entity;
  }

  id: string;
  image: string;
  code: string;
  name: string;
  color: string;
  capacity: Capacity;
  dimensions: string;
  features: Features[];
  energyClass: EnergyClass;
  price: {
    value: number;
    currency: string;
    installment: {
      value: number;
      period: number;
    };
    validFrom: Date;
    validTo: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}
