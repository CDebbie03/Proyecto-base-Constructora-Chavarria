import {Component, OnInit} from '@angular/core';
import { TrabajadorService } from './trabajador.service';
import {TrabajadorModel} from './trabajador.model';


@Component({
  templateUrl: './trabajador.component.html',
})
export class TrabajadorComponent implements OnInit {
  trabajadores: TrabajadorModel[] = [];
  filaSeleccionada: number | null = null;

  constructor(private trabajadorService: TrabajadorService) {}

  ngOnInit(): void {
    this.cargarTrabajadores();
  }

  cargarTrabajadores(): void {
    this.trabajadorService.getTrabajadores().subscribe(data => {
      console.log(data);
      this.trabajadores = data;
    });
  }

  seleccionarFila(id: number): void {
    this.filaSeleccionada = id;
  }

  eliminar(): void {
    if (this.filaSeleccionada !== null) {
      this.trabajadorService.deleteTrabajador(this.filaSeleccionada).subscribe(() => {
        this.cargarTrabajadores();
        this.filaSeleccionada = null;
      });
    }
  }

  eliminarTrabajador(id:number): void {

    this.trabajadorService.deleteTrabajador(id).subscribe(() => {
      this.cargarTrabajadores();
      this.filaSeleccionada = null;
    });


  }
}
