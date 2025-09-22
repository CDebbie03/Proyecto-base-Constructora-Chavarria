import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroService, Usuario } from './registro.service';

declare var bootstrap: any; // 👈 Necesario para usar el Modal de Bootstrap

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {
  usuario: Usuario = { correo: '', password: ''};
  error: string = '';
  mensajeExito: string = '';

  constructor(
    private registroService: RegistroService,
    private router: Router
  ) {}

  onSubmit() {
    this.registroService.registrar(this.usuario).subscribe({
      next: (response) => {
        console.log('Registro exitoso', response);

        // Mostrar modal
        const modal = new bootstrap.Modal(document.getElementById('registroModal'));
        modal.show();

        // Redirigir después de unos segundos
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 3000);
      },
      error: (err) => {
        if (err.error && err.error.mensaje) {
          this.error = err.error.mensaje;
        } else {
          this.error = 'Error en el registro. Inténtelo de nuevo';
        }
        console.error('Error del backend:', err);
      }
    });
  }

  irAlLogin(){
    this.router.navigate(['/'])
  }
}
