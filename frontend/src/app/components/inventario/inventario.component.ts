import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InventarioService } from './inventario.service';
import { InventarioModel } from './inventario.model';
import { NgxPaginationModule } from 'ngx-pagination';

declare var bootstrap: any;

@Component({
  templateUrl: './inventario.component.html',
  standalone: true,
  imports: [FormsModule, NgxPaginationModule],
})
export class InventarioComponent implements OnInit {

  page: number = 1;
  itemsPerPage: number = 17;

  inventario: InventarioModel[] = [];
  originalInventario: InventarioModel[] = [];
  itemSeleccionado: InventarioModel | null = null;
  itemAEditar: InventarioModel | null = null;
  nuevoItem: InventarioModel = { id: 0, herramienta: '', estado: '', proyecto_id: 0 };
  filtroHerramienta: string = '';

  constructor(private inventarioService: InventarioService) { }

  ngOnInit(): void {
    this.cargarInventario();
  }

  cargarInventario(): void {
    this.inventarioService.getInventario().subscribe(data => {
      this.inventario = data;
      this.originalInventario = data;
    });
  }

  seleccionarItem(item: InventarioModel) {
    this.itemSeleccionado = item;
  }

  seleccionarItemParaEditar(item: InventarioModel) {
    this.itemAEditar = { ...item };
  }

  eliminarItem() {
    if (!this.itemSeleccionado) return;
    this.inventarioService.deleteInventario(this.itemSeleccionado.id)
      .subscribe(() => this.cargarInventario());

    const modalElement = document.getElementById('modalEliminarInventario');
    const modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) modal.hide();
  }

  agregarItem(): void {
    this.inventarioService.addInventario(this.nuevoItem).subscribe(() => {
      this.cargarInventario();

      const modalElement = document.getElementById('modalNuevoInventario');
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) modal.hide();

      this.nuevoItem = { id: 0, herramienta: '', estado: '', proyecto_id: 0 };
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
