import { Routes } from '@angular/router';
import {TrabajadorComponent} from './components/trabajador/trabajador.component';
import {PruebaComponent} from './components/prueba/prueba.component';
import {LoginComponent} from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component'
import { InventarioComponent } from './components/inventario/inventario.component';
import { AyudaComponent } from './components/ayuda/ayuda.component';

export const routes: Routes = [

  {
    path: 'trabajadores',component: TrabajadorComponent
  },
  {
    path: 'inventario',component: InventarioComponent
  },
  {
    path: 'prueba',component:PruebaComponent,
  },
  {
    path: '',component:LoginComponent
  },
  {
    path: 'registro',component:RegistroComponent
  },
  {
    path: 'ayuda', component: AyudaComponent
  },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  }

];
