export interface ProyectoModel {
  id: number;
  nombre: string;
  estado: string;
  descripcion: string;
  usuario_id: number;
  comentario: string;
}

export interface NuevoProyecto {
  nombre: string;
  estado: string;
  descripcion: string;
  usuario_id: number;
  comentario: string;
}
