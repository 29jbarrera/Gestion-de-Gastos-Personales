import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { Gasto } from '../../interfaces/gasto-interface';
import { AnualService } from '../../services/anual.service';
import { DatosEnLocalStorageService } from '../../services/datos-en-local-storage.service';
import { Ingreso } from '../../interfaces/ingreso-interface';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-ahorro-anual',
  standalone: true,
  imports: [CommonModule, FooterComponent],
  templateUrl: './ahorro-anual.component.html',
  styleUrl: './ahorro-anual.component.css',
})
export class AhorroAnualComponent implements OnInit {
  gastos: Gasto[] = [];
  ingresos: Ingreso[] = [];
  totalImporte2024: number = 0;
  totalImporte2025: number = 0;
  totalImporte2026: number = 0;
  totalImporte2027: number = 0;
  totalImporte2028: number = 0;
  totalImporte2029: number = 0;
  totalImporte2030: number = 0;
  totalImporte2031: number = 0;
  totalImporte2032: number = 0;
  totalImporte2033: number = 0;
  totalImporte2034: number = 0;

  totalIngreso2024: number = 0;
  totalIngreso2025: number = 0;
  totalIngreso2026: number = 0;
  totalIngreso2027: number = 0;
  totalIngreso2028: number = 0;
  totalIngreso2029: number = 0;
  totalIngreso2030: number = 0;
  totalIngreso2031: number = 0;
  totalIngreso2032: number = 0;
  totalIngreso2033: number = 0;
  totalIngreso2034: number = 0;

  constructor(
    private AnualService: AnualService,
    private DatosEnlocalStorageService: DatosEnLocalStorageService
  ) {}

  ngOnInit(): void {
    this.obtenerGastos2024();
    this.obtenerGastos2025();
    this.obtenerGastos2026();
    this.obtenerGastos2027();
    this.obtenerGastos2028();
    this.obtenerGastos2029();
    this.obtenerGastos2030();
    this.obtenerGastos2031();
    this.obtenerGastos2032();
    this.obtenerGastos2033();
    this.obtenerGastos2034();

    this.obtenerIngresoPorId2024();
    this.obtenerIngresoPorId2025();
    this.obtenerIngresoPorId2026();
    this.obtenerIngresoPorId2027();
    this.obtenerIngresoPorId2028();
    this.obtenerIngresoPorId2029();
    this.obtenerIngresoPorId2030();
    this.obtenerIngresoPorId2031();
    this.obtenerIngresoPorId2032();
    this.obtenerIngresoPorId2033();
    this.obtenerIngresoPorId2034();
  }

  obtenerGastos2024(): void {
    const idUsuario = this.DatosEnlocalStorageService.obtenerIdUsuario();
    if (idUsuario !== null) {
      this.AnualService.obtenerGastosPorIdYear2024(idUsuario).subscribe(
        (gastos: Gasto[]) => {
          this.gastos = gastos;
          this.totalImporte2024 = this.gastos.reduce(
            (total, gasto) => total + gasto.importe,
            0
          );
        }
      );
    }
  }

  obtenerGastos2025(): void {
    const idUsuario = this.DatosEnlocalStorageService.obtenerIdUsuario();
    if (idUsuario !== null) {
      this.AnualService.obtenerGastosPorIdYear2025(idUsuario).subscribe(
        (gastos: Gasto[]) => {
          this.gastos = gastos;
          this.totalImporte2025 = this.gastos.reduce(
            (total, gasto) => total + gasto.importe,
            0
          );
        }
      );
    }
  }

  obtenerGastos2026(): void {
    const idUsuario = this.DatosEnlocalStorageService.obtenerIdUsuario();
    if (idUsuario !== null) {
      this.AnualService.obtenerGastosPorIdYear2026(idUsuario).subscribe(
        (gastos: Gasto[]) => {
          this.gastos = gastos;
          this.totalImporte2026 = this.gastos.reduce(
            (total, gasto) => total + gasto.importe,
            0
          );
        }
      );
    }
  }

  obtenerGastos2027(): void {
    const idUsuario = this.DatosEnlocalStorageService.obtenerIdUsuario();
    if (idUsuario !== null) {
      this.AnualService.obtenerGastosPorIdYear2027(idUsuario).subscribe(
        (gastos: Gasto[]) => {
          this.gastos = gastos;
          this.totalImporte2027 = this.gastos.reduce(
            (total, gasto) => total + gasto.importe,
            0
          );
        }
      );
    }
  }

