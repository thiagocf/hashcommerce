import { Product } from '../entities/product.entity';

export interface ProductRepositoryInterface {
  get(id: number): Product;
}
