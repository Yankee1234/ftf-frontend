import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { USER_INFO } from 'src/app/domain/constants';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {}

  redirectToProfile() {
    const data = this.authService.getUserInfoFromLocalStorage(USER_INFO);
    this.router.navigate(['/main/profile', { id: data.id }]);
  }
}
