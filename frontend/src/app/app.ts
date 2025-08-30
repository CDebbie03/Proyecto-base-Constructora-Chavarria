import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Trabajador} from './Models/Trabajador';
import {ITrabajador} from './Models/ITrabajador';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('app');
}

let trabajador1 : Trabajador=new Trabajador(40,1,"Juan Perez","Proyecto A")
trabajador1.agregarTrabajador(trabajador1)
