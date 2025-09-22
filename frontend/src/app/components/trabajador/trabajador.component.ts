import {Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TrabajadorService } from './trabajador.service';
import {TrabajadorModel, NuevoTrabajador} from './trabajador.model';
declare var bootstrap: any;
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  templateUrl: './trabajador.component.html',
  standalone: true,
  imports: [FormsModule, NgxPaginationModule],
})
export class TrabajadorComponent implements OnInit {

  page: number = 1;
  itemsPerPage: number = 17;

  trabajadores: TrabajadorModel[] = [];
  originalTrabajadores: TrabajadorModel[] = [];
  trabajadorSeleccionado: TrabajadorModel | null = null;
  trabajadorAEditar: TrabajadorModel | null = null;
  nuevoTrabajador: NuevoTrabajador = {  nombre: '', horas_trabajadas: 0, comentario: '',proyecto_id:0 };
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
    this.trabajadorService.addTrabajador(this.nuevoTrabajador).subscribe({
      next: (res) => {
        console.log('Trabajador creado:', res);
        this.cargarTrabajadores();
        const modalElement = document.getElementById('modalNuevo');
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) modal.hide();
        this.nuevoTrabajador = { nombre: '', horas_trabajadas: 0, comentario: '', proyecto_id: 0 };
      },
      error: (err) => {
        console.error('Error al crear trabajador:', err);
        alert('Error al crear trabajador: ' + (err.error?.error || 'Error desconocido'));
      }
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