  obtenerGastos2028(): void {
    const idUsuario = this.DatosEnlocalStorageService.obtenerIdUsuario();
    if (idUsuario !== null) {
      this.AnualService.obtenerGastosPorIdYear2028(idUsuario).subscribe(
        (gastos: Gasto[]) => {
          this.gastos = gastos;
          this.totalImporte2028 = this.gastos.reduce(
            (total, gasto) => total + gasto.importe,
            0
          );
        }
      );
    }
  }

  obtenerGastos2029(): void {
    const idUsuario = this.DatosEnlocalStorageService.obtenerIdUsuario();
    if (idUsuario !== null) {
      this.AnualService.obtenerGastosPorIdYear2029(idUsuario).subscribe(
        (gastos: Gasto[]) => {
          this.gastos = gastos;
          this.totalImporte2029 = this.gastos.reduce(
            (total, gasto) => total + gasto.importe,
            0
          );
        }
      );
    }
  }

  obtenerGastos2030(): void {
    const idUsuario = this.DatosEnlocalStorageService.obtenerIdUsuario();
    if (idUsuario !== null) {
      this.AnualService.obtenerGastosPorIdYear2030(idUsuario).subscribe(
        (gastos: Gasto[]) => {
          this.gastos = gastos;
          this.totalImporte2030 = this.gastos.reduce(
            (total, gasto) => total + gasto.importe,
            0
          );
        }
      );
    }
  }

  obtenerGastos2031(): void {
    const idUsuario = this.DatosEnlocalStorageService.obtenerIdUsuario();
    if (idUsuario !== null) {
      this.AnualService.obtenerGastosPorIdYear2031(idUsuario).subscribe(
        (gastos: Gasto[]) => {
          this.gastos = gastos;
          this.totalImporte2031 = this.gastos.reduce(
            (total, gasto) => total + gasto.importe,
            0
          );
        }
      );
    }
  }

  obtenerGastos2032(): void {
    const idUsuario = this.DatosEnlocalStorageService.obtenerIdUsuario();
    if (idUsuario !== null) {
      this.AnualService.obtenerGastosPorIdYear2032(idUsuario).subscribe(
        (gastos: Gasto[]) => {
          this.gastos = gastos;
          this.totalImporte2032 = this.gastos.reduce(
            (total, gasto) => total + gasto.importe,
            0
          );
        }
      );
    }
  }

  obtenerGastos2033(): void {
    const idUsuario = this.DatosEnlocalStorageService.obtenerIdUsuario();
    if (idUsuario !== null) {
      this.AnualService.obtenerGastosPorIdYear2033(idUsuario).subscribe(
        (gastos: Gasto[]) => {
          this.gastos = gastos;
          this.totalImporte2033 = this.gastos.reduce(
            (total, gasto) => total + gasto.importe,
            0
          );
        }
      );
    }
  }

  obtenerGastos2034(): void {
    const idUsuario = this.DatosEnlocalStorageService.obtenerIdUsuario();
    if (idUsuario !== null) {
      this.AnualService.obtenerGastosPorIdYear2034(idUsuario).subscribe(
        (gastos: Gasto[]) => {
          this.gastos = gastos;
          this.totalImporte2034 = this.gastos.reduce(
            (total, gasto) => total + gasto.importe,
            0
          );
        }
      );
    }
  }

