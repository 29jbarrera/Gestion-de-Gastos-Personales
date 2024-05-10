import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DatosEnLocalStorageService {
  constructor() {}

  // TOKEN
  guardarToken(token: string): void {
    localStorage.setItem('token', token);
  }

  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

  // YEAR
  guardarYear(year: number): void {
    localStorage.setItem('year', year.toString());
  }

  obtenerYear(): string | null {
    return localStorage.getItem('year');
  }

  // ID USUARIO
  guardarIDUsuario(idUsuario: string): void {
    localStorage.setItem('idUsuario', idUsuario);
  }

  obtenerIdUsuario(): string | null {
    return localStorage.getItem('idUsuario');
  }

  // EMAIL
  guardarEmail(email: string): void {
    localStorage.setItem('email', email);
  }

  obtenerEmail(): string | null {
    return localStorage.getItem('email');
  }
}
