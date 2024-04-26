import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarInicioComponent } from './calendar-inicio.component';

describe('CalendarInicioComponent', () => {
  let component: CalendarInicioComponent;
  let fixture: ComponentFixture<CalendarInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarInicioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalendarInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
