import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { AuthRegisterRequest } from '../../dtos/auth-register-request.dto';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  @Input() loginPattern = '^[a-z0-9_-]{8,15}$';
  @Input() emailPattern = '';
  @Input() passwordPattern = '';
  emptyInputs: boolean = false;
  invalidCredentials = false;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {
    this.registerForm = this.createRegisterForm();
  }

  ngOnInit(): void {
    console.log('logout');
    this.authService.logout(false);
  }

  private createRegisterForm() {
    return new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      userName: new FormControl(),
    });
  }

  redirectToLogin() {
    this.router.navigate(['/auth/login']);
  }

  async register() {
    const data = this.registerForm.getRawValue();
    if (data.login === null || data.password === null || data.email === null) {
      this.invalidCredentials = false;
      this.emptyInputs = true;
      return;
    }

    const result = await this.authService.register(
      new AuthRegisterRequest(
        data.login,
        data.email,
        data.userName && data.userName.length > 0 ? data.login : data.userName,
        data.password
      )
    );
  }
}
