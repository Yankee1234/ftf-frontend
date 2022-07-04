import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private readonly router: Router) { }

  ngOnInit(): void {
    
  }

  loginButtonClick() {
    console.log('login')
    this.router.navigate(['/auth/login']);
  }

  registerButtonClick() {
    this.router.navigate(['/auth/register']);
  }
}
