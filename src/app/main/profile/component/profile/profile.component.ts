import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { USER_INFO } from 'src/app/domain/constants';
import { GamesService } from 'src/app/main/games.service';
import { IUserProfile, ProfileService } from '../../profile.service';
import { GameItem } from './dtos/GameItem.dto';
import { UserProfile } from './dtos/user-profile.dto';

export interface IGameInfo {
  gameId: number;
  userId: number;
  name: number;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  /* Boolean for displaying elements */
  credentialsChosen = true;
  paymentsChosen = false;
  notificationsChosen = false;
  updateProfile = false;
  yourProfile = true;

  allGames: GameItem[] = [];
  userProfile: UserProfile = {
    userName: '',
    email: '',
    games: []
  };
  
  /* DTOs */

  constructor(private readonly route: ActivatedRoute, private readonly router: Router, 
    private readonly authService: AuthService, 
    private readonly profileService: ProfileService,
    private readonly gameService: GamesService) {}

  async ngOnInit(): Promise<void> {
    const data = this.authService.getUserInfoFromLocalStorage(USER_INFO);
    this.route.params.subscribe((params: Params) => {
      if(+params['id'] !== data.id) {
        this.yourProfile = false;
      }
    })

    const profile = await this.profileService.getUserProfile(data.id);

    this.userProfile = new UserProfile(profile.userName, profile.userEmail, profile.games);

    this.allGames = await this.gameService.getAllGames();
  }

  chooseCredentials() {
    if(this.credentialsChosen.toString() === 'false') {
      this.credentialsChosen = true;
      this.paymentsChosen = false;
      this.notificationsChosen = false;
    }
  }

  choosePayments() {
    if(this.paymentsChosen.toString() === 'false') {
      this.paymentsChosen = true;
      this.credentialsChosen = false;
      this.notificationsChosen = false;
    }
  }

  chooseNotifications() {
    if(this.notificationsChosen.toString() === 'false') {
      this.notificationsChosen = true;
      this.paymentsChosen = false;
      this.credentialsChosen = false;
    }
  }

  redirectToMain() {
    this.router.navigate(['/main'])
  }
}
