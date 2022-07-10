import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios, { AxiosInstance } from 'axios';
import { AuthService } from 'src/app/auth/auth.service';
import { BACKEND_APP_URL, USER_INFO } from 'src/app/domain/constants';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly httpClient: AxiosInstance;

  constructor(private readonly router: Router, private readonly authService: AuthService) {
    this.httpClient = axios.create({
      baseURL: `${BACKEND_APP_URL}/user`,
    });
  }

  async getUserProfile(id: number) {
    const data = this.authService.getUserInfoFromLocalStorage(USER_INFO);
    await new Promise(async (resolve) => {
      await this.httpClient.get(`${id === data.id ? 'me' : id}`).then((data) => {
        console.log(data);
      })
    })
  }
}
