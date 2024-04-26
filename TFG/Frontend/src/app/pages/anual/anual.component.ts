import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CalendarInicioComponent } from '../calendar-inicio/calendar-inicio.component';

@Component({
  selector: 'app-anual',
  standalone: true,
  imports: [CommonModule, CalendarInicioComponent],
  templateUrl: './anual.component.html',
  styleUrl: './anual.component.css',
})
export class AnualComponent implements OnInit {
  years: number[] = [];

  ngOnInit(): void {
    this.fillYears();
  }

  fillYears(): void {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year <= currentYear + 10; year++) {
      this.years.push(year);
    }
  }

  yearSeleccionado(event: any): void {
    const selectedYear = event.target.value;
    localStorage.setItem('year', selectedYear);
  }
}
