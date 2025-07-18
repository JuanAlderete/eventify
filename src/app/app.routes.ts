import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { EventDetails } from './pages/events/event-details/event-details';
import { EventCreate } from './pages/events/event-create/event-create';
import { EventsAll } from './pages/events/events-all/events-all';
import { LeftNav } from './components/left-nav/left-nav';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'events/:id', component: EventDetails },
    { path: 'create', component: EventCreate },
    { path: 'my-events', component: EventsAll },
    { path: '**', redirectTo: '' }
];
