import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProyectoModel, NuevoProyecto } from './proyecto.model';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  private apiUrl = 'http://localhost:3000/proyectos';

  constructor(private http: HttpClient) {}

  getProyectos(): Observable<ProyectoModel[]> {
    return this.http.get<ProyectoModel[]>(this.apiUrl);
  }

  addProyecto(proyecto: NuevoProyecto): Observable<NuevoProyecto> {
    return this.http.post<NuevoProyecto>(this.apiUrl, proyecto);
  }

  updateProyecto(id: number, proyecto: ProyectoModel): Observable<ProyectoModel> {
    return this.http.put<ProyectoModel>(`${this.apiUrl}/${id}`, proyecto);
  }

  deleteProyecto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
