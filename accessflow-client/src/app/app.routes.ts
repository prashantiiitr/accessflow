import { Routes } from '@angular/router';

import { LoginComponent } from './features/auth/pages/login/login.component';

import { DashboardHomeComponent } from './features/dashboard/pages/dashboard-home/dashboard-home.component';

import { AdminHomeComponent } from './features/admin/pages/admin-home/admin-home.component';

import { authGuard } from './core/guards/auth.guard';

import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },

  {
    path: 'auth/login',
    component: LoginComponent,
  },

  {
    path: 'dashboard',
    component: DashboardHomeComponent,
    canActivate: [authGuard],
  },

  {
    path: 'admin',
    component: AdminHomeComponent,
    canActivate: [authGuard, adminGuard],
  },

  {
    path: '**',
    redirectTo: 'dashboard',
  },
];