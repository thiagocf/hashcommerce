import { CheckoutUseCase } from '../domain/use-cases/checkout/checkout.usecase';
import { Injectable } from '@nestjs/common';
import { ProductDiscountService } from '../product-discount-service/product-discount.service';
import { BlackFridayService } from '../domain/use-cases/checkout/black-friday-service/black-friday.service';
import { ProductRepositoryService } from '../product-repository/product-repository.service';

@Injectable()
export class NestCheckoutUseCase extends CheckoutUseCase {
  constructor(
    productDiscountService: ProductDiscountService,
    blackFridayService: BlackFridayService,
    productRepository: ProductRepositoryService,
  ) {
    super(productDiscountService, blackFridayService, productRepository);
  }
}
