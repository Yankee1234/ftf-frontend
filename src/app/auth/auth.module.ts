import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './auth.service';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './components/auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GoogleLoginProvider, SocialLoginModule } from 'angularx-social-login';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, AuthComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SocialLoginModule,
  ],
  providers: [
    AuthService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true, //keeps the user signed in
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '148517665605-jspahbqleats6lv**********2c11b5g7o.apps.googleusercontent.com'
            ), // your client id
          },
        ],
      },
    },
  ],
})
export class AuthModule {}
