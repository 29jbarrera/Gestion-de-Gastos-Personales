import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Observable, empty, map } from 'rxjs';

import { enviroment } from '../environments/enviroment';
import { Gasto } from '../interfaces/gasto-interface';
import { DatosEnLocalStorageService } from './datos-en-local-storage.service';
import { Ingreso } from '../interfaces/ingreso-interface';

const base_url = enviroment.base_url;

@Injectable({
  providedIn: 'root',
})
export class AnualService {
  constructor(
    private router: Router,
    private http: HttpClient,
    private DatosEnLocalStorageService: DatosEnLocalStorageService
  ) {}

  navigate() {
    this.router.navigateByUrl('/inicio/ahorro-anual');
  }

  guardarAhorro(_id: string, mes: string, year: number, ahorro: number) {
    return this.http.post<any>('/api/ahorro', { _id, mes, year, ahorro });
  }

  // Obtencion de gastos anuales
  obtenerGastosPorIdYear2024(idUsuario: string): Observable<Gasto[]> {
    const token = this.DatosEnLocalStorageService.obtenerToken();
    if (!token) {
      return empty();
    }

    return this.http.get<any>(`${base_url}/gastos/${idUsuario}`).pipe(
      map((response: { gastos: any }) => response.gastos),
      map((gastos: Gasto[]) => gastos.filter((gasto) => gasto.year === 2024))
    );
  }

  obtenerGastosPorIdYear2025(idUsuario: string): Observable<Gasto[]> {
    const token = this.DatosEnLocalStorageService.obtenerToken();
    if (!token) {
      return empty();
    }

    return this.http.get<any>(`${base_url}/gastos/${idUsuario}`).pipe(
      map((response: { gastos: any }) => response.gastos),
      map((gastos: Gasto[]) => gastos.filter((gasto) => gasto.year === 2025))
    );
  }

  obtenerGastosPorIdYear2026(idUsuario: string): Observable<Gasto[]> {
    const token = this.DatosEnLocalStorageService.obtenerToken();
    if (!token) {
      return empty();
    }

    return this.http.get<any>(`${base_url}/gastos/${idUsuario}`).pipe(
      map((response: { gastos: any }) => response.gastos),
      map((gastos: Gasto[]) => gastos.filter((gasto) => gasto.year === 2026))
    );
  }

  obtenerGastosPorIdYear2027(idUsuario: string): Observable<Gasto[]> {
    const token = this.DatosEnLocalStorageService.obtenerToken();
    if (!token) {
      return empty();
    }

    return this.http.get<any>(`${base_url}/gastos/${idUsuario}`).pipe(
      map((response: { gastos: any }) => response.gastos),
      map((gastos: Gasto[]) => gastos.filter((gasto) => gasto.year === 2027))
    );
  }

  obtenerGastosPorIdYear2028(idUsuario: string): Observable<Gasto[]> {
    const token = this.DatosEnLocalStorageService.obtenerToken();
    if (!token) {
      return empty();
    }

    return this.http.get<any>(`${base_url}/gastos/${idUsuario}`).pipe(
      map((response: { gastos: any }) => response.gastos),
      map((gastos: Gasto[]) => gastos.filter((gasto) => gasto.year === 2028))
    );
  }

  obtenerGastosPorIdYear2029(idUsuario: string): Observable<Gasto[]> {
    const token = this.DatosEnLocalStorageService.obtenerToken();
    if (!token) {
      return empty();
    }

    return this.http.get<any>(`${base_url}/gastos/${idUsuario}`).pipe(
      map((response: { gastos: any }) => response.gastos),
      map((gastos: Gasto[]) => gastos.filter((gasto) => gasto.year === 2029))
    );
  }

  obtenerGastosPorIdYear2030(idUsuario: string): Observable<Gasto[]> {
    const token = this.DatosEnLocalStorageService.obtenerToken();
    if (!token) {
      return empty();
    }

    return this.http.get<any>(`${base_url}/gastos/${idUsuario}`).pipe(
      map((response: { gastos: any }) => response.gastos),
      map((gastos: Gasto[]) => gastos.filter((gasto) => gasto.year === 2030))
    );
  }

  obtenerGastosPorIdYear2031(idUsuario: string): Observable<Gasto[]> {
    const token = this.DatosEnLocalStorageService.obtenerToken();
    if (!token) {
      return empty();
    }

    return this.http.get<any>(`${base_url}/gastos/${idUsuario}`).pipe(
      map((response: { gastos: any }) => response.gastos),
      map((gastos: Gasto[]) => gastos.filter((gasto) => gasto.year === 2031))
    );
  }

  obtenerGastosPorIdYear2032(idUsuario: string): Observable<Gasto[]> {
    const token = this.DatosEnLocalStorageService.obtenerToken();
    if (!token) {
      return empty();
    }

    return this.http.get<any>(`${base_url}/gastos/${idUsuario}`).pipe(
      map((response: { gastos: any }) => response.gastos),
      map((gastos: Gasto[]) => gastos.filter((gasto) => gasto.year === 2032))
    );
  }

  obtenerGastosPorIdYear2033(idUsuario: string): Observable<Gasto[]> {
    const token = this.DatosEnLocalStorageService.obtenerToken();
    if (!token) {
      return empty();
    }

    return this.http.get<any>(`${base_url}/gastos/${idUsuario}`).pipe(
      map((response: { gastos: any }) => response.gastos),
      map((gastos: Gasto[]) => gastos.filter((gasto) => gasto.year === 2033))
    );
  }

