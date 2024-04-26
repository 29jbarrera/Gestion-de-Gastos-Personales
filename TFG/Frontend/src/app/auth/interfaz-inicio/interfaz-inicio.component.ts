import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormularioInicioComponent } from './formulario-inicio/formulario-inicio.component';

@Component({
  selector: 'interfaz-inicio',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    FormularioInicioComponent,
    FormsModule,
  ],
  templateUrl: './interfaz-inicio.component.html',
  styleUrl: './interfaz-inicio.component.css',
})
export default class InterfazInicioComponent {}
