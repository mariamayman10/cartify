import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';
import { Subcategory } from '../interfaces/subcategory';

@Injectable({
  providedIn: 'root',
})
export class SubcategoryService {
  private hostName: string = '';
  private routeName: string = '';
  private categoryRoute: string = '';
  constructor(
    private _HttpClient: HttpClient,
    private _GlobalService: GlobalService
  ) {
    this.hostName = this._GlobalService.hostName;
    this.routeName = this._GlobalService.subcategoryRoute;
    this.categoryRoute = this._GlobalService.categoryRoute;
  }

  getSubcategories(
    limit: number = 15,
    page: number = 1,
    sort: string = '-createdAt',
    search: string,
    categoryId?: string
  ): Observable<any> {
    if (categoryId !== undefined) {
      return this._HttpClient.get(
        `${this.hostName}/api/v1/category/${categoryId}/subcategory`
      );
    } else {
      return this._HttpClient.get(
        `${this.hostName}${this.routeName}?limit=${limit}&page=${page}&sort=${sort}&search=${search}`
      );
    }
  }

  getSubcategory(subcategoryId: string): Observable<any> {
    return this._HttpClient.get(
      `${this.hostName}${this.routeName}/${subcategoryId}`
    );
  }

  createSubcategory(formData: Subcategory): Observable<any> {
    return this._HttpClient.post(
      `${this.hostName}${this.routeName}`,
      formData,
      {
        headers: { authorization: `Bearer ${localStorage.getItem('adminToken')}` },
      }
    );
  }

  updateSubcategory(subcategoryId: string, formData: Subcategory): Observable<any> {
    return this._HttpClient.put(
      `${this.hostName}${this.routeName}/${subcategoryId}`,
      formData,
      { headers: { authorization: `Bearer ${localStorage.getItem('adminToken')}` } }
    );
  }

  deleteSubcategory(subcategoryId: string): Observable<any> {
    return this._HttpClient.delete(
      `${this.hostName}${this.routeName}/${subcategoryId}`,
      { headers: { authorization: `Bearer ${localStorage.getItem('adminToken')}` } }
    );
  }

  getSpecificSubcategories = (
    categoryId: string,
    limit: number = 200,
    sort: string = 'name'
  ): Observable<any> => {
    return this._HttpClient.get(
      `${this.hostName}${this.categoryRoute}/${categoryId}/subcategory?limit=${limit}&sort=${sort}`
    );
  };
}
