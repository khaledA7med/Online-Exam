import { Injectable } from '@angular/core';
import { Adapter } from '../interfaces/adapter';

@Injectable({
  providedIn: 'root',
})
export class AuthApiAdapter implements Adapter {
  constructor() {}

  loginAdapt(data: any) {
    return {
      message: data.message,
      token: data.token,
    };
  }
  registerAdapt(data: any) {
    return {
      message: data.message,
    };
  }
}
