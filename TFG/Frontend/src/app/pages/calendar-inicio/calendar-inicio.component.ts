import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FooterComponent } from '../../footer/footer.component';
import { AnualComponent } from '../anual/anual.component';

import { UsuarioService } from '../../services/usuario.service';
import { DatosEnLocalStorageService } from '../../services/datos-en-local-storage.service';

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

  constructor(
    private UsuarioService: UsuarioService,
    private DatosEnLocalStorageService: DatosEnLocalStorageService
  ) {}

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
    if (
      this.UsuarioService.isAdminCheck().subscribe((isAdmin) => {
        this.isAdmin = isAdmin;
      })
    ) {
    }
  }

  // LLAMAR AL SERVICIO PARA OBTENER EL TOTAL DE USUARIOS
  obtenerTotalUsuarios(): void {
    this.UsuarioService.obtenerTotalUsuario().subscribe((total) => {
      this.totalUsuarios = total;
    });
  }

  // ESTABLECEMOS EL AÑO POR DEFECTO CADA VEZ QUE RECARGAMOS LA PÁGINA
  establecerYearPorDefectoAlRecargar(): void {
    const yearActual = new Date().getFullYear();
    this.DatosEnLocalStorageService.guardarYear(yearActual);
  }
}
