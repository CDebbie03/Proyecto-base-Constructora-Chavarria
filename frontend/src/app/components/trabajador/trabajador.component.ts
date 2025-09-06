import {Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TrabajadorService } from './trabajador.service';
import {TrabajadorModel} from './trabajador.model';
declare var bootstrap: any;

@Component({
  templateUrl: './trabajador.component.html',
  standalone: true,
  imports: [FormsModule],
})
export class TrabajadorComponent implements OnInit {

  trabajadores: TrabajadorModel[] = [];
  originalTrabajadores: TrabajadorModel[] = [];
  filaSeleccionada: number | null = null;
  trabajadorSeleccionado: TrabajadorModel | null = null;
  trabajadorAEditar: TrabajadorModel | null = null;
  nuevoTrabajador: TrabajadorModel = { id: 0, nombre: '', horas_trabajadas: 0, comentario: '',proyecto_id:0 };
  filtroNombre: string = '';


  constructor(private trabajadorService: TrabajadorService) { }

  ngOnInit(): void {
    this.cargarTrabajadores();
  }


  seleccionarTrabajador(trabajador: TrabajadorModel) {
    this.trabajadorSeleccionado = trabajador;
  }


  cargarTrabajadores(): void {
    this.trabajadorService.getTrabajadores().subscribe(data => {
      this.trabajadores = data;
      this.originalTrabajadores = data;
    });
  }



  eliminarTrabajador() {
    if (!this.trabajadorSeleccionado) return;
    this.trabajadorService.deleteTrabajador(this.trabajadorSeleccionado.id)
      .subscribe(() => this.cargarTrabajadores());


    const modalElement = document.getElementById('modalEliminar');
    const modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) {
      modal.hide();
    }


  }

  agregarTrabajador(): void {

    this.trabajadorService.addTrabajador(this.nuevoTrabajador).subscribe(() => {

      this.cargarTrabajadores();

      const modalElement = document.getElementById('modalNuevo');
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }



      this.nuevoTrabajador = {
        id: 0,
        nombre: '',
        horas_trabajadas: 0,
        comentario: '',
        proyecto_id: 0,
      };
    });
  }



  seleccionarTrabajadorParaEditar(trabajador: TrabajadorModel) {

    this.trabajadorAEditar = { ...trabajador };
  }


  actualizarTrabajador(): void {
    if (this.trabajadorAEditar) {
      this.trabajadorService.updateTrabajador(this.trabajadorAEditar.id, this.trabajadorAEditar)
        .subscribe(() => {
          this.cargarTrabajadores();

          const modalElement = document.getElementById('modalEditar');
          const modal = bootstrap.Modal.getInstance(modalElement);
          if (modal) {
            modal.hide();
          }
        });
    }
  }


  buscarPorNombre(): void {
    if (this.filtroNombre.trim() === '') {
      // If the search bar is empty, show the full list
      this.trabajadores = this.originalTrabajadores;
    } else {
      // Otherwise, filter the list by name (case-insensitive)
      this.trabajadores = this.originalTrabajadores.filter(trabajador =>
        trabajador.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase())
      );
    }
  }





}
