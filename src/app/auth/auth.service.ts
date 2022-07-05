import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import {
  BACKEND_APP_URL,
  INVALID_CREDENTIALS,
  USER_INFO,
} from '../domain/constants';
import { AuthLoginRequest } from './dtos/auth-login-request.dto';
import { UserInfo } from './dtos/user-info.dto';
import jwt_decode from 'jwt-decode';
import { AuthRegisterRequest } from './dtos/auth-register-request.dto';
import { JwtDecodedInfo } from '../domain/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axios.create({
      baseURL: `${BACKEND_APP_URL}/auth`,
    });
  }

  async login(req: AuthLoginRequest) {
    return new Promise(async (resolve) => {
      await this.httpClient
        .post<string>('/login', { login: req.login, password: req.password })
        .then((data: any) => {
          if (typeof data.data !== 'string') {
            alert('response data is not a string');
          }
          const token = data.data;
          const decoded = jwt_decode(token) as JwtDecodedInfo;

          this.putTokenInLocalStorage(
            USER_INFO,
            new UserInfo(decoded.login, decoded.id, decoded.role, token)
          );
        })
        .catch((err: any) => {
          const statusCode = err.response.data.statusCode;
          if (statusCode === 401) {
            resolve(INVALID_CREDENTIALS);
          }
          resolve('Other error');
        });
    });
  }

  async register(req: AuthRegisterRequest) {
    return new Promise(async (resolve) => {
      const data = await this.httpClient
        .post<string>('/register', {
          login: req.login,
          password: req.password,
          userName: req.userName,
          email: req.email,
          loginNow: true,
        })
        .then((data: any) => {
          if (typeof data.data !== 'string') {
            alert('response data is not a string');
          }
          const token = data.data;
          const decoded = jwt_decode(token) as JwtDecodedInfo;

          this.putTokenInLocalStorage(
            USER_INFO,
            new UserInfo(decoded.login, decoded.id, decoded.role, token)
          );
        })
        .catch((err: any) => {
          throw new Error(err.message);
        });
    });
  }

  private putTokenInLocalStorage(key: string, data: UserInfo) {
    localStorage.setItem(key, JSON.stringify(data));
  }
}
