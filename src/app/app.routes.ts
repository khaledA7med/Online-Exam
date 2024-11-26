import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./core/pages/Auth/auth.component').then((c) => c.AuthComponent),
  },
];
