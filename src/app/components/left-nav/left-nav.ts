import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-left-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './left-nav.html',
  styleUrl: './left-nav.scss'
})
export class LeftNav {
  private authService = inject(AuthService);
  currentUser = this.authService.currentUser;

  constructor() { }

  logout() {
    this.authService.logout().subscribe(() => {
      console.log('Usuario deslogueado');
    });
  }
}
