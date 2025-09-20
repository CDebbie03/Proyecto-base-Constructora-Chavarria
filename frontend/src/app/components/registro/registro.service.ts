import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  id?: number;
  correo: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private apiUrl = 'http://localhost:3000/registro';

  constructor(private http: HttpClient) {}

  registrar(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.apiUrl, usuario);
  }
}