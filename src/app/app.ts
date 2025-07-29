import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ToastComponent } from './components/toast/toast';
import { LoginRegisterComponent } from './components/login-register/login-register';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, ToastComponent, LoginRegisterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('eventify');

  navRoutes = signal([
    { path: '', title: 'Home'},
    { path: 'create', title: 'Crear evento'},
    { path: 'my-events', title: 'Mis eventos'}
  ]);

  constructor(){
  }
}
