import { Routes } from "@angular/router";
import { ProyectoComponent } from "./components/proyectos/proyecto.component";
import { Component } from "@angular/core";

export const routes: Routes =[
  {
    path: 'proyectos', component: ProyectoComponent
  }
];