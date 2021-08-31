import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { GetDiscountRequest } from '../domain/services/contracts/product-discount-service/get-discount-request.interface';
import { GetDiscountResponse } from '../domain/services/contracts/product-discount-service/get-discount-response.interface';

import { ProductDiscountServiceInterface } from '../domain/services/contracts/product-discount-service/product-discount-service.interface';

export interface ProductDiscountGrpcServiceInterface {
  getDiscount(productID: GetDiscountRequest): Observable<GetDiscountResponse>;
}

@Injectable()
export class ProductDiscountService
  implements OnModuleInit, ProductDiscountServiceInterface
{
  private discountService: ProductDiscountGrpcServiceInterface;

  constructor(@Inject('DISCOUNT_GRPC_SERVICE') private client: ClientGrpc) {}

  async getDiscount(productID: number): Promise<number> {
    try {
      const { percentage } = await this.discountService
        .getDiscount({ productID })
        .toPromise();
      return percentage || 0;
    } catch (err) {
      console.log(err);
      return 0;
    }
  }

  onModuleInit() {
    this.discountService =
      this.client.getService<ProductDiscountGrpcServiceInterface>('Discount');
  }
}
