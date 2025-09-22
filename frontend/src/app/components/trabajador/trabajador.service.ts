import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TrabajadorModel , NuevoTrabajador} from './trabajador.model';

@Injectable({
  providedIn: 'root'
})
export class TrabajadorService {

  private apiUrl = 'http://localhost:3000/trabajadores';

  constructor(private http: HttpClient) {}



  getTrabajadores(): Observable<TrabajadorModel[]> {
    return this.http.get<TrabajadorModel[]>(this.apiUrl);
    // return this.http.get<TrabajadorModel[]>(`${this.apiUrl}?_limit=10`)
  }

  addTrabajador(trabajador: NuevoTrabajador): Observable<NuevoTrabajador> {
    return this.http.post<NuevoTrabajador>(this.apiUrl, trabajador);
  }

  updateTrabajador(id: number, trabajador: TrabajadorModel): Observable<TrabajadorModel> {
    return this.http.put<TrabajadorModel>(`${this.apiUrl}/${id}`, trabajador);
  }

  deleteTrabajador(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
