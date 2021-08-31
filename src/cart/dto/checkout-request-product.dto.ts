import { IsInt, IsDefined } from 'class-validator';
import { CheckoutRequestProductDtoInterface } from '../domain/dto/checkout-request-product.dto.interface';

export class CheckoutRequestProductDto
  implements CheckoutRequestProductDtoInterface
{
  @IsInt()
  @IsDefined()
  id: number;

  @IsInt()
  @IsDefined()
  quantity: number;
}
