import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  hostName: string = '';
  routeName: string = '';
  userImg: string = '';
  constructor(
    private _HttpClient: HttpClient,
    private _GlobalService: GlobalService
  ) {
    this.hostName = this._GlobalService.hostName;
    this.routeName = this._GlobalService.userRoute;
    this.userImg = this._GlobalService.userImage;
  }
  getUsers(
    limit: number = 50,
    page: number = 1,
    sort: string = '-createdAt',
    search: string,
    role: string = 'admin'
  ): Observable<any> {
    return this._HttpClient.get(
      `${this.hostName}${this.routeName}?limit=${limit}&page=${page}&sort=${sort}&search=${search}&role=${role}&fields=-password`,
      { headers: { authorization: `Bearer ${localStorage.getItem('adminToken')}` } }
    );
  }

  getUser = (userId: string): Observable<any> => {
    return this._HttpClient.get(`${this.hostName}${this.routeName}/${userId}`, {
      headers: { authorization: `Bearer ${localStorage.getItem('adminToken')}` },
    });
  };

  createUser(formData: User): Observable<any> {
    return this._HttpClient.post(
      `${this.hostName}${this.routeName}`,
      formData,
      {
        headers: { authorization: `Bearer ${localStorage.getItem('adminToken')}` },
      }
    );
  }

  updateUser(userId: string, formData: FormData): Observable<any> {
    return this._HttpClient.put(
      `${this.hostName}${this.routeName}/${userId}`,
      formData,
      { headers: { authorization: `Bearer ${localStorage.getItem('adminToken')}` } }
    );
  }

  updateUserPassword(userId: string, formData: FormData): Observable<any> {
    return this._HttpClient.put(
      `${this.hostName}${this.routeName}/${userId}/changePassword`,
      formData,
      { headers: { authorization: `Bearer ${localStorage.getItem('adminToken')}` } }
    );
  }

  deleteUser(userId: string): Observable<any> {
    return this._HttpClient.delete(
      `${this.hostName}${this.routeName}/${userId}`,
      { headers: { authorization: `Bearer ${localStorage.getItem('adminToken')}` } }
    );
  }
}
