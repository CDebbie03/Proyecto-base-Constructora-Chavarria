import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from './login.model';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private apiUrl = 'http://localhost:3000/login';

    constructor(private http: HttpClient) {}

    login(credentials: Login): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials);
    }
}