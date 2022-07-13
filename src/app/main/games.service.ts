import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import axios, { AxiosInstance } from 'axios';
import { AuthService } from "../auth/auth.service";
import { BACKEND_APP_URL, USER_INFO } from "../domain/constants";
import { GameItem } from "./profile/component/profile/dtos/GameItem.dto";

@Injectable({
    providedIn: 'root',
  })
  export class GamesService {
    private readonly httpClient: AxiosInstance;
  constructor(private readonly router: Router, private readonly authService: AuthService) {
    const info = this.authService.getUserInfoFromLocalStorage(USER_INFO);

        this.httpClient = axios.create({
            baseURL: `${BACKEND_APP_URL}/game`,
            headers: {
              Authorization: `Bearer ${info.token}`,
          },
          });
    }

    async getAllGames() {
      return await new Promise<GameItem[]>( async (resolve) => {
        await this.httpClient.get('').then((data) => {
          const games = data.data;

          resolve(games.map((g: { id: number, name: string}) => {
            const game = new GameItem();
            game.gameId = g.id;
            game.name = g.name;

            return game;
          }))
        })
      })
    }
  }