  // Ingresos
  obtenerIngresoPorId2024(): void {
    const idUsuario = this.DatosEnlocalStorageService.obtenerIdUsuario();
    if (idUsuario !== null) {
      this.AnualService.obtenerIngresoPorId2024(idUsuario).subscribe(
        (ingresos: Ingreso[]) => {
          this.ingresos = ingresos;
          this.totalIngreso2024 = this.ingresos.reduce(
            (total, ingreso) => total + ingreso.importe,
            0
          );
        }
      );
    }
  }
  obtenerIngresoPorId2025(): void {
    const idUsuario = this.DatosEnlocalStorageService.obtenerIdUsuario();
    if (idUsuario !== null) {
      this.AnualService.obtenerIngresoPorId2025(idUsuario).subscribe(
        (ingresos: Ingreso[]) => {
          this.ingresos = ingresos;
          this.totalIngreso2025 = this.ingresos.reduce(
            (total, ingreso) => total + ingreso.importe,
            0
          );
        }
      );
    }
  }
  obtenerIngresoPorId2026(): void {
    const idUsuario = this.DatosEnlocalStorageService.obtenerIdUsuario();
    if (idUsuario !== null) {
      this.AnualService.obtenerIngresoPorId2026(idUsuario).subscribe(
        (ingresos: Ingreso[]) => {
          this.ingresos = ingresos;
          this.totalIngreso2026 = this.ingresos.reduce(
            (total, ingreso) => total + ingreso.importe,
            0
          );
        }
      );
    }
  }
  obtenerIngresoPorId2027(): void {
    const idUsuario = this.DatosEnlocalStorageService.obtenerIdUsuario();
    if (idUsuario !== null) {
      this.AnualService.obtenerIngresoPorId2027(idUsuario).subscribe(
        (ingresos: Ingreso[]) => {
          this.ingresos = ingresos;
          this.totalIngreso2027 = this.ingresos.reduce(
            (total, ingreso) => total + ingreso.importe,
            0
          );
        }
      );
    }
  }
  obtenerIngresoPorId2028(): void {
    const idUsuario = this.DatosEnlocalStorageService.obtenerIdUsuario();
    if (idUsuario !== null) {
      this.AnualService.obtenerIngresoPorId2028(idUsuario).subscribe(
        (ingresos: Ingreso[]) => {
          this.ingresos = ingresos;
          this.totalIngreso2028 = this.ingresos.reduce(
            (total, ingreso) => total + ingreso.importe,
            0
          );
        }
      );
    }
  }
  obtenerIngresoPorId2029(): void {
    const idUsuario = this.DatosEnlocalStorageService.obtenerIdUsuario();
    if (idUsuario !== null) {
      this.AnualService.obtenerIngresoPorId2029(idUsuario).subscribe(
        (ingresos: Ingreso[]) => {
          this.ingresos = ingresos;
          this.totalIngreso2029 = this.ingresos.reduce(
            (total, ingreso) => total + ingreso.importe,
            0
          );
        }
      );
    }
  }
  obtenerIngresoPorId2030(): void {
    const idUsuario = this.DatosEnlocalStorageService.obtenerIdUsuario();
    if (idUsuario !== null) {
      this.AnualService.obtenerIngresoPorId2030(idUsuario).subscribe(
        (ingresos: Ingreso[]) => {
          this.ingresos = ingresos;
          this.totalIngreso2030 = this.ingresos.reduce(
            (total, ingreso) => total + ingreso.importe,
            0
          );
        }
      );
    }
  }
  obtenerIngresoPorId2031(): void {
    const idUsuario = this.DatosEnlocalStorageService.obtenerIdUsuario();
    if (idUsuario !== null) {
      this.AnualService.obtenerIngresoPorId2031(idUsuario).subscribe(
        (ingresos: Ingreso[]) => {
          this.ingresos = ingresos;
          this.totalIngreso2031 = this.ingresos.reduce(
            (total, ingreso) => total + ingreso.importe,
            0
          );
        }
      );
    }
  }
  obtenerIngresoPorId2032(): void {
    const idUsuario = this.DatosEnlocalStorageService.obtenerIdUsuario();
    if (idUsuario !== null) {
      this.AnualService.obtenerIngresoPorId2032(idUsuario).subscribe(
        (ingresos: Ingreso[]) => {
          this.ingresos = ingresos;
          this.totalIngreso2032 = this.ingresos.reduce(
            (total, ingreso) => total + ingreso.importe,
            0
          );
        }
      );
    }
  }
  obtenerIngresoPorId2033(): void {
    const idUsuario = this.DatosEnlocalStorageService.obtenerIdUsuario();
    if (idUsuario !== null) {
      this.AnualService.obtenerIngresoPorId2033(idUsuario).subscribe(
        (ingresos: Ingreso[]) => {
          this.ingresos = ingresos;
          this.totalIngreso2033 = this.ingresos.reduce(
            (total, ingreso) => total + ingreso.importe,
            0
          );
        }
      );
    }
  }
  obtenerIngresoPorId2034(): void {
    const idUsuario = this.DatosEnlocalStorageService.obtenerIdUsuario();
    if (idUsuario !== null) {
      this.AnualService.obtenerIngresoPorId2034(idUsuario).subscribe(
        (ingresos: Ingreso[]) => {
          this.ingresos = ingresos;
          this.totalIngreso2034 = this.ingresos.reduce(
            (total, ingreso) => total + ingreso.importe,
            0
          );
        }
      );
    }
  }
}
