import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventService } from '../../../services/events.service';
import { EventIn } from '../../../models/event.model';

@Component({
  selector: 'app-event-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './event-create.html',
  styleUrl: './event-create.scss'
})
export class EventCreate {

  eventForm: FormGroup;

  constructor(private readonly fb: FormBuilder, private readonly eventSrv: EventService) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      location: ['', Validators.required],
      imageUrl: [''],
    });
  }

  // Submit handler
  onSubmit(): void {
    if (this.eventForm.valid) {
      let formData: EventIn = { ...this.eventForm.value, date: new Date(this.eventForm.value.date).toISOString() };
      this.eventSrv.addEvent(formData).subscribe({
        next: (event) => {
          console.log('Evento creado', event);
        },
        error: () => {
          alert('Error al crear el evento');
        }
      });
    } else {
      console.log('Form is invalid.');
    }
  }
}
