import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar.component.';

import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './components/login/login.component';


@Component({
  selector: 'app-root',
  standalone: true,

  imports: [RouterOutlet, Navbar, CommonModule, LoginComponent],

  imports: [RouterOutlet, Navbar],

  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('app');

  constructor(public authService: AuthService) {}
}


