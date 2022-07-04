import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { catchError } from 'rxjs';
import { BACKEND_APP_URL, INVALID_CREDENTIALS } from '../domain/constants';
import { AuthLoginRequest } from './dtos/auth-login-request.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly httpClient: AxiosInstance

  constructor() {
    this.httpClient = axios.create({
      baseURL: `${BACKEND_APP_URL}/auth`
    })
  }

  async login(req: AuthLoginRequest) {
    return new Promise(async (resolve) => {
       const data = await this.httpClient.post<string>('/login', {login: req.login, password: req.password}).then((data: any) =>{
      if(data.data) {
        console.log(data.data)
      }
    }).catch((err: any) => {
      const statusCode = err.response.data.statusCode;
      resolve(INVALID_CREDENTIALS)
    })
    })
   
  }
}
