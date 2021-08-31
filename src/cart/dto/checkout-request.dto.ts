import { CheckoutRequestProductDto } from './checkout-request-product.dto';
import { IsArray, ArrayNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CheckoutRequestDtoInterface } from '../domain/dto/checkout-request.dto.interface';

export class CheckoutRequestDto implements CheckoutRequestDtoInterface {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => CheckoutRequestProductDto)
  products: CheckoutRequestProductDto[];
}
