import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
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
