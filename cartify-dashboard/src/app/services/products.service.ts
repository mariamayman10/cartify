import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  hostName: string = '';
  routeName: string = '';
  productImg: string = '';
  constructor(
    private _HttpClient: HttpClient,
    private _GlobalService: GlobalService
  ) {
    this.hostName = this._GlobalService.hostName;
    this.routeName = this._GlobalService.productsRoute;
    this.productImg = this._GlobalService.productImg;
  }

  getProducts = (
    limit: number = 15,
    page: number = 1,
    sort: string = '-createdAt',
    search: string
  ): Observable<any> => {
    return this._HttpClient.get(
      `${this.hostName}${this.routeName}?limit=${limit}&page=${page}&sort=${sort}&search=${search}`,
      {
        headers: { authorization: `Bearer ${localStorage.getItem('adminToken')}` },
      }
    );
  };

  getProduct = (productId: string): Observable<any> => {
    return this._HttpClient.get(
      `${this.hostName}${this.routeName}/${productId}`,
      {
        headers: { authorization: `Bearer ${localStorage.getItem('adminToken')}` },
      }
    );
  };

  createProduct = (formData: FormData): Observable<any> => {
    return this._HttpClient.post(
      `${this.hostName}${this.routeName}`,
      formData,
      {
        headers: { authorization: `Bearer ${localStorage.getItem('adminToken')}` },
      }
    );
  };

  updateProduct = (productId: string, formData: any): Observable<any> => {
    return this._HttpClient.put(
      `${this.hostName}${this.routeName}/${productId}`,
      formData,
      {
        headers: { authorization: `Bearer ${localStorage.getItem('adminToken')}` },
      }
    );
  };

  deleteProduct = (productId: string): Observable<any> => {
    return this._HttpClient.delete(
      `${this.hostName}${this.routeName}/${productId}`,
      {
        headers: { authorization: `Bearer ${localStorage.getItem('adminToken')}` },
      }
    );
  };
}
