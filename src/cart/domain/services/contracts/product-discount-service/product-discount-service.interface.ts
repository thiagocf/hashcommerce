export interface ProductDiscountServiceInterface {
  getDiscount(productID: number): Promise<number>;
}
