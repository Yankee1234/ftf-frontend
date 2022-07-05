import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { INVALID_CREDENTIALS } from 'src/app/domain/constants';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  emptyInputs: boolean = false;
  invalidCredentials = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.loginForm = this.createLoginForm();
  }

  ngOnInit(): void {}

  private createLoginForm() {
    return new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  async login() {
    const { login, password } = this.loginForm.getRawValue();

    if (login && password && login !== '' && password !== '') {
      const result = await this.authService.login({
        login: login,
        password: password,
      });
      if (result === INVALID_CREDENTIALS) {
        this.invalidCredentials = true;
        this.emptyInputs = false;
      }
    } else {
      this.emptyInputs = true;
      this.invalidCredentials = false;
    }
  }

  redirectToRegister() {
    this.router.navigate(['/auth/register']);
  }
}
