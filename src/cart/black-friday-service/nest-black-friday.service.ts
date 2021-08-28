import { Injectable } from '@nestjs/common';
import { BlackFridayService } from '../domain/black-friday-service/black-friday.service';
import { ProductRepositoryService } from '../product-repository/product-repository.service';

@Injectable()
export class NestBlackFridayService extends BlackFridayService {
  constructor(productRepositoryService: ProductRepositoryService) {
    super(productRepositoryService);
  }
}
