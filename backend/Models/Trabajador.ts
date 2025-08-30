import {ITrabajador} from "./ITrabajador";


export class Trabajador implements ITrabajador {
  horas: number;
  id: number;
  nombre: string;
  proyecto: string;


  constructor(horas: number, id: number,nombre: string, proyecto: string) {
    this.horas = horas;
    this.id = id;
    this.nombre=nombre;
    this.proyecto=proyecto;
  }

  agregarTrabajador(trabajador: ITrabajador): void {
    localStorage.setItem("id", trabajador.id.toString());
    localStorage.setItem("nombre", trabajador.nombre);
    localStorage.setItem("hora", trabajador.horas.toString());
    localStorage.setItem("proyecto", trabajador.proyecto);
  }



}
