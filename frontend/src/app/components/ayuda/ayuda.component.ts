import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
    console.log('Contacto con soporte');
    alert('Contacta al soporte técnico al correo vanessa??');
  }

}
