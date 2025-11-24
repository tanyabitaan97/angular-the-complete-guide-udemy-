import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  const isLoggedIn = false;

  if (!isLoggedIn) {
    router.navigate(['/home'], { queryParams: { auth: 'required' } });
    return false;
  }

  return true;
};
