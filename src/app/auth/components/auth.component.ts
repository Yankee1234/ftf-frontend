import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(private readonly router: Router, private readonly authService: AuthService) {}

  ngOnInit(): void {
    console.log('logout');
    this.authService.logout(false);
  }

  loginButtonClick() {
    console.log('login');
    this.router.navigate(['/auth/login']);
  }

  registerButtonClick() {
    this.router.navigate(['/auth/register']);
  }

  async googleLogin() {
    console.log('here');
  }
}
