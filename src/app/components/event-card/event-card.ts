import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { EventIn } from '../../models/event.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './event-card.html',
  styleUrl: './event-card.scss'
})
export class EventCard implements OnInit {

  @Input() event: EventIn = {} as EventIn;
  @Input() loading: boolean = false;

  constructor(){
  }

  ngOnInit(){
    console.log(this.event);
  }

}
