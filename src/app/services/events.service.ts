import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable, of, throwError } from 'rxjs';
import { EventIn } from '../models/event.model';
import { v4 as uuid } from 'uuid'

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private eventsMock: EventIn[] = [
    {
      "id": uuid(),
      "title": "Angular Conf Argentina",
      "description": "Una conferencia dedicada a Angular, buenas prácticas, signals, y performance.",
      "date": "2025-08-10",
      "time": "10:00",
      "location": "Buenos Aires, Argentina",
      "imageUrl": "https://picsum.photos/200/300?random=1",
      "capacity": 100,
      "attendees": ['101', '102'],
      "organizer": "NGArgentina",
      "category": "Tecnología"
    },
    {
      "id": uuid(),
      "title": "Taller de UX/UI para desarrolladores",
      "description": "Un taller práctico para mejorar tus habilidades de diseño e interfaces accesibles.",
      "date": "2025-08-22",
      "time": "14:00",
      "location": "Córdoba, Argentina",
      "imageUrl": "https://picsum.photos/200/300?random=2",
      "capacity": 30,
      "attendees": ['103'],
      "organizer": "UXStudio",
      "category": "Diseño"
    },
    {
      "id": uuid(),
      "title": "Festival de música indie",
      "description": "Evento musical con bandas locales, foodtrucks y buena vibra.",
      "date": "2025-09-01",
      "time": "18:00",
      "location": "Rosario, Argentina",
      "imageUrl": "https://picsum.photos/200/300?random=3",
      "capacity": 500,
      "attendees": [],
      "organizer": "IndieFest",
      "category": "Música"
    },
    {
      "id": uuid(),
      "title": "Meetup de emprendedores tech",
      "description": "Espacio para compartir ideas, buscar socios y potenciar startups tecnológicas.",
      "date": "2025-08-15",
      "time": "19:00",
      "location": "La Plata, Argentina",
      "imageUrl": "https://picsum.photos/200/300?random=4",
      "capacity": 80,
      "attendees": ['101', '104', '105'],
      "organizer": "TechStart La Plata",
      "category": "Negocios"
    },
    {
      "id": uuid(),
      "title": "Charla sobre inteligencia artificial",
      "description": "Un vistazo a las últimas tendencias de la IA, LLMs y agentes autónomos.",
      "date": "2025-08-30",
      "time": "16:30",
      "location": "Online",
      "imageUrl": "https://picsum.photos/200/300?random=5",
      "capacity": 300,
      "attendees": ['110', '111', '112', '113'],
      "organizer": "AI Talks",
      "category": "Tecnología"
    }
  ]

  constructor(private readonly httpC: HttpClient) { }

  getEvents(): Observable<EventIn[]> {
    // return this.httpC.get<any>(environment.apiUrl);
    return of([...this.eventsMock]).pipe(delay(1000));
  }

  getEventById(id: string): Observable<EventIn> {
    const foundEvent = this.eventsMock.find(event => event.id === id);
    if (!foundEvent) {
      return throwError(() => new Error("No se encontró el evento con el ID proporcionado"));
    }
    return of(foundEvent);
  }

  addEvent(event: EventIn): Observable<EventIn> {
    if (!event || !event.title) {
      return throwError(() => new Error("Evento inválido: falta el título"));
    }
    const newEvent: EventIn = {
      ...event,
      id: uuid()
    }
    this.eventsMock.push(newEvent);
    return of(newEvent);
  }

  editEvent(event: EventIn): Observable<EventIn>{
    if(!event || !event.id){
      return throwError(() => new Error("No se pudo editar el evento. Evento inválido: falta el id"));
    }
    const index = this.eventsMock.findIndex(event => event.id === event.id);
    if(index !== -1){
      this.eventsMock[index] = event;
    }
    return of(event);
  }

  deleteEvent(id: string): Observable<string>{
    const index = this.eventsMock.findIndex(event => event.id === id);
    if(index !== -1){
      this.eventsMock.splice(index, 1);
    }
    return of('Evento eliminado');
  }

  registerAttendee(eventId: string, attendeeId: string): Observable<string>{
    const event = this.eventsMock.find(event => event.id === eventId);
    if(!event){
      return throwError(() => new Error("No se encontró el evento con el ID proporcionado"));
    }
    const attendee = event.attendees.find(attendee => attendee === attendeeId);
    if(attendee){
      return throwError(() => new Error("El asistente ya está registrado"));
    }
    event.attendees.push(attendeeId);
    return of('Asistente registrado');
  }

}
