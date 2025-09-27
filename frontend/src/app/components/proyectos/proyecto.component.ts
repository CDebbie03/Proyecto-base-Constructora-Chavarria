import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProyectoService } from './proyecto.service';
import { proyectoModel, nuevoProyecto } from './proyecto.model';
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
  nuevoProyecto: nuevoProyecto = { nombre: '', estado: '', descripcion: '' };
  filtroProyecto: string = '';

  constructor(private proyectoService: ProyectoService) { }

  ngOnInit(): void {
    this.cargarProyectos();
  }

  seleccionarProyecto(proyecto: proyectoModel) {
    this.proyectoSeleccionado = proyecto;
  }

  cargarProyectos(): void {
    this.proyectoService.getProyectos().subscribe((data) => {
      this.proyectos = data;
      this.originalProyectos = data;
    });
  }

  eliminarProyecto() {
    if (!this.proyectoSeleccionado) return;
    this.proyectoService
      .deleteProyecto(this.proyectoSeleccionado.id)
      .subscribe(() => {
        this.proyectos = this.proyectos.filter(
          (p) => p.id !== this.proyectoSeleccionado?.id
        );

        const modalElement = document.getElementById('modalEliminar');
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) modal.hide();

        this.proyectoSeleccionado = null;
      });
  }

  agregarProyecto(): void {
    this.proyectoService.addProyecto(this.nuevoProyecto).subscribe({
      next: (res: any) => {
        console.log('Proyecto creado:', res);

        // Agregarlo a la lista local
        this.proyectos.push(res);

        const modalElement = document.getElementById('modalNuevo');
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) modal.hide();

        // Resetear formulario
        this.nuevoProyecto = { nombre: '', estado: '', descripcion: '' };
      },
      error: (err) => {
        console.error('Error al crear proyecto:', err);
        alert(
          'Error al crear proyecto: ' +
          (err.error?.error || 'Error desconocido')
        );
      },
    });
  }

  seleccionarProyectoParaEditar(proyecto: proyectoModel) {
    this.editarProyecto = { ...proyecto };
  }

  /*actualizarProyecto(): void {
    if (this.editarProyecto) {
      this.proyectoService
        .updateProyecto(this.editarProyecto.id, this.editarProyecto)
        .subscribe(() => {
          this.cargarProyectos();

          const modalElement = document.getElementById('modalEditar');
          const modal = bootstrap.Modal.getInstance(modalElement);
          if(modal){
            modal.hide();
          }
        });
    }
  }*/
  actualizarProyecto(): void {
    if (this.editarProyecto) {
      this.proyectoService.updateProyecto(this.editarProyecto.id, this.editarProyecto).subscribe({
        next: (res: any) => {
          console.log(res.message);
          this.cargarProyectos(); // refresca lista
          const modalElement = document.getElementById('modalEditar');
          const modal = bootstrap.Modal.getInstance(modalElement);
          if (modal) modal.hide();
        },
        error: (err) => {
          console.error('Error al actualizar proyecto:', err);
          alert('Error al actualizar proyecto: ' + (err.error?.error || 'Error desconocido'));
        }
      });
    }
  }


  buscarPorNombre(): void {
    if (this.filtroProyecto.trim() === '') {
      // si el input está vacío, mostramos todo
      this.proyectos = this.originalProyectos;
    } else {
      this.proyectos = this.originalProyectos.filter(p =>
        p.nombre.toLowerCase().includes(this.filtroProyecto.toLowerCase())
      );
    }
  }

}

