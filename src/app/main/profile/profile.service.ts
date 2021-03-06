import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios, { AxiosInstance } from 'axios';
import { AuthService } from 'src/app/auth/auth.service';
import { BACKEND_APP_URL, USER_INFO } from 'src/app/domain/constants';
import { GameItem } from './component/profile/dtos/GameItem.dto';

export interface IUserProfile {
  userName: string;
  userEmail: string;

  games: GameItem[];
}

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly httpClient: AxiosInstance;

  constructor(private readonly router: Router, private readonly authService: AuthService) {
    const info = this.authService.getUserInfoFromLocalStorage(USER_INFO);

    this.httpClient = axios.create({
      baseURL: `${BACKEND_APP_URL}/user`,
      headers: {
        Authorization: `Bearer ${info.token}`,
    },
    });
  }

  async getUserProfile(id: number) {
    const data = this.authService.getUserInfoFromLocalStorage(USER_INFO);
    return await new Promise<IUserProfile>(async (resolve) => {
      await this.httpClient.get(`${id === data.id ? 'me' : id}`).then((data) => {
        const profile = data.data;
        console.log(profile)
        resolve({
          userName: profile.userName,
          userEmail: profile.email,
          games: profile.games.map((g: { name: string; gameId: number; userId: number }) => {
            const game = new GameItem();
            game.name = g.name;
            game.gameId = g.gameId;

            return game;
          })
        });
      })
    })
  }
}
