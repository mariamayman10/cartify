import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const _AuthenticationService = inject(AuthenticationService);
  const router = inject(Router);
  if (_AuthenticationService.currentUser.getValue() !== null) {
    return true;
  } else {
    router.navigate(['/signin']);
    return false;
  }
};
