export interface TrabajadorModel {
  id: number;
  nombre: string;
  horas_trabajadas: number;
  comentario:string;
  proyecto_id:number;
  proyecto_nombre?:string;
}

export interface NuevoTrabajador {
  nombre: string;
  horas_trabajadas: number;
  comentario: string;
  proyecto_nombre: string;
}
