import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

const NUMERO_SOPORTE = '50489210887';
const MENSAJE_PREDEFINIDO = 'Hola, necesito contactar con soporte por un problema en la aplicación de Constructora';

@Component({
  selector: 'app-ayuda',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ayuda.component.html',
  styleUrl: './ayuda.component.scss'
})

export class AyudaComponent {
  constructor(private router: Router, private authService: AuthService) { }

  cerrarSesion(): void {
    this.authService.cerrarSesion();

    this.router.navigate(['/']);
  }


  contacto(): void {
    const mensajeCodificado = encodeURIComponent(MENSAJE_PREDEFINIDO);

    const whatsappUrl = `https://wa.me/${NUMERO_SOPORTE}?text=${mensajeCodificado}`;

    window.open(whatsappUrl, '_blank');
  }

}
