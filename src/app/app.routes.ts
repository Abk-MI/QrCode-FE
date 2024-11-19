import { Routes } from '@angular/router';

export const routes: Routes = [
//   { path: '', redirectTo: 'not-logged-in-users', pathMatch: 'full' },
//   {
//     path: 'not-logged-in-users',
//     loadComponent: () => import('./components/not-logged-in-users/not-logged-in-users.component').then(m => m.NotLoggedInUsersComponent),
//   },
  {
    path: 'users',
    loadComponent: () => import('./components/users/users.component').then(m => m.UsersComponent),
  },
  {
    path: 'add-user',
    loadComponent: () => import('./components/add-user/add-user.component').then(m => m.AddUserComponent),
  },
//   {
//     path: 'user-list',
//     loadComponent: () => import('./components/user-list/user-list.component').then(m => m.UserListComponent),
//   },
//   {
//     path: 'user-details',
//     loadComponent: () => import('./components/user-details/user-details.component').then(m => m.UserDetailsComponent),
//   },
];
