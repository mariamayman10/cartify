import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl: string = '';
  private routeName: string = '';
  constructor(
    private _HttpClient: HttpClient,
    private _GlobalService: GlobalService
  ) {
    this.apiUrl = this._GlobalService.hostName;
    this.routeName = this._GlobalService.orderRoute;
  }

  getOrders(
    limit: number = 50,
    page: number = 1,
    sort: string = '-createdAt',
    search: string
  ): Observable<any> {
    return this._HttpClient.get(
      `${this.apiUrl}${this.routeName}?limit=${limit}&page=${page}&sort=${sort}&search=${search}`,
      { headers: { authorization: `Bearer ${localStorage.getItem('adminToken')}` } }
    );
  }

  getOrder(orderId: string): Observable<any> {
    return this._HttpClient.get(`${this.apiUrl}${this.routeName}/${orderId}`, {
      headers: { authorization: `Bearer ${localStorage.getItem('adminToken')}` },
    });
  }

  updateDeliveredOrder(orderId: string): Observable<any> {
    return this._HttpClient.put(
      `${this.apiUrl}${this.routeName}/${orderId}/deliver`,
      {},
      { headers: { authorization: `Bearer ${localStorage.getItem('adminToken')}` } }
    );
  }

  updatePaidOrder(orderId: string): Observable<any> {
    return this._HttpClient.put(
      `${this.apiUrl}${this.routeName}/${orderId}/pay`,
      {},
      { headers: { authorization: `Bearer ${localStorage.getItem('adminToken')}` } }
    );
  }
}
