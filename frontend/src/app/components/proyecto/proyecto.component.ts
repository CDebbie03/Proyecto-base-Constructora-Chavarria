import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProyectoService } from './proyecto.service';
import { ProyectoModel, NuevoProyecto } from './proyecto.model';
declare var bootstrap: any;
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  templateUrl: './proyecto.component.html',
  standalone: true,
  imports: [FormsModule, NgxPaginationModule],
})
export class ProyectoComponent implements OnInit {

  page: number = 1;
  itemsPerPage: number = 17;

  proyectos: ProyectoModel[] = [];
  originalProyectos: ProyectoModel[] = [];
  proyectoSeleccionado: ProyectoModel | null = null;
  proyectoAEditar: ProyectoModel | null = null;

  nuevoProyecto: NuevoProyecto = { nombre: '', estado: '', descripcion: '', comentario: '' };

  filtroNombre: string = '';

  constructor(private proyectoService: ProyectoService) { }

  ngOnInit(): void {
    this.cargarProyectos();
  }

  seleccionarProyecto(proyecto: ProyectoModel) {
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
    if (modal) modal.hide();
  }

  agregarProyecto(): void {
    this.proyectoService.addProyecto(this.nuevoProyecto).subscribe({
      next: () => {
        this.cargarProyectos();
        const modalElement = document.getElementById('modalNuevo');
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) modal.hide();
        // ⬅️ Se eliminó usuario_id de la inicialización
        this.nuevoProyecto = { nombre: '', estado: '', descripcion: '', comentario: '' };
      }
    });
  }

  seleccionarProyectoParaEditar(proyecto: ProyectoModel) {
    this.proyectoAEditar = { ...proyecto };
    console.log(this.proyectoAEditar);
  }

  actualizarProyecto(): void {
    if (this.proyectoAEditar) {
      this.proyectoService.updateProyecto(this.proyectoAEditar.id, this.proyectoAEditar)
        .subscribe(() => {
          this.cargarProyectos();
          const modalElement = document.getElementById('modalEditar');
          const modal = bootstrap.Modal.getInstance(modalElement);
          if (modal) modal.hide();
        });
    }
  }

  buscarPorNombre(): void {
    if (this.filtroNombre.trim() === '') {
      this.proyectos = this.originalProyectos;
    } else {
      this.proyectos = this.originalProyectos.filter(proyecto =>
        proyecto.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase())
      );
    }
  }
}
