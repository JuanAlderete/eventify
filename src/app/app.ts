import { Component, Signal, signal, WritableSignal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ToastComponent } from './components/toast/toast';
import { LoginRegisterComponent } from './components/login-register/login-register';
import { FormsModule } from '@angular/forms';
import { User } from './models/user.model';
import { AuthService } from './services/auth.service';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, ToastComponent, LoginRegisterComponent, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title: string = 'eventify';
  showModal: WritableSignal<boolean> = signal(false);
  currentUser: Signal<User | null>;

  navRoutes = [
    { path: '', title: 'Home' },
    { path: 'create', title: 'Crear evento', auth: true },
    { path: 'my-events', title: 'Mis eventos', auth: true }
  ];

  typeModal: 'login' | 'register' = 'login';

  constructor(private readonly authSrv: AuthService, private readonly toastSrv: ToastService) {
    this.currentUser = this.authSrv.currentUser;
  }

  getUserInfo() {
    const user = this.currentUser();
    return user ? `${user.name} (${user.email})` : 'No logueado';
  }

  logout() {
    this.authSrv.logout();
    this.toastSrv.success('Sesión cerrada');
  }
}
