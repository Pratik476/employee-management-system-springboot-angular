import { Routes } from '@angular/router';
import { Register } from './register/register';
import { Employees } from './empdetails/empdetails';
import { Home } from './home/home';
import { Login } from './login/login';
import { EditPage } from './edit-page/edit-page';
import { AuthGuard } from './auth.guard';   // ⭐ ADD THIS

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'login', component: Login },

  // 🔒 PROTECTED ROUTES (login पाहिजे)
  { path: 'employees', component: Employees, canActivate: [AuthGuard] },
  { path: 'register', component: Register, canActivate: [AuthGuard] },
  { path: 'edit-page/:id', component: EditPage, canActivate: [AuthGuard] },

  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
