import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Observable, empty } from 'rxjs';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { enviroment } from '../environments/enviroment';
import { Gasto } from '../interfaces/gasto-interface';

const base_url = enviroment.base_url;

@Injectable({
  providedIn: 'root',
})
export class GastosService {
  constructor(private http: HttpClient, private router: Router) {}

  crearGasto(formData: Gasto): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      return of(null);
    }

    const url = this.router.url;
    const segments = url.split('/');
    const yearString = localStorage.getItem('year');
    const yearNumber = yearString ? parseInt(yearString, 10) : null;

    const ultimoSegmento =
      segments.length > 0 ? segments[segments.length - 1] : '';

    formData.mes = ultimoSegmento;
    formData.year = yearNumber;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-token': token,
    });

    return this.http
      .post(`${base_url}/gastos`, formData, {
        headers,
      })
      .pipe();
  }

  obtenerGastosPorId(idUsuario: string): Observable<Gasto[]> {
    const token = localStorage.getItem('token');
    if (!token) {
      return empty();
    }
    const ultimoSegmentoURL = this.router.url.split('/').pop();
    const yearString = localStorage.getItem('year');
    const yearNumber = yearString ? parseInt(yearString, 10) : null;

    return this.http.get<any>(`${base_url}/gastos/${idUsuario}`).pipe(
      map((response) => response.gastos),
      map((gastos: Gasto[]) =>
        gastos.filter((gasto) => gasto.mes === ultimoSegmentoURL && gasto.year === yearNumber)
      )
    );
  }

  eliminarGasto(idGasto: string): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      return of(null);
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-token': token,
    });

    return this.http.delete(`${base_url}/gastos/${idGasto}`, { headers });
  }
}
