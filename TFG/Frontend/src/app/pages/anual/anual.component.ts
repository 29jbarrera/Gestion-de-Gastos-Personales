import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CalendarInicioComponent } from '../calendar-inicio/calendar-inicio.component';
import { DatosEnLocalStorageService } from '../../services/datos-en-local-storage.service';

@Component({
  selector: 'app-anual',
  standalone: true,
  imports: [CommonModule, CalendarInicioComponent],
  templateUrl: './anual.component.html',
  styleUrl: './anual.component.css',
})
export class AnualComponent implements OnInit {
  years: number[] = [];

  constructor(private DatosEnLocalStorageService: DatosEnLocalStorageService) {}

  ngOnInit(): void {
    this.fillYears();
  }

  fillYears(): void {
    const startYear = 2024;
    const endYear = startYear + 10;
    for (let year = startYear; year <= endYear; year++) {
      this.years.push(year);
    }
  }

  yearSeleccionado(event: any): void {
    const selectedYear = parseInt(event.target.value, 10);
    this.DatosEnLocalStorageService.guardarYear(selectedYear);
  }
}
