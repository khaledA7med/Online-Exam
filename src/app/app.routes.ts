import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./core/pages/Auth/auth.component').then((c) => c.AuthComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./core/pages/Auth/login/login.component').then(
            (c) => c.LoginComponent
          ),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./core/pages/Auth/register/register.component').then(
            (c) => c.RegisterComponent
          ),
      },
      {
        path: 'forget-password',
        loadComponent: () =>
          import(
            './core/pages/Auth/forget-password/forget-password.component'
          ).then((c) => c.ForgetPasswordComponent),
      },
      {
        path: 'verify-code',
        loadComponent: () =>
          import('./core/pages/Auth/verify/verify.component').then(
            (c) => c.VerifyComponent
          ),
      },
      {
        path: 'set-password',
        loadComponent: () =>
          import('./core/pages/Auth/set-password/set-password.component').then(
            (c) => c.SetPasswordComponent
          ),
      },
    ],
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
    canActivate: [authGuard],
  },
];
