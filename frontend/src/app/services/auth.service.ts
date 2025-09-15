import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  guardarToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  obtenerToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  isAuthenticated(): boolean {
    const token = this.obtenerToken();
    return !!token;
  }
}