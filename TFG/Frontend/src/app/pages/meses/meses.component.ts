import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { FooterComponent } from '../../footer/footer.component';
import { CommonModule } from '@angular/common';
import { GastosService } from '../../services/gastos.service';
import { IngresosService } from '../../services/ingresos.service';
import { ObjetivoService } from '../../services/objetivo.service';
import { DatosEnLocalStorageService } from '../../services/datos-en-local-storage.service';

import { Objetivo } from '../../interfaces/objetivo-interface';

@Component({
  selector: 'app-enero',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    FooterComponent,
  ],
  templateUrl: './meses.component.html',
  styleUrl: './meses.component.css',
})
export class MesesComponent implements OnInit {
  public FormSubmitted = false;

  gastos: any;
  ingresos: any;
  objetivos: any;
  totalGastos: number = 0;
  totalIngresos: number = 0;
  ultimoSegmentoURL: string | undefined;

  public gastosIngresos: FormGroup = this.fb.group({
    description: ['', [Validators.required, Validators.minLength(3)]],
    importe: ['', [Validators.required]],
  });

  public objetivoAhorro: FormGroup = this.fb.group({
    objetivo: ['', [Validators.required]],
  });

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private GastosService: GastosService,
    private IngresosService: IngresosService,
    private ObjetivoService: ObjetivoService,
    private router: Router,
    private DatosEnLocalStorageService: DatosEnLocalStorageService
  ) {}

  ngOnInit(): void {
    // OBTENER ID USUARIO
    const idUsuario = this.DatosEnLocalStorageService.obtenerIdUsuario();
    if (!idUsuario) {
      console.error('No se ha encontrado el idUsuario en el localStorage');
      return;
    }

    // VERIFICAR OBJETIVO DE USUARIO LOGEADO
    this.ObjetivoService.obtenerObjetivoPorId(idUsuario).subscribe(
      (objetivos) => {
        if (objetivos && objetivos.length > 0) {
        }
        this.objetivos = objetivos;
      },
      (error: any) => {
        console.error('Error al obtener objetivos:', error);
      }
    );

    // VERIFICAR GASTOS DE USUARIO LOGEADO
    this.GastosService.obtenerGastosPorId(idUsuario).subscribe(
      (gastos) => {
        this.gastos = gastos;
        this.calcularTotalGastos();
      },
      (error) => {
        console.error('Error al obtener gastos:', error);
      }
    );

    // VERIFICAR INGRESOS DE USUARIO LOGEADO

    this.IngresosService.obtenerIngresoPorId(idUsuario).subscribe(
      (ingresos) => {
        this.ingresos = ingresos;
        this.calcularTotalIngresos();
      },
      (error) => {
        console.error('Error al obtener gastos:', error);
      }
    );

    // OBTENER ULTIMO SEGMENTO DE LA URL
    this.ultimoSegmentoURL = this.obtenerUltimoSegmentoURL();
  }

  // OBJETIVO AHORRO

  agregarObjetivo() {
    if (this.objetivoAhorro.invalid) {
      console.error('formulario invalido');
      return;
    }
    const nuevoObjetivo = this.objetivoAhorro.value;
    const ultimoSegmentoURL = this.router.url.split('/').pop();
    const idUsuario = localStorage.getItem('idUsuario') ?? '';

    this.ObjetivoService.obtenerObjetivoPorId(idUsuario).subscribe(
      (objetivos) => {
        const objetivoExistente = objetivos.find(
          (objetivo) => objetivo.mes === ultimoSegmentoURL
        );
        if (objetivoExistente) {
          // Si ya existe un objetivo para este mes, actualizarlo
          this.actualizarObjetivo(nuevoObjetivo, objetivoExistente);
        } else {
          // Si no existe un objetivo para este mes, crear uno nuevo
          this.crearNuevoObjetivo(nuevoObjetivo);
        }
      },
      (error: any) => {
        console.error('Error al obtener objetivos:', error);
      }
    );
  }

  // CREAR NUEVO OBJETIVO

  crearNuevoObjetivo(objetivo: Objetivo) {
    this.ObjetivoService.crearObjetivo(objetivo).subscribe(
      (resp: any) => {
        this.objetivoAhorro.reset();
        window.location.reload();
      },
      (error: any) => {}
    );
  }

  // ACTUALIZAR OBJETIVO

  actualizarObjetivo(
    nuevoObjetivo: Objetivo,
    objetivoExistente: Objetivo
  ): void {
    // Actualizar el objetivo existente con los datos del nuevo objetivo
    objetivoExistente.objetivo = nuevoObjetivo.objetivo;
    this.ObjetivoService.actualizarObjetivo(
      objetivoExistente,
      objetivoExistente._id
    ).subscribe(
      (response) => {
        window.location.reload();
      },
      (error) => {
        console.error('Error al actualizar el objetivo', error);
      }
    );
  }

  // AGREGAR GASTOS
  agregarGasto() {
    if (this.gastosIngresos.invalid) {
      console.error('formulario invalido');
      return;
    }
    this.GastosService.crearGasto(this.gastosIngresos.value).subscribe(
      (resp: any) => {
        this.gastosIngresos.reset();
        window.location.reload();
      },
      (error: any) => {}
    );
  }

  // ELIMINAR GASTOS
  eliminarGasto(idGasto: string): void {
    this.GastosService.eliminarGasto(idGasto).subscribe(
      (response) => {
        window.location.reload();
      },
      (error) => {
        console.error('Error al eliminar gasto', error);
      }
    );
  }

  // AGREGAR INGRESOS
  agregarIngreso() {
    if (this.gastosIngresos.invalid) {
      console.error('formulario invalido');
      return;
    }
    this.IngresosService.crearIngreso(this.gastosIngresos.value).subscribe(
      (resp: any) => {
        this.gastosIngresos.reset();
        window.location.reload();
      },
      (error: any) => {}
    );
  }

  // ELIMINAR INGRESO
  eliminarIngreso(idIngreso: string): void {
    this.IngresosService.eliminarIngreso(idIngreso).subscribe(
      (response) => {
        window.location.reload();
      },
      (error) => {
        console.error('Error al eliminar ingreso', error);
      }
    );
  }

  // VALIDACIÓN FORMULARIO GASTOS INGRESOS
  descriptionNoValida(campo: string): boolean {
    const control = this.gastosIngresos.get(campo);
    if (control) {
      return control?.invalid && (control.touched || this.FormSubmitted);
    }
    return false;
  }

  importeNoValido(campo: string): boolean {
    const control = this.gastosIngresos.get(campo);
    if (control) {
      return control?.invalid && (control.touched || this.FormSubmitted);
    }
    return false;
  }

  // TOTAL INGRESOS
  calcularTotalIngresos() {
    this.totalIngresos = this.ingresos.reduce(
      (total: number, ingreso: any) => total + ingreso.importe,
      0
    );
  }

  // TOTAL GASTOS
  calcularTotalGastos() {
    this.totalGastos = this.gastos.reduce(
      (total: number, gasto: any) => total + gasto.importe,
      0
    );
  }

  // PINTAR NOMBRE DEL MES
  obtenerUltimoSegmentoURL(): string {
    const url = this.router.url;
    const segments = url.split('/');
    const ultimoSegmento = segments.pop() || '';
    return this.capitalizarPrimeraLetra(ultimoSegmento);
  }

  private capitalizarPrimeraLetra(texto: string): string {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  }
}
