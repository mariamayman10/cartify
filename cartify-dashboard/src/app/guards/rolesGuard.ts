import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';

export const rolesGuard: CanActivateFn = (route, state):any => {
  const _AuthenticationService = inject(AuthenticationService);
  const _UserService = inject(UserService);
  const _Router = inject(Router);

  const currentUser: any = _AuthenticationService.currentUser.getValue();

  return _UserService.getUser(currentUser._id).subscribe({
    next: (res) => {
      const user = res.data;
      if (user.role === 'manager') {
        return true;
      } else {
        _Router.navigate(['/home']);
        return false;
      }
    },
  });
};
