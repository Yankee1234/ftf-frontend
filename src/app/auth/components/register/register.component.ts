import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private readonly router: Router) {
    this.registerForm = this.createRegisterForm();
  }

  ngOnInit(): void {
  }

  private createRegisterForm() {
    return new FormGroup({
      login: new FormControl(),
      password: new FormControl(),
      email: new FormControl(),
      userName: new FormControl()
    })
  }

  redirectToLogin() {
    this.router.navigate(['/auth/login'])
  }

  register() {
    const login = this.registerForm.getRawValue();
  }

}
