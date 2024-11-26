import { Injectable } from '@angular/core';
import { AuthApi } from './base/authApi';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthEndpoints } from './enums/auth-api-endpoints';
import { AuthApiAdapter } from './adapter/auth-api.adapter';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService implements AuthApi {
  constructor(
    private _httpClient: HttpClient,
    private _authApiAdapter: AuthApiAdapter
  ) {}

  login(data: any): Observable<any> {
    return this._httpClient.post(AuthEndpoints.LOGIN, data).pipe(
      map((res) => this._authApiAdapter.loginAdapt(res)),
      catchError((err) => of([]))
    );
  }

  register(data: any): Observable<any> {
    return this._httpClient.post(AuthEndpoints.REGISTER, data).pipe(
      map((res) => this._authApiAdapter.registerAdapt(res)),
      catchError((err) => of([]))
    );
  }

  logout(): Observable<any> {
    return this._httpClient.get(AuthEndpoints.LOGOUT);
  }

  changePassword(data: any): Observable<any> {
    return this._httpClient.post(AuthEndpoints.CHANGE_PASSWORD, data);
  }

  resetPassword(data: any): Observable<any> {
    return this._httpClient.post(AuthEndpoints.RESET_PASSWORD, data);
  }

  forgetPassword(data: any): Observable<any> {
    return this._httpClient.post(AuthEndpoints.FORGET_PASSWORD, data);
  }

  verifyCode(data: any): Observable<any> {
    return this._httpClient.post(AuthEndpoints.VERIFY_CODE, data);
  }

  userInfo(): Observable<any> {
    return this._httpClient.get(AuthEndpoints.USER_INFO);
  }

  editProfile(data: any): Observable<any> {
    return this._httpClient.post(AuthEndpoints.EDIT_PROFILE, data);
  }

  deleteUser(): Observable<any> {
    return this._httpClient.get(AuthEndpoints.DELETE_ACCOUNT);
  }
}
