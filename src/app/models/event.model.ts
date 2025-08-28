export interface EventIn {
  id: string;
  idOrganizer: string;
  title: string;
  description: string;
  date: string; // la fecha guardar en formato ISO, sino desp me olvido
  time: string;
  location: string;
  imageUrl: string;
  capacity: number;
  attendees: string[];
  organizer: string;
  category: string;
}

//FALTA AGREGAR EL NOMBRE DE ORGANIZADOR PARA MOSTRAR EN EL DETALLE DEL EVENTO