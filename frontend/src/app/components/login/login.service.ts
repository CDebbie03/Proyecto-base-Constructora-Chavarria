import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Login } from './login.model';

import { Login } from '../models/login.model';


@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private apiUrl = 'http://localhost:3000/login';

    private apiUrl = 'http://localhost:3000/api/login'; // Ajusta el endpoint según tu backend


    constructor(private http: HttpClient) {}

    login(credentials: Login): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials);
    }
}