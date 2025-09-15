import {Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from './login.model';
import { LoginService } from './login.service';
import { AuthService } from '../../services/auth.service';


@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule],
    templateUrl:'./login.component.html',
})
export class LoginComponent{
    credentials: Login = { correo: '', password: ''};
    error: string ='';

    constructor(private loginService: LoginService, private router: Router, private authService: AuthService) {}

    onSubmit(){
        this.loginService.login(this.credentials).subscribe({
            next: (response) => {
                const token = response.token;
                this.authService.guardarToken(token);
                this.router.navigate(['/trabajadores']);
            },
            error: (err) => {
                this.error = 'Usuario o contraseña incorrectos';
            }
        });
    }

    crearCuenta(){
        this.router.navigate(['/registro'])
    }
}
