export interface ProyectoModel {
  id: number;
  nombre: string;
  estado: string;
  descripcion: string;
}

export interface NuevoProyecto {
  nombre: string;
  estado: string;
  descripcion: string;
}
