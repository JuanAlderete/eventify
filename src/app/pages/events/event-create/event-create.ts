import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventService } from '../../../services/events.service';
import { EventIn } from '../../../models/event.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-event-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './event-create.html',
  styleUrl: './event-create.scss'
})
export class EventCreate implements OnInit {

  eventForm: FormGroup;
  eventId = signal<string>('');
  eventSelected = signal<EventIn>({} as EventIn);

  constructor(private readonly fb: FormBuilder,
    private readonly eventSrv: EventService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly toast: ToastService) {
    this.eventForm = this.fb.group({
      id: '',
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      location: ['', Validators.required],
      imageUrl: [''],
    });
    this.route.params.subscribe(params => {
      const { id } = params;
      if (!id) {
        return;
      }
      this.eventId.set(id);
      this.eventSrv.getEventById(id).subscribe({
        next: (event) => {
          this.eventSelected.set(event);
          this.eventForm.patchValue({ ...event, id: event.id });
        },
        error: (err) => {
          console.log(err);
        }
      });
    });
  }

  ngOnInit(): void {
  }

  // Submit handler
  onSubmit(): void {
    if (this.eventForm.valid && !this.eventId()) {
      let formData: EventIn = { ...this.eventForm.value, date: new Date(this.eventForm.value.date).toISOString() };
      this.eventSrv.addEvent(formData).subscribe({
        next: (event) => {
          console.log('Evento creado', event);
          this.toast.success('Evento creado con éxito');
          this.router.navigate(['/']);
        },
        error: () => {
          alert('Error al crear el evento');
        }
      });
    } else if (this.eventForm.valid && this.eventId()) {
      let formData: EventIn = { ...this.eventForm.value, date: new Date(this.eventForm.value.date).toISOString() };
      this.eventSrv.editEvent(formData).subscribe({
        next: (event) => {
          console.log('Evento editado', event);
          this.toast.success('Evento editado con éxito');
          this.router.navigate(['/']);
        },
        error: () => {
          alert('Error al editar el evento');
        }
      });
    } else {
      console.log('Form is invalid.');
      this.toast.error('Complete todos los campos');
    }
  }
}
