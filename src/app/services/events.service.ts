import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { EventIn } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private eventsMock: EventIn[] = [
    {
      "id": 1,
      "title": "Angular Conf Argentina",
      "description": "Una conferencia dedicada a Angular, buenas prácticas, signals, y performance.",
      "date": "2025-08-10",
      "time": "10:00",
      "location": "Buenos Aires, Argentina",
      "imageUrl": "https://picsum.photos/200/300?random=1",
      "capacity": 100,
      "attendees": [101, 102],
      "organizer": "NGArgentina",
      "category": "Tecnología"
    },
    {
      "id": 2,
      "title": "Taller de UX/UI para desarrolladores",
      "description": "Un taller práctico para mejorar tus habilidades de diseño e interfaces accesibles.",
      "date": "2025-08-22",
      "time": "14:00",
      "location": "Córdoba, Argentina",
      "imageUrl": "https://picsum.photos/200/300?random=2",
      "capacity": 30,
      "attendees": [103],
      "organizer": "UXStudio",
      "category": "Diseño"
    },
    {
      "id": 3,
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
      "id": 4,
      "title": "Meetup de emprendedores tech",
      "description": "Espacio para compartir ideas, buscar socios y potenciar startups tecnológicas.",
      "date": "2025-08-15",
      "time": "19:00",
      "location": "La Plata, Argentina",
      "imageUrl": "https://picsum.photos/200/300?random=4",
      "capacity": 80,
      "attendees": [101, 104, 105],
      "organizer": "TechStart La Plata",
      "category": "Negocios"
    },
    {
      "id": 5,
      "title": "Charla sobre inteligencia artificial",
      "description": "Un vistazo a las últimas tendencias de la IA, LLMs y agentes autónomos.",
      "date": "2025-08-30",
      "time": "16:30",
      "location": "Online",
      "imageUrl": "https://picsum.photos/200/300?random=5",
      "capacity": 300,
      "attendees": [110, 111, 112, 113],
      "organizer": "AI Talks",
      "category": "Tecnología"
    }
  ]

  constructor(private readonly httpC: HttpClient) { }

  getEvents(): Observable<EventIn[]> {
    // return this.httpC.get<any>(environment.apiUrl);
    return of([...this.eventsMock]).pipe(delay(2000));
  }
}
