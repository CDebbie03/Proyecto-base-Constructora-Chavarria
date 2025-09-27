
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TrabajadorService } from './trabajador.service';
import { TrabajadorModel, NuevoTrabajador } from './trabajador.model';
import { ProyectoService } from '../proyecto/proyecto.service'
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

import {Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TrabajadorService } from './trabajador.service';
import {TrabajadorModel} from './trabajador.model';
>>>>>>> origin/Rommel
declare var bootstrap: any;

@Component({
  templateUrl: './trabajador.component.html',
  standalone: true,

  imports: [FormsModule, CommonModule, NgxPaginationModule],
})
export class TrabajadorComponent implements OnInit {

  page: number = 1;
  itemsPerPage: number = 13;

  trabajadores: TrabajadorModel[] = [];
  originalTrabajadores: TrabajadorModel[] = [];
  trabajadorSeleccionado: TrabajadorModel | null = null;
  trabajadorAEditar: TrabajadorModel | null = null;
  
  nuevoTrabajador: NuevoTrabajador = { nombre: '', horas_trabajadas: 0, comentario: '', proyecto_nombre: '' };
  
  filtroNombre: string = '';
  proyectosDisponibles: any[] = [];

  constructor(
    private trabajadorService: TrabajadorService,
    private proyectoService: ProyectoService
  ) { }

  ngOnInit(): void {
    this.cargarProyectos();
  }

  cargarProyectos(): void {
    this.proyectoService.getProyectos().subscribe(
      proyectos => {
        this.proyectosDisponibles = proyectos;
        this.cargarTrabajadores();
      },
      error => {
        console.error('Error al cargar proyectos:', error);
      }
    );
  }

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
      this.trabajadores = data.map(trabajador => {
        const proyecto = this.proyectosDisponibles.find(p => p.id === trabajador.proyecto_id)
        return {
          ...trabajador,
          
          proyecto_nombre: proyecto ? proyecto.nombre : 'Sin Proyecto'
        };
      });
      this.originalTrabajadores = this.trabajadores;
    });
  }

  eliminarTrabajador() {
    if (!this.trabajadorSeleccionado) return;
    this.trabajadorService.deleteTrabajador(this.trabajadorSeleccionado.id)
      .subscribe(() => {
        this.cargarTrabajadores();
        const modalElement = document.getElementById('modalEliminar');
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }
        alert('Trabajador eliminado con éxito.');
      });
  }

  agregarTrabajador(): void {
    this.trabajadorService.addTrabajador(this.nuevoTrabajador).subscribe({
      next: (res) => {
        console.log('Trabajador creado:', res);
        this.cargarTrabajadores();
        const modalElement = document.getElementById('modalNuevo');
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) modal.hide();
        this.nuevoTrabajador = { nombre: '', horas_trabajadas: 0, comentario: '', proyecto_nombre: '' };
        alert('Trabajador creado con éxito.');
      },
      error: (err) => {
        console.error('Error al crear trabajador:', err);
        alert('Error al crear trabajador: ' + (err.error?.error || 'Error desconocido'));
      }
    });
  }

  seleccionarTrabajadorParaEditar(trabajador: TrabajadorModel) {
    const proyecto = this.proyectosDisponibles.find(p => p.id === trabajador.proyecto_id);
    this.trabajadorAEditar = {
      ...trabajador,
      proyecto_nombre: proyecto ? proyecto.nombre : ''
    };
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

          alert('Trabajador editado con éxito.');
        });
    }
  }


  buscarPorNombre(): void {
    if (this.filtroNombre.trim() === '') {
      this.trabajadores = this.originalTrabajadores;
    } else {


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






}
>>>>>>> origin/Rommel
