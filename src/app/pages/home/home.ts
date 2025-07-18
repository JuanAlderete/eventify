import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/events.service';
import { EventIn } from '../../models/event.model';
import { EventCard } from '../../components/event-card/event-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, EventCard],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {

  events: EventIn[] = []
  eventsLoading: boolean = false;

  constructor(private readonly eventSrv: EventService){}

  ngOnInit(){
    this.getEvents();
  }

  getEvents(){
    this.eventsLoading = true;
    this.eventSrv.getEvents().subscribe({
      next: (res) => {
        this.events = res;
        console.log('Eventos', res);
      },
      error: (err) => {
        console.log('Error al obtener los eventos', err);
      },
      complete: () => {
        this.eventsLoading = false;
      }
    })
  }

}
