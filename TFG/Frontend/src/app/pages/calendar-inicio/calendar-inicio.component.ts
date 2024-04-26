import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FooterComponent } from '../../footer/footer.component';
import { UsuarioService } from '../../services/usuario.service';
import { AnualComponent } from '../anual/anual.component';

@Component({
  selector: 'app-calendar-inicio',
  standalone: true,
  imports: [RouterModule, FooterComponent, CommonModule, AnualComponent],
  templateUrl: './calendar-inicio.component.html',
  styleUrl: './calendar-inicio.component.css',
})
export class CalendarInicioComponent implements OnInit {
  isAdmin: boolean = false;
  totalUsuarios: number = 0;
  selectedYear: number = 0;
  AnualComponent: any;

  constructor(private UsuarioService: UsuarioService) {}

  ngOnInit(): void {
    // LLAMAR A LA FUNCION VERIFICAR ROL
    this.UsuarioService.obtenerDatosUsuario().subscribe(
      (response) => {
        this.verificarRol();
      },
      (error) => {
        console.error('Error al verificar el rol', error);
      }
    );

    this.obtenerTotalUsuarios();

    this.establecerYearPorDefectoAlRecargar();
  }

  verificarRol(): void {
    if (this.UsuarioService.isAdmin()) {
      this.isAdmin = true;
      return;
    }
  }

  // LLAMAR AL SERVICIO PARA OBTENER EL TOTAL DE USUARIOS
  obtenerTotalUsuarios(): void {
    this.UsuarioService.obtenerTotalUsuario().subscribe((total) => {
      this.totalUsuarios = total;
    });
  }

  // GUARDAMOS EL AÑO SELECCIONADO DEL DESPLEGABLE
  guardarYearSeleccionado(selectedYear: string): void {
    this.AnualComponent.yearSeleccionado(selectedYear);
    localStorage.setItem('year', this.selectedYear.toString());
  }

  // ESTABLECEMOS EL AÑO POR DEFECTO CADA VEZ QUE RECARGAMOS LA PÁGINA
  establecerYearPorDefectoAlRecargar(): void {
    const yearActual = new Date().getFullYear();
    localStorage.setItem('year', yearActual.toString());
  }
}
