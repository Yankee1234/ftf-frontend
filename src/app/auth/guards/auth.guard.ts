import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
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
  constructor(private readonly authService: AuthService) {}
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const info = this.authService.getUserInfoFromLocalStorage(USER_INFO);
    const decoded = jwt_decode(info.token) as JwtDecodedInfo;

    const expiredDate = new Date(decoded.exp);

    if (expiredDate < new Date()) {
      this.authService.logout();
      return false;
    }

    return true;
  }
}
