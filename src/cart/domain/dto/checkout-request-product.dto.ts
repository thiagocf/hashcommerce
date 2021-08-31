import { IsInt, IsDefined } from 'class-validator';

export class CheckoutRequestProductDto {
  @IsInt()
  @IsDefined()
  id: number;

  @IsInt()
  @IsDefined()
  quantity: number;
}
