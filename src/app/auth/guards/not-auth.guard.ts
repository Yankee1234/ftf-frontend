import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { USER_INFO } from 'src/app/domain/constants';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class NotAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const result = this.authService.isUserInfoInLocalStorage(USER_INFO);

    if (result.toString() === 'false') return true;
    this.authService.redirectToMain();

    return false;
  }
}
