import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
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

  events: EventIn[] = [];
  eventsCached: EventIn[] = [];
  eventsLoading: boolean = false;

  constructor(private readonly eventSrv: EventService){
  }

  ngOnInit(): void{
    this.getEvents();
  }

  getEvents(): void{
    this.eventsLoading = true;
    this.eventSrv.getEvents().subscribe({
      next: (res) => {
        this.events = res;
        this.eventsCached = [...res];
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

  inputSearch(event: InputEvent): void{
    const searchTerm = (event as any).target.value;
    if(!searchTerm || searchTerm.length === 0 || searchTerm === ''){
      this.events = [...this.eventsCached];
      return;
    }else{
      this.events = this.eventsCached.filter(event => event.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }
  }

}
