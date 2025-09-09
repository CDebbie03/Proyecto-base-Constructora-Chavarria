import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InventarioModel } from './inventario.model';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private apiUrl = 'http://localhost:3000/inventario';

  constructor(private http: HttpClient) {}

  getInventario(): Observable<InventarioModel[]> {
    return this.http.get<InventarioModel[]>(this.apiUrl);
  }

  addInventario(item: InventarioModel): Observable<InventarioModel> {
    return this.http.post<InventarioModel>(this.apiUrl, item);
  }

  updateInventario(id: number, item: InventarioModel): Observable<InventarioModel> {
    return this.http.put<InventarioModel>(`${this.apiUrl}/${id}`, item);
  }

  deleteInventario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
