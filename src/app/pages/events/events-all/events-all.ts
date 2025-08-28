import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  NgZone,
  OnInit,
} from '@angular/core';
import { EventIn } from '../../../models/event.model';
import { EventCard } from '../../../components/event-card/event-card';
import { EventService } from '../../../services/events.service';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, EventCard, RouterLinkWithHref],
  templateUrl: './events-all.html',
  styleUrl: './events-all.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsAll implements OnInit {
  events: EventIn[] = [];
  eventsLoading: boolean = false;

  constructor(
    private readonly eventSrv: EventService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): void {
    this.eventsLoading = true;
    this.eventSrv.getEventsByOrganizer().subscribe({
      next: (res) => {
        this.events = res;
        console.log('Eventos', res);
      },
      error: (err) => {
        console.log('Error al obtener los eventos', err);
      },
      complete: () => {
        this.eventsLoading = false;
        this.cdr.detectChanges();
      },
    });
  }
}
