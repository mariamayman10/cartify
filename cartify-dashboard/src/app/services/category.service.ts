import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private hostName: string = '';
  private routeName: string = '';
  constructor(
    private _HttpClient: HttpClient,
    private _GlobalService: GlobalService
  ) {
    this.hostName = this._GlobalService.hostName;
    this.routeName = this._GlobalService.categoryRoute;
  }

  getCategories(
    limit: number = 15,
    page: number = 1,
    sort: string = '-createdAt',
    search: string
  ): Observable<any> {
    return this._HttpClient.get(
      `${this.hostName}${this.routeName}?limit=${limit}&page=${page}&sort=${sort}&search=${search}`
    );
  }

  getCategory(categoryId: string): Observable<any> {
    return this._HttpClient.get(
      `${this.hostName}${this.routeName}/${categoryId}`
    );
  }

  createCategory(formData: Category): Observable<any> {
    return this._HttpClient.post(
      `${this.hostName}${this.routeName}`,
      formData,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      }
    );
  }

  updateCategory(categoryId: string, formData: Category): Observable<any> {
    return this._HttpClient.put(
      `${this.hostName}${this.routeName}/${categoryId}`,
      formData,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      }
    );
  }

  deleteCategory(categoryId: string): Observable<any> {
    return this._HttpClient.delete(
      `${this.hostName}${this.routeName}/${categoryId}`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      }
    );
  }
}
