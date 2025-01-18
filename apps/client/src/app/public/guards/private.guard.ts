import { inject } from '@angular/core';
import {
  Router,
  type CanActivateFn,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';

export const privateGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  console.log(state.url)
  const url = state.url;
  localStorage.setItem('url', url);
  if (authService.authStatus() == AuthStatus.authenticated) {
    return true;
  }

  if(authService.authStatus()==AuthStatus.checking){
    return false;
  }
  router.navigateByUrl('/login');
  return false;
};
