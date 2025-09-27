<<<<<<< HEAD

import { Routes } from '@angular/router';
import {TrabajadorComponent} from './components/trabajador/trabajador.component';
import {PruebaComponent} from './components/prueba/prueba.component';
import {LoginComponent} from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component'
import { InventarioComponent } from './components/inventario/inventario.component';
import { AyudaComponent } from './components/ayuda/ayuda.component';
import { ProyectoComponent} from './components/proyecto/proyecto.component';
import { Inicio } from './components/inicio/inicio';

=======
import { Routes } from '@angular/router';
import {TrabajadorComponent} from './components/trabajador/trabajador.component';
import {PruebaComponent} from './components/prueba/prueba.component';
import {LoginComponent} from './components/login/login.component';
import { InventarioComponent } from './components/inventario/inventario.component';

>>>>>>> origin/Rommel
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
<<<<<<< HEAD
    path: 'registro',component:RegistroComponent
  },
  {
    path: 'ayuda', component: AyudaComponent
  },
  {
    path:'proyectos',component:ProyectoComponent
  },
  {
    path: 'inicio', component: Inicio
  },
  {
    path: '',
    redirectTo: '/inicio',
=======
    path: '',
    redirectTo: '/inventario',
>>>>>>> origin/Rommel
    pathMatch: 'full'
  }

];
<<<<<<< HEAD

import { Routes } from "@angular/router";
import { ProyectoComponent } from "./components/proyectos/proyecto.component";
import { Component } from "@angular/core";

export const routes: Routes =[
  {
    path: 'proyectos', component: ProyectoComponent
  }
];
=======
>>>>>>> origin/Rommel
