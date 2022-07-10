import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { USER_INFO } from 'src/app/domain/constants';
import { ProfileService } from '../../profile.service';
import { UserProfile } from './dtos/user-profile.dto';

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
  
  /* DTOs */

  constructor(private readonly route: ActivatedRoute, private readonly router: Router, private readonly authService: AuthService, private readonly profileService: ProfileService) {}

  async ngOnInit(): Promise<void> {
    const data = this.authService.getUserInfoFromLocalStorage(USER_INFO);
    this.route.params.subscribe((params: Params) => {
      if(+params['id'] !== data.id) {
        this.yourProfile = false;
      }
    })

    const profile = await this.profileService.getUserProfile(data.id);

    
  }
}
