import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';
import { Coupon } from '../interfaces/coupon';

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  hostName: string = '';
  routeName: string = '';
  constructor(
    private _HttpClient: HttpClient,
    private _GlobalService: GlobalService
  ) {
    this.hostName = this._GlobalService.hostName;
    this.routeName = this._GlobalService.couponsRoute;
  }

  getCoupons = (
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

  getCoupon = (couponId: string): Observable<any> => {
    return this._HttpClient.get(
      `${this.hostName}${this.routeName}/${couponId}`,
      {
        headers: { authorization: `Bearer ${localStorage.getItem('adminToken')}` },
      }
    );
  };

  createCoupon = (formData: Coupon): Observable<any> => {
    return this._HttpClient.post(
      `${this.hostName}${this.routeName}`,
      formData,
      {
        headers: { authorization: `Bearer ${localStorage.getItem('adminToken')}` },
      }
    );
  };

  updateCoupon = (couponId: string, formData: Coupon): Observable<any> => {
    return this._HttpClient.put(
      `${this.hostName}${this.routeName}/${couponId}`,
      formData,
      {
        headers: { authorization: `Bearer ${localStorage.getItem('adminToken')}` },
      }
    );
  };

  sendCoupon = (userId: string, couponId: string): Observable<any> => {
    return this._HttpClient.post(`${this.hostName}${this.routeName}/${couponId}/send`, userId, {
      headers: { authorization: `Bearer ${localStorage.getItem('adminToken')}` },
    });
  };

  deleteCoupon = (couponId: string): Observable<any> => {
    return this._HttpClient.delete(
      `${this.hostName}${this.routeName}/${couponId}`,
      {
        headers: { authorization: `Bearer ${localStorage.getItem('adminToken')}` },
      }
    );
  };
}
