import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../footer/footer.component';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listado-user',
  standalone: true,
  imports: [FooterComponent, CommonModule],
  templateUrl: './listado-user.component.html',
  styleUrl: './listado-user.component.css',
})
export class ListadoUserComponent implements OnInit {
  totalUsuarios: any[] = [];
  DatosEnLocalStorageService: any;

  constructor(private UsuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.listadoTotalUsuarios();
  }

  listadoTotalUsuarios(): void {
    this.UsuarioService.listadoTotalUsuario().subscribe((usuarios: any[]) => {
      this.totalUsuarios = usuarios;
    });
  }
}
