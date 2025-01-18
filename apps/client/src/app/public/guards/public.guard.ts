import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';

export const publicGuard: CanActivateFn = (route, state) => {
  console.log("en el guard")
  const authService = inject(AuthService);
  const router = inject(Router);
  console.log(state.url)

  console.log(authService.authStatus())
  if(authService.authStatus()==AuthStatus.authenticated){
    router.navigateByUrl('/dashboard');
    return false;
  }

  return true;
};
