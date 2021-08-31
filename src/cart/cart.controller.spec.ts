import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from './cart.controller';
import { ProductRepositoryService } from './product-repository/product-repository.service';
import { BlackFridayService } from './domain/use-cases/checkout/black-friday-service/black-friday.service';
import { ProductDiscountService } from './product-discount-service/product-discount.service';
import { CheckoutPresenter } from './checkout-presenter/checkout-presenter';

describe('CartController', () => {
  let controller: CartController;
  const discountService = {
    getDiscount: jest.fn(() => ({
      toPromise: jest.fn(() => Promise.resolve(0.05)),
    })),
  };
  const mocksDiscountGrpcClient = {
    getService: jest.fn(() => discountService),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [
        ProductRepositoryService,
        BlackFridayService,
        ProductDiscountService,
        CheckoutPresenter,
        {
          provide: 'DISCOUNT_GRPC_SERVICE',
          useValue: mocksDiscountGrpcClient,
        },
      ],
    }).compile();

    controller = module.get<CartController>(CartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
