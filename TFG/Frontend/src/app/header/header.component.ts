import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { MesesComponent } from '../pages/meses/meses.component';
import { DatosEnLocalStorageService } from '../services/datos-en-local-storage.service';
import { AnualComponent } from '../pages/anual/anual.component';
import { AnualService } from '../services/anual.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, MesesComponent, AnualComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  nombreUser = '';
  yearLocalStore: string = '';

  constructor(
    private router: Router,
    private UsuarioService: UsuarioService,
    private DatosEnLocalStorageService: DatosEnLocalStorageService,
    private AnualService: AnualService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = event.url;
        if (url.startsWith('/inicio')) {
          this.yearLocalStore =
            this.DatosEnLocalStorageService.obtenerYear() ?? '';
        }
      }
    });
  }

  logout() {
    this.UsuarioService.logout();
    localStorage.clear();
  }

  ngOnInit(): void {
    this.UsuarioService.obtenerDatosUsuario().subscribe(
      (datosUsuario: any) => {
        this.nombreUser = datosUsuario.nombreUsuario;
      },
      (error) => {
        console.error('Error al obtener datos del usuario:', error);
      }
    );
  }

  navigateToAhorroAnual(): void {
    this.AnualService.navigate();
  }
}
