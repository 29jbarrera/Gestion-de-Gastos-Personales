import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Observable, empty } from 'rxjs';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { enviroment } from '../environments/enviroment';
import { Ingreso } from '../interfaces/ingreso-interface';

const base_url = enviroment.base_url;

@Injectable({
  providedIn: 'root',
})
export class IngresosService {
  constructor(private http: HttpClient, private router: Router) {}

  crearIngreso(formData: Ingreso): Observable<any> {
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
      .post(`${base_url}/ingresos`, formData, {
        headers,
      })
      .pipe();
  }

  obtenerIngresoPorId(idUsuario: string): Observable<Ingreso[]> {
    const token = localStorage.getItem('token');
    if (!token) {
      return empty();
    }
    const ultimoSegmentoURL = this.router.url.split('/').pop();
    const yearString = localStorage.getItem('year');
    const yearNumber = yearString ? parseInt(yearString, 10) : null;

    return this.http.get<any>(`${base_url}/ingresos/${idUsuario}`).pipe(
      map((response) => response.ingresos),
      map((ingresos: Ingreso[]) =>
        ingresos.filter((ingreso) => ingreso.mes === ultimoSegmentoURL && ingreso.year === yearNumber)
      )
    );
  }

  eliminarIngreso(idIngreso: string): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      return of(null);
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-token': token,
    });

    return this.http.delete(`${base_url}/ingresos/${idIngreso}`, { headers });
  }
}
