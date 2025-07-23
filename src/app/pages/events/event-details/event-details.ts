import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventIn } from '../../../models/event.model';
import { EventService } from '../../../services/events.service';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-details.html',
  styleUrl: './event-details.scss'
})
export class EventDetails {

  eventId = signal<string>('');
  eventSelected = signal<EventIn>({} as EventIn);

  constructor(private readonly route: ActivatedRoute, private readonly eventSrv: EventService){
    this.route.params.subscribe(params => {
      const { id } = params;
      if(!id){
        alert('No se pudo cargar el evento');
        return 
      }
      this.eventId.set(id);
      this.eventSrv.getEventById(id).subscribe({
        next: (event) => {
          this.eventSelected.set(event);
        },
        error: (err) => {
          alert(err);
        }
      });
    });
  }

}
