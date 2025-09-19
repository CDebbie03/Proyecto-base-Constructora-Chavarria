import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { proyectoModel , nuevoProyecto} from './proyecto.model';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  private apiUrl = 'http://localhost:3000/proyectos';

  constructor(private http: HttpClient) {}



  getProyectos(): Observable<proyectoModel[]> {
    return this.http.get<proyectoModel[]>(this.apiUrl);
    // return this.http.get<TrabajadorModel[]>(`${this.apiUrl}?_limit=10`)
  }

  addProyecto(proyecto: nuevoProyecto): Observable<nuevoProyecto> {
    return this.http.post<nuevoProyecto>(this.apiUrl, proyecto);
  }

  updateProyecto(id: number, proyecto: proyectoModel): Observable<proyectoModel> {
    return this.http.put<proyectoModel>(`${this.apiUrl}/${id}`, proyecto);
  }

  deleteProyecto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
