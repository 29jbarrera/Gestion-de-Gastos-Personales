import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  FormsModule,
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-inicio',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './formulario-inicio.component.html',
  styleUrl: './formulario-inicio.component.css',
})
export class FormularioInicioComponent implements OnInit {
  public myForm: FormGroup = this.fb.group({
    email: ['javier@gmail.com', [Validators.required, Validators.email]],
    password: ['1313', [Validators.required, Validators.minLength(4)]],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private UsuarioService: UsuarioService
  ) {}

  login() {
    this.UsuarioService.login(this.myForm.value).subscribe(
      (resp) => {
        this.router.navigate(['inicio']);
      },
      (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
  }

  ngOnInit(): void {}
}
