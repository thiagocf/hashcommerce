import { Injectable } from '@nestjs/common';
import { ProductRepositoryInterface } from '../domain/services/contracts/product-repository.interface';
import { Product } from '../domain/entities/product.entity';
import { PRODUCT_LIST } from './products';

@Injectable()
export class ProductRepositoryService implements ProductRepositoryInterface {
  get(id: number): Product {
    const { is_gift: isGift, ...otherAttributes } = PRODUCT_LIST.find(
      (product) => product.id === id,
    );
    return {
      isGift,
      ...otherAttributes,
    };
  }
  getAGift(): Product {
    const { is_gift: isGift, ...otherAttributes } = PRODUCT_LIST.find(
      (product) => product.is_gift,
    );
    return {
      isGift,
      ...otherAttributes,
    };
  }
}
