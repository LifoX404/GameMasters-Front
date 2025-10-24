import { Routes } from '@angular/router';
import { PublicComponent } from './layout/public/public.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      { path: 'register', component: RegisterComponent }, // Carga HomeComponent DENTRO de PublicLayout
      { path: 'login', component: LoginComponent },// Carga ContactComponent DENTRO de PublicLayout
      // ...otras rutas públicas
    ]
  }
];