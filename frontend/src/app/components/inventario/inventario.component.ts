import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InventarioService } from './inventario.service';
import { InventarioModel, NuevoInventario } from './inventario.model';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProyectoService } from '../proyecto/proyecto.service';
import { ProyectoModel } from '../proyecto/proyecto.model';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;

@Component({
  templateUrl: './inventario.component.html',
  standalone: true,
  imports: [FormsModule, NgxPaginationModule, CommonModule],
})
export class InventarioComponent implements OnInit {

  page: number = 1;
  itemsPerPage: number = 13;

  inventario: InventarioModel[] = [];
  originalInventario: InventarioModel[] = [];
  itemSeleccionado: InventarioModel | null = null;
  itemAEditar: InventarioModel | null = null;
  nuevoItem: NuevoInventario = { herramienta: '', estado: '', proyecto_nombre: '' };

  filtroHerramienta: string = '';
  proyectosDisponibles: ProyectoModel[] = [];

  constructor(
    private inventarioService: InventarioService,
    private proyectoService: ProyectoService
  ) { }

  ngOnInit(): void {
    this.cargarProyectos();
  }

  cargarProyectos(): void {
    this.proyectoService.getProyectos().subscribe(proyectos => {
      this.proyectosDisponibles = proyectos;
      this.cargarInventario();
    });
  }

  cargarInventario(): void {
    this.inventarioService.getInventario().subscribe(data => {
      this.inventario = data.map(item => {
        const proyecto = this.proyectosDisponibles.find(p => p.id === item.proyecto_id);
        return {
          ...item,
          proyecto_nombre: proyecto ? proyecto.nombre : 'Sin Proyecto'
        };
      });
      this.originalInventario = this.inventario;
    });
  }

  seleccionarItem(item: InventarioModel) {
    this.itemSeleccionado = item;
  }

  seleccionarItemParaEditar(item: InventarioModel) {
    const proyecto = this.proyectosDisponibles.find(p => p.id === item.proyecto_id);
    this.itemAEditar = {
      ...item,
      proyecto_nombre: proyecto ? proyecto.nombre : ''
    };
  }

  eliminarItem() {
    if (!this.itemSeleccionado) return;
    this.inventarioService.deleteInventario(this.itemSeleccionado.id)
      .subscribe(() => {
        this.cargarInventario();
        const modalElement = document.getElementById('modalEliminarInventario');
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) modal.hide();
        alert('Ítem de inventario eliminado con éxito');
      });
  }

  agregarItem(): void {
    this.inventarioService.addInventario(this.nuevoItem).subscribe(() => {
      this.cargarInventario();
      const modalElement = document.getElementById('modalNuevoInventario');
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) modal.hide();
      this.nuevoItem = { herramienta: '', estado: '', proyecto_nombre: '' };
      alert('Ítem de inventario creado con éxito');
    }, error => {
      alert('Error al crear: ' + (error.error?.error || 'Error desconocido'));
    });
  }

  actualizarItem(): void {
    if (this.itemAEditar) {
      this.inventarioService.updateInventario(this.itemAEditar.id, this.itemAEditar)
        .subscribe(() => {
          this.cargarInventario();
          const modalElement = document.getElementById('modalEditarInventario');
          const modal = bootstrap.Modal.getInstance(modalElement);
          if (modal) modal.hide();
          alert('Ítem de inventario editado con éxito');
        }, error => {
          alert('Error al editar: ' + (error.error?.error || 'Error desconocido'));
        });
    }
  }

  buscarPorHerramienta(): void {
    if (this.filtroHerramienta.trim() === '') {
      this.inventario = this.originalInventario;
    } else {
      this.inventario = this.originalInventario.filter(item =>
        item.herramienta.toLowerCase().includes(this.filtroHerramienta.toLowerCase())
      );
    }
  }
}
