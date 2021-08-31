import { Module } from '@nestjs/common';
import { ProductRepositoryService } from './product-repository/product-repository.service';
import { BlackFridayService } from './domain/use-cases/checkout/black-friday-service/black-friday.service';
import { ProductDiscountService } from './product-discount-service/product-discount.service';
import { CheckoutPresenter } from './checkout-presenter/checkout-presenter';
import { NestCheckoutUseCase } from './checkout-usecase/nest-checkout.usecase';
import { CartController } from './cart.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

const DISCOUNT_SERVICE_HOST =
  process.env.DISCOUNT_SERVICE_HOST || 'discount-service';
const DISCOUNT_SERVICE_PORT = process.env.DISCOUNT_SERVICE_PORT || '50051';
@Module({
  controllers: [CartController],
  providers: [
    ProductRepositoryService,
    BlackFridayService,
    ProductDiscountService,
    CheckoutPresenter,
    NestCheckoutUseCase,
  ],
  imports: [
    ClientsModule.register([
      {
        name: 'DISCOUNT_GRPC_SERVICE',
        transport: Transport.GRPC,
        options: {
          url: `${DISCOUNT_SERVICE_HOST}:${DISCOUNT_SERVICE_PORT}`,
          package: 'discount',
          protoPath: join(__dirname, 'product-discount-service/discount.proto'),
        },
      },
    ]),
  ],
})
export class CartModule {}
