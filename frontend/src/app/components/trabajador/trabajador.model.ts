export interface TrabajadorModel {
  id: number;
  nombre: string;
  horas_trabajadas: number;
  comentario:string;
  proyecto_id:number;
}

export interface NuevoTrabajador {
  nombre: string;
  horas_trabajadas: number;
  comentario: string;
  proyecto_id: number;
}
