import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormsModule,
  ValidationErrors,
} from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  public FormSubmitted = false;

  public registerForm = this.fb.group(
    {
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      password2: ['', Validators.required],
    },
    {
      validators: this.passwordsIguales('password', 'password2'),
    }
  );

  constructor(
    private fb: FormBuilder,
    private UsuarioService: UsuarioService,
    private router: Router
  ) {}

  campoNoValido(campo: string): boolean {
    const control = this.registerForm.get(campo);
    if (control) {
      return control?.invalid && (control.touched || this.FormSubmitted);
    }
    return false;
  }

  contrasenaNoValida() {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    return (
      pass1 &&
      pass2 &&
      pass1.value !== pass2.value &&
      (pass2.touched || this.FormSubmitted)
    );
  }

  passwordsIguales(
    pass1Name: string,
    pass2Name: string
  ): ValidationErrors | null {
    return (FormGroup: FormGroup) => {
      const pass1Control = FormGroup.get(pass1Name);
      const pass2Control = FormGroup.get(pass2Name);

      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({ noEsIgual: true });
      }
    };
  }

  crearUsuario() {
    if (this.registerForm.invalid) {
      return;
    }

    // Realizar el posteo
    this.UsuarioService.crearUsuario(this.registerForm.value).subscribe(
      (resp) => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'El usuario se ha creado exitosamente.',
          showConfirmButton: false,
          timer: 5000,
        });

        this.FormSubmitted = true;
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 4800);
      },
      (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
  }
}
