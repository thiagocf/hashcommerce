import { CheckoutRequestProductDto } from './checkout-request-product.dto';
import { IsArray, ArrayNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CheckoutRequestDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => CheckoutRequestProductDto)
  products: CheckoutRequestProductDto[];
}
