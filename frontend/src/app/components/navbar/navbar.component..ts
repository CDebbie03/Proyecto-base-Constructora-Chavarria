import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class Navbar {

  constructor(private router: Router, private authService: AuthService) { }

  cerrarSesion(): void {
    this.authService.cerrarSesion();

    this.router.navigate(['/']);
  }



}
