import { CommonModule } from '@angular/common';
import { Component, Signal, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventIn } from '../../../models/event.model';
import { EventService } from '../../../services/events.service';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-details.html',
  styleUrl: './event-details.scss',
})
export class EventDetails {
  eventId = signal<string>('');
  eventSelected = signal<EventIn>({} as EventIn);
  private currentUserSignal: Signal<User | null>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly eventSrv: EventService,
    private readonly router: Router,
    private readonly authSrv: AuthService
  ) {
    this.route.params.subscribe((params) => {
      const { id } = params;
      if (!id) {
        alert('No se pudo cargar el evento');
        this.router.navigate(['/']);
        return;
      }
      this.eventId.set(id);
      this.eventSrv.getEventById(id).subscribe({
        next: (event) => {
          this.eventSelected.set(event);
        },
        error: (err) => {
          alert(err);
        },
      });
    });
    this.currentUserSignal = this.authSrv.currentUser;
  }

  goEditEvent() {
    this.router.navigate(['/create/' + this.eventId()]);
  }

  getCurrentUser(): User | null {
    return this.currentUserSignal();
  }
}
