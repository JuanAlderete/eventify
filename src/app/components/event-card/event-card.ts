import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Signal } from '@angular/core';
import { EventIn } from '../../models/event.model';
import { RouterLink } from '@angular/router';
import { EventService } from '../../services/events.service';
import { ToastService } from '../../services/toast.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './event-card.html',
  styleUrl: './event-card.scss',
})
export class EventCard implements OnInit {
  @Input() event: EventIn = {} as EventIn;
  @Input() loading: boolean = false;

  constructor(
    private readonly eventSrv: EventService,
    private readonly toastSrv: ToastService
  ) {
    
  }

  ngOnInit() {
    console.log(this.event);
  }

  registerAttendee() {
    console.log('registerAttendee');
    this.eventSrv
      .registerAttendee(this.event.id, this.event.attendees[0])
      .subscribe({
        next: (res) => {
          console.log('Asistente registrado', res);
          this.toastSrv.success('Te has registrado como asistente del evento');
        },
        error: (err) => {
          console.log('Error al registrar el asistente', err);
          this.toastSrv.error('Error al registrar el asistente');
        },
      });
  }
}
