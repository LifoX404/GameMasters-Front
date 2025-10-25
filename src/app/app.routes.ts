import { Routes } from '@angular/router';
import { PublicComponent } from './layout/public/public.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductosListarComponent } from './admin/productos/productos-listar/productos-listar.component';
import { ProductosCrearComponent } from './admin/productos/productos-crear/productos-crear.component';
import { ProductosEditarComponent } from './admin/productos/productos-editar/productos-editar.component';
import { OrderComponent } from './pages/order/order.component';
import { AdminComponent } from './layout/admin/admin.component';
import { AdminDashboardComponent } from './admin/dashboard/admin-dashboard.component';
import { OrdenesComponent } from './admin/ordenes/ordenes.component';
import { DetallesComponent } from './admin/ordenes/table/detalles/detalles.component';
import { TableComponent } from './admin/ordenes/table/table.component';

export const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      { path: 'register', component: RegisterComponent }, // Carga HomeComponent DENTRO de PublicLayout
      { path: 'login', component: LoginComponent },
      {path: 'ordenes', component : OrderComponent}// Carga ContactComponent DENTRO de PublicLayout
      // ...otras rutas públicas
    ]
  },

    {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'productos', component: ProductosListarComponent }, // Carga HomeComponent DENTRO de PublicLayout
      { path: 'productos/editar', component: ProductosEditarComponent },
      { path: 'productos/crear', component: ProductosCrearComponent},
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'ordenes', component: OrdenesComponent},
      { path: 'ordenes/:id/detalles', component: DetallesComponent },
      { path: 'ordenes', component: TableComponent },
      { path: 'ordenes/:id', component: DetallesComponent },
      // Carga ContactComponent DENTRO de PublicLayout
      // ...otras rutas públicas
    ]
  }
];


