import { Routes } from '@angular/router';
import {TrabajadorComponent} from './components/trabajador/trabajador.component';
import {PruebaComponent} from './components/prueba/prueba.component';
import {LoginComponent} from './components/login/login.component';

export const routes: Routes = [

  {
    path: 'trabajadores',component: TrabajadorComponent
  },
  {
    path: 'prueba',component:PruebaComponent,
  },
  {
    path: '',component:LoginComponent
  }

];
