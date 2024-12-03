import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { localStorageKeys } from '../interfaces/localStorageKeys';

export const authGuard: CanActivateFn = (route, state) => {
  const auth: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const email = localStorage.getItem(localStorageKeys.EMAIL);

  if (!auth.isTokenAvailabe) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
