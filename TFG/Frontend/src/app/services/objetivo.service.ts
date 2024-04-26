import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Observable, empty } from 'rxjs';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { enviroment } from '../environments/enviroment';
import { Objetivo } from './../interfaces/objetivo-interface';

const base_url = enviroment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ObjetivoService {
  constructor(private http: HttpClient, private router: Router) {}

  crearObjetivo(formData: Objetivo): Observable<any> {
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
      .post(`${base_url}/objetivo`, formData, {
        headers,
      })
      .pipe();
  }

  obtenerObjetivoPorId(idUsuario: string): Observable<Objetivo[]> {
    const token = localStorage.getItem('token');
    if (!token) {
      return empty();
    }
    const ultimoSegmentoURL = this.router.url.split('/').pop();
    const yearString = localStorage.getItem('year');
    const yearNumber = yearString ? parseInt(yearString, 10) : null;

    return this.http.get<any>(`${base_url}/objetivo/${idUsuario}`).pipe(
      map((response) => response.objetivo),
      map((objetivo: Objetivo[]) =>
        objetivo.filter((objetivo) => objetivo.mes === ultimoSegmentoURL && objetivo.year === yearNumber)
      )
    );
  }

  actualizarObjetivo(objetivo: Objetivo, objetivoId: string): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token || !objetivoId) {
      return of(null);
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-token': token,
    });
    return this.http.put(`${base_url}/objetivo/${objetivoId}`, objetivo, {
      headers,
    });
  }
}
