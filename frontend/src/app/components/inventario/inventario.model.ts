export interface InventarioModel {
  id: number;
  herramienta: string;
  estado: string;
  proyecto_id: number;

  proyecto_nombre?: string;
}

export interface NuevoInventario {
  herramienta: string;
  estado: string;
  proyecto_nombre: string;
}

}

