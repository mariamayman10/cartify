import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Signup,
  Signin,
  SendMail,
  verifyCode,
  ResetPassword,
} from '../interfaces/authentication';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  hostName: string = '';
  routeName: string = '';
  constructor(
    private _HttpClient: HttpClient,
    private _Router: Router,
    private _GlobalService: GlobalService
  ) {
    this.hostName = this._GlobalService.hostName;
    this.routeName = this._GlobalService.authenticationRoute;
    if (localStorage.getItem('token')) {
      this.saveCurrentUser();
    }
  }
  currentUser = new BehaviorSubject(null);

  saveCurrentUser() {
    const token: any = localStorage.getItem('token');
    this.currentUser.next(jwtDecode(token));
  }

  checkToken() {
    const token: any = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp! < Date.now() / 1000) {
      this.logout();
      this._Router.navigate(['/home']);
    }
  }
  signUp(formData: Signup): Observable<any> {
    return this._HttpClient.post(
      `${this.hostName}${this.routeName}/signup`,
      formData
    );
  }

  signIn(formData: Signin): Observable<any> {
    return this._HttpClient.post(
      `${this.hostName}${this.routeName}/signin`,
      formData
    );
  }
  sendMail = (formData: SendMail): Observable<any> => {
    return this._HttpClient.post(
      `${this.hostName}${this.routeName}/forgetPassword`,
      formData
    );
  };
  verifyCode = (formData: verifyCode): Observable<any> => {
    return this._HttpClient.post(
      `${this.hostName}${this.routeName}/verifyResetCode`,
      formData,
      { headers: { authorization: `Bearer ${localStorage.getItem('verify')}` } }
    );
  };
  resetPassword = (formData: ResetPassword): Observable<any> => {
    return this._HttpClient.put(
      `${this.hostName}${this.routeName}/resetPassword`,
      formData,
      { headers: { authorization: `Bearer ${localStorage.getItem('verify')}` } }
    );
  };
  logout() {
    localStorage.removeItem('token');
    this.currentUser.next(null);
  }
}
