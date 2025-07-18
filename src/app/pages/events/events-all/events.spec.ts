import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsAll } from './events-all';

describe('Events', () => {
  let component: EventsAll;
  let fixture: ComponentFixture<EventsAll>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsAll]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventsAll);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
