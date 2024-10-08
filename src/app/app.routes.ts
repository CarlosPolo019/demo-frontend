// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';

export const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: '', redirectTo: '/users', pathMatch: 'full' }, // Redirigir a usuarios al inicio
  { path: '**', redirectTo: '/users' } // Redirigir cualquier ruta no encontrada a usuarios
];
