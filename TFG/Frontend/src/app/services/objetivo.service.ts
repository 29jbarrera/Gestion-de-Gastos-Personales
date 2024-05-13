import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Observable, empty } from 'rxjs';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { enviroment } from '../environments/enviroment';

import { DatosEnLocalStorageService } from './datos-en-local-storage.service';
import { Objetivo } from '../interfaces/objetivo-interface';

const base_url = enviroment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ObjetivoService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private DatosEnLocalStorageService: DatosEnLocalStorageService
  ) {}

  crearObjetivo(formData: Objetivo): Observable<any> {
    const token = this.DatosEnLocalStorageService.obtenerToken();
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
    const token = this.DatosEnLocalStorageService.obtenerToken();
    if (!token) {
      return empty();
    }
    const ultimoSegmentoURL = this.router.url.split('/').pop();
    const yearString = localStorage.getItem('year');
    const yearNumber = yearString ? parseInt(yearString, 10) : null;

    return this.http.get<any>(`${base_url}/objetivo/${idUsuario}`).pipe(
      map((response) => response.objetivo),
      map((objetivo: Objetivo[]) =>
        objetivo.filter(
          (objetivo) =>
            objetivo.mes === ultimoSegmentoURL && objetivo.year === yearNumber
        )
      )
    );
  }

  actualizarObjetivo(objetivo: Objetivo, objetivoId: string): Observable<any> {
    const token = this.DatosEnLocalStorageService.obtenerToken();
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

  eliminarObjetivo(objetivoId: string): Observable<any> {
    const token = this.DatosEnLocalStorageService.obtenerToken();
    if (!token) {
      return of(null);
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-token': token,
    });

    return this.http.delete(`${base_url}/objetivo/${objetivoId}`, { headers });
  }


  // OBJETIVOS POR AÑOS RESUMEN

  obtenerObjetivoPorId2024(idUsuario: string): Observable<Objetivo[]> {
    const token = this.DatosEnLocalStorageService.obtenerToken();
    if (!token) {
      return empty();
    }

    return this.http.get<any>(`${base_url}/objetivo/${idUsuario}`).pipe(
      map((response) => response.objetivo),
      map((objetivo: Objetivo[]) =>
        objetivo.filter((objetivo) => objetivo.year === 2024)
      )
    );
  }

  obtenerObjetivoPorId2025(idUsuario: string): Observable<Objetivo[]> {
    const token = this.DatosEnLocalStorageService.obtenerToken();
    if (!token) {
      return empty();
    }

    return this.http.get<any>(`${base_url}/objetivo/${idUsuario}`).pipe(
      map((response) => response.objetivo),
      map((objetivo: Objetivo[]) =>
        objetivo.filter((objetivo) => objetivo.year === 2025)
      )
    );
  }

  obtenerObjetivoPorId2026(idUsuario: string): Observable<Objetivo[]> {
    const token = this.DatosEnLocalStorageService.obtenerToken();
    if (!token) {
      return empty();
    }

    return this.http.get<any>(`${base_url}/objetivo/${idUsuario}`).pipe(
      map((response) => response.objetivo),
      map((objetivo: Objetivo[]) =>
        objetivo.filter((objetivo) => objetivo.year === 2026)
      )
    );
  }

  obtenerObjetivoPorId2027(idUsuario: string): Observable<Objetivo[]> {
    const token = this.DatosEnLocalStorageService.obtenerToken();
    if (!token) {
      return empty();
    }

    return this.http.get<any>(`${base_url}/objetivo/${idUsuario}`).pipe(
      map((response) => response.objetivo),
      map((objetivo: Objetivo[]) =>
        objetivo.filter((objetivo) => objetivo.year === 2027)
      )
    );
  }

  obtenerObjetivoPorId2028(idUsuario: string): Observable<Objetivo[]> {
    const token = this.DatosEnLocalStorageService.obtenerToken();
    if (!token) {
      return empty();
    }

    return this.http.get<any>(`${base_url}/objetivo/${idUsuario}`).pipe(
      map((response) => response.objetivo),
      map((objetivo: Objetivo[]) =>
        objetivo.filter((objetivo) => objetivo.year === 2028)
      )
    );
  }

  obtenerObjetivoPorId2029(idUsuario: string): Observable<Objetivo[]> {
    const token = this.DatosEnLocalStorageService.obtenerToken();
    if (!token) {
      return empty();
    }

    return this.http.get<any>(`${base_url}/objetivo/${idUsuario}`).pipe(
      map((response) => response.objetivo),
      map((objetivo: Objetivo[]) =>
        objetivo.filter((objetivo) => objetivo.year === 2029)
      )
    );
  }

  obtenerObjetivoPorId2030(idUsuario: string): Observable<Objetivo[]> {
    const token = this.DatosEnLocalStorageService.obtenerToken();
    if (!token) {
      return empty();
    }

    return this.http.get<any>(`${base_url}/objetivo/${idUsuario}`).pipe(
      map((response) => response.objetivo),
      map((objetivo: Objetivo[]) =>
        objetivo.filter((objetivo) => objetivo.year === 2030)
      )
    );
  }

  obtenerObjetivoPorId2031(idUsuario: string): Observable<Objetivo[]> {
    const token = this.DatosEnLocalStorageService.obtenerToken();
    if (!token) {
      return empty();
    }

    return this.http.get<any>(`${base_url}/objetivo/${idUsuario}`).pipe(
      map((response) => response.objetivo),
      map((objetivo: Objetivo[]) =>
        objetivo.filter((objetivo) => objetivo.year === 2031)
      )
    );
  }

  obtenerObjetivoPorId2032(idUsuario: string): Observable<Objetivo[]> {
    const token = this.DatosEnLocalStorageService.obtenerToken();
    if (!token) {
      return empty();
    }

    return this.http.get<any>(`${base_url}/objetivo/${idUsuario}`).pipe(
      map((response) => response.objetivo),
      map((objetivo: Objetivo[]) =>
        objetivo.filter((objetivo) => objetivo.year === 2032)
      )
    );
  }

  obtenerObjetivoPorId2033(idUsuario: string): Observable<Objetivo[]> {
    const token = this.DatosEnLocalStorageService.obtenerToken();
    if (!token) {
      return empty();
    }

    return this.http.get<any>(`${base_url}/objetivo/${idUsuario}`).pipe(
      map((response) => response.objetivo),
      map((objetivo: Objetivo[]) =>
        objetivo.filter((objetivo) => objetivo.year === 2033)
      )
    );
  }

  obtenerObjetivoPorId2034(idUsuario: string): Observable<Objetivo[]> {
    const token = this.DatosEnLocalStorageService.obtenerToken();
    if (!token) {
      return empty();
    }

    return this.http.get<any>(`${base_url}/objetivo/${idUsuario}`).pipe(
      map((response) => response.objetivo),
      map((objetivo: Objetivo[]) =>
        objetivo.filter((objetivo) => objetivo.year === 2034)
      )
    );
  }
}
