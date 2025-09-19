import {Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProyectoService } from './proyecto.service';
import {proyectoModel, nuevoProyecto} from './proyecto.model';
declare var bootstrap: any;

@Component({
  templateUrl: './proyectos.component.html',
  standalone: true,
  imports: [FormsModule],
})

export class ProyectoComponent implements OnInit {

  proyectos: proyectoModel[] = [];
  originalProyectos: proyectoModel[] = [];
  proyectoSeleccionado: proyectoModel | null = null;
  editarProyecto: proyectoModel | null = null;
  nuevoProyecto: nuevoProyecto = {  nombre: '', estado: '', descripcion:'' };
  filtroProyecto: string = '';


  constructor(private proyectoService: ProyectoService) { }

  ngOnInit(): void {
    this.cargarProyectos();
  }


  seleccionarProyecto(proyecto: proyectoModel) {
    this.proyectoSeleccionado = proyecto;
  }


  cargarProyectos(): void {
    this.proyectoService.getProyectos().subscribe(data => {
      this.proyectos = data;
      this.originalProyectos = data;
    });
  }



  eliminarProyecto() {
    if (!this.proyectoSeleccionado) return;
    this.proyectoService.deleteProyecto(this.proyectoSeleccionado.id)
      .subscribe(() => this.cargarProyectos());


    const modalElement = document.getElementById('modalEliminar');
    const modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) {
      modal.hide();
    }


  }

  agregarProyecto(): void {
    this.proyectoService.addProyecto(this.nuevoProyecto).subscribe({
      next: (res) => {
        console.log('proyecto creado:', res);
        this.cargarProyectos();
        const modalElement = document.getElementById('modalNuevo');
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) modal.hide();
        this.nuevoProyecto = { nombre: '', estado: '', descripcion: '',  };
      },
      error: (err) => {
        console.error('Error al crear proyecto:', err);
        alert('Error al crear proyecto: ' + (err.error?.error || 'Error desconocido 2.0'));
      }
    });
  }



  seleccionarProyectoParaEditar(proyecto: proyectoModel) {

    this.editarProyecto = { ...proyecto };
  }


  actualizarProyecto(): void {
    if (this.editarProyecto) {
      this.proyectoService.updateProyecto(this.editarProyecto.id, this.editarProyecto)
        .subscribe(() => {
          this.cargarProyectos();

          const modalElement = document.getElementById('modalEditar');
          const modal = bootstrap.Modal.getInstance(modalElement);
          if (modal) {
            modal.hide();
          }
        });
    }
  }


  /*buscarPorNombre(): void {
    if (this.filtroNombre.trim() === '') {
      // If the search bar is empty, show the full list
      this.trabajadores = this.originalTrabajadores;
    } else {
      // Otherwise, filter the list by name (case-insensitive)
      this.trabajadores = this.originalTrabajadores.filter(trabajador =>
        trabajador.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase())
      );
    }
  }*/





}
