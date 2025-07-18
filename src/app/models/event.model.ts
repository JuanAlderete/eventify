export interface EventIn {
    id: number;
    title: string;
    description: string;
    date: string; // la fecha guardar en formato ISO, sino desp me olvido
    time: string;
    location: string;
    imageUrl: string;
    capacity: number;
    attendees: number[];
    organizer: string;
    category: string;
  }