import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  constructor() {}
  hostName: string = 'http://localhost:3001';
  authenticationRoute: string = '/api/v1/auth';
  productsRoute: string = '/api/v1/products';
  orderRoute: string = '/api/v1/order';
  reviewsRoute: string = '/api/v1/review';
  categoryRoute: string = '/api/v1/category';
  subcategoryRoute: string = '/api/v1/subcategory';
  userRoute: string = '/api/v1/user';
  couponsRoute: string = '/api/v1/coupon';
  productImg: string = `${this.hostName}/products/`;
  userImage: string = `${this.hostName}/users/`;
}
