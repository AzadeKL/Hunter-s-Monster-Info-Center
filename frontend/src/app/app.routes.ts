import { Routes } from '@angular/router';
import { MonsterListComponent } from './monster-list/monster-list';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';

export const routes: Routes = [
  { path: '', component: MonsterListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];