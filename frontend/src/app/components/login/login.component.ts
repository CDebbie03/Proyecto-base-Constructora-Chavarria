import { Component } from '@angular/core';
import { Login } from '../../models/login.model';
import { LoginService } from '../../services/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent {
    credentials: Login = { username: '', password: '' };
    error: string = '';

    constructor(private loginService: LoginService) {}

    onSubmit() {
    this.loginService.login(this.credentials).subscribe({
        next: (response) => {
        // Maneja el éxito (guardar token, redirigir, etc.)
        console.log('Login exitoso', response);
        },
        error: (err) => {
        this.error = 'Usuario o contraseña incorrectos';
        }
    });
    }
}
