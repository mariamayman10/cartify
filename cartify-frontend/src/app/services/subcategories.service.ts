import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubcategoriesService {
  hostName: string = '';
  routeName: string = '';
  constructor(
    private _HttpClient: HttpClient,
    private _GlobalService: GlobalService
  ) {
    this.hostName = this._GlobalService.hostName;
    this.routeName = this._GlobalService.categoryRoute;
  }
  getSpecificSubcategories = (cateoryId: string): Observable<any> => {
    return this._HttpClient.get(`${this.hostName}${this.routeName}/${cateoryId}/subcategory`);
  };
}
