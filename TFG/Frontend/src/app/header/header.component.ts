import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { MesesComponent } from '../pages/meses/meses.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, MesesComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  nombreUser = '';
  yearLocalStore:  string | undefined;

  constructor(private router: Router, private UsuarioService: UsuarioService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.url;
        if (url.startsWith('/inicio')) {
          this.yearLocalStore = localStorage.getItem('year') ?? '';
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

}
