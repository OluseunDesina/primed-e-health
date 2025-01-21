import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './core/layout/dashboard-layout/dashboard-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'user-management',
        loadChildren: () =>
          import('./pages/user-management/user-management.module').then(
            (m) => m.UserManagementModule
          ),
      },
    ],
  },
];