  obtenerGastosPorIdYear2034(idUsuario: string): Observable<Gasto[]> {
    const token = this.DatosEnLocalStorageService.obtenerToken();
    if (!token) {
      return empty();
    }

    return this.http.get<any>(`${base_url}/gastos/${idUsuario}`).pipe(
      map((response: { gastos: any }) => response.gastos),
      map((gastos: Gasto[]) => gastos.filter((gasto) => gasto.year === 2034))
    );
  }

  // Obtencion de ingresos anuales

  obtenerIngresoPorId2024(idUsuario: string): Observable<Ingreso[]> {
    const token = this.DatosEnLocalStorageService.obtenerToken();
    if (!token) {
      return empty();
    }

    return this.http.get<any>(`${base_url}/ingresos/${idUsuario}`).pipe(
      map((response) => response.ingresos),
      map((ingresos: Ingreso[]) =>
        ingresos.filter((ingreso) => ingreso.year === 2024)
      )
    );
  }
  obtenerIngresoPorId2025(idUsuario: string): Observable<Ingreso[]> {
    const token = this.DatosEnLocalStorageService.obtenerToken();
    if (!token) {
      return empty();
    }

    return this.http.get<any>(`${base_url}/ingresos/${idUsuario}`).pipe(
      map((response) => response.ingresos),
      map((ingresos: Ingreso[]) =>
        ingresos.filter((ingreso) => ingreso.year === 2025)
      )
    );
  }
  obtenerIngresoPorId2026(idUsuario: string): Observable<Ingreso[]> {
    const token = this.DatosEnLocalStorageService.obtenerToken();
    if (!token) {
      return empty();
    }

    return this.http.get<any>(`${base_url}/ingresos/${idUsuario}`).pipe(
      map((response) => response.ingresos),
      map((ingresos: Ingreso[]) =>
        ingresos.filter((ingreso) => ingreso.year === 2026)
      )
    );
  }
  obtenerIngresoPorId2027(idUsuario: string): Observable<Ingreso[]> {
    const token = this.DatosEnLocalStorageService.obtenerToken();
    if (!token) {
      return empty();
    }

    return this.http.get<any>(`${base_url}/ingresos/${idUsuario}`).pipe(
      map((response) => response.ingresos),
      map((ingresos: Ingreso[]) =>
        ingresos.filter((ingreso) => ingreso.year === 2027)
      )
    );
  }
  obtenerIngresoPorId2028(idUsuario: string): Observable<Ingreso[]> {
    const token = this.DatosEnLocalStorageService.obtenerToken();
    if (!token) {
      return empty();
    }

    return this.http.get<any>(`${base_url}/ingresos/${idUsuario}`).pipe(
      map((response) => response.ingresos),
      map((ingresos: Ingreso[]) =>
        ingresos.filter((ingreso) => ingreso.year === 2028)
      )
    );
  }
  obtenerIngresoPorId2029(idUsuario: string): Observable<Ingreso[]> {
    const token = this.DatosEnLocalStorageService.obtenerToken();
    if (!token) {
      return empty();
    }

    return this.http.get<any>(`${base_url}/ingresos/${idUsuario}`).pipe(
      map((response) => response.ingresos),
      map((ingresos: Ingreso[]) =>
        ingresos.filter((ingreso) => ingreso.year === 2029)
      )
    );
  }
  obtenerIngresoPorId2030(idUsuario: string): Observable<Ingreso[]> {
    const token = this.DatosEnLocalStorageService.obtenerToken();
    if (!token) {
      return empty();
    }

    return this.http.get<any>(`${base_url}/ingresos/${idUsuario}`).pipe(
      map((response) => response.ingresos),
      map((ingresos: Ingreso[]) =>
        ingresos.filter((ingreso) => ingreso.year === 2030)
      )
    );
  }
  obtenerIngresoPorId2031(idUsuario: string): Observable<Ingreso[]> {
    const token = this.DatosEnLocalStorageService.obtenerToken();
    if (!token) {
      return empty();
    }

    return this.http.get<any>(`${base_url}/ingresos/${idUsuario}`).pipe(
      map((response) => response.ingresos),
      map((ingresos: Ingreso[]) =>
        ingresos.filter((ingreso) => ingreso.year === 2031)
      )
    );
  }
  obtenerIngresoPorId2032(idUsuario: string): Observable<Ingreso[]> {
    const token = this.DatosEnLocalStorageService.obtenerToken();
    if (!token) {
      return empty();
    }

    return this.http.get<any>(`${base_url}/ingresos/${idUsuario}`).pipe(
      map((response) => response.ingresos),
      map((ingresos: Ingreso[]) =>
        ingresos.filter((ingreso) => ingreso.year === 2032)
      )
    );
  }
  obtenerIngresoPorId2033(idUsuario: string): Observable<Ingreso[]> {
    const token = this.DatosEnLocalStorageService.obtenerToken();
    if (!token) {
      return empty();
    }

    return this.http.get<any>(`${base_url}/ingresos/${idUsuario}`).pipe(
      map((response) => response.ingresos),
      map((ingresos: Ingreso[]) =>
        ingresos.filter((ingreso) => ingreso.year === 2033)
      )
    );
  }
  obtenerIngresoPorId2034(idUsuario: string): Observable<Ingreso[]> {
    const token = this.DatosEnLocalStorageService.obtenerToken();
    if (!token) {
      return empty();
    }

    return this.http.get<any>(`${base_url}/ingresos/${idUsuario}`).pipe(
      map((response) => response.ingresos),
      map((ingresos: Ingreso[]) =>
        ingresos.filter((ingreso) => ingreso.year === 2034)
      )
    );
  }

}
