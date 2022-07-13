import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  TitleStrategy,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { USER_INFO } from 'src/app/domain/constants';
import { AuthService } from '../auth.service';
import jwt_decode from 'jwt-decode';
import { JwtDecodedInfo } from 'src/app/domain/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService, readonly route: Router) {}
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    console.log('in auth guard')
    if(this.authService.isUserInfoInLocalStorage(USER_INFO).toString() === 'false') {
      
      this.route.navigate(['/auth']);
      return false;
    }
    const info = this.authService.getUserInfoFromLocalStorage(USER_INFO);
    const decoded = jwt_decode(info.token) as JwtDecodedInfo;

    const expiredDate = new Date(decoded.exp);
    if (expiredDate < new Date()) {
      this.route.navigate(['/auth']);
      return false;
    }
    
    return true;
  }
}
