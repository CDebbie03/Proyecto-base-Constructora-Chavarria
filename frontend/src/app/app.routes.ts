import { Routes } from '@angular/router';
import {TrabajadorComponent} from './components/trabajador/trabajador.component';
import {PruebaComponent} from './components/prueba/prueba.component';
import {LoginComponent} from './components/login/login.component';
import { InventarioComponent } from './components/inventario/inventario.component';

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
    path: '',
    redirectTo: '/inventario',
    pathMatch: 'full'
  }

];
