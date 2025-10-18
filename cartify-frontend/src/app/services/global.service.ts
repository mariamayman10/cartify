import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  constructor() {}
  hostName: string = 'http://localhost:3001';
  authenticationRoute: string = '/api/v1/auth';
  productsRoute: string = '/api/v1/products';
  cartRoute: string = '/api/v1/cart';
  orderRoute: string = '/api/v1/order';
  wishlistRoute: string = '/api/v1/wishlist';
  reviewsRoute: string = '/api/v1/review';
  categoryRoute: string = '/api/v1/category';
  subcategoryRoute: string = '/api/v1/subcategory';
  userRoute: string = '/api/v1/user';
  productImg: string = `${this.hostName}/products/`;
  userImage: string = `${this.hostName}/users/`;
}
