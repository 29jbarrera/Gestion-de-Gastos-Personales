import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { enviroment } from '../environments/enviroment';

import { DatosEnLocalStorageService } from './datos-en-local-storage.service';

import { RegisterForm } from '../interfaces/register-form.interface';
import { loginForm } from '../interfaces/login-form.interface';

const base_url = enviroment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private DatosEnLocalStorageService: DatosEnLocalStorageService
  ) {}

  // CERRAR SESION Y ELIMINAR LOCAL STORE
  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
  }

  // VALIDACION DE TOKEN
  validartoken(): Observable<boolean> {
    const token = this.DatosEnLocalStorageService.obtenerToken() ?? '';

    return this.http
      .get(`${base_url}/login/renew`, {
        headers: {
          'x-token': token,
        },
      })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        }),
        map((resp) => true)
      );
  }

  // FUNCION PARA CREAR USUARIO
  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData).pipe(
      tap((resp: any) => {
        const token = resp.token;
        this.DatosEnLocalStorageService.guardarToken(token);
      })
    );
  }

  // FUNCION DE LOGEAR USUARIO
  login(formData: loginForm): Observable<any> {
    this.DatosEnLocalStorageService.guardarEmail(formData.email);

    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((resp: any) => {
        this.DatosEnLocalStorageService.guardarToken(resp.token);
        const currentYear = new Date().getFullYear();
        this.DatosEnLocalStorageService.guardarYear(currentYear);
      }),
      map(() => this.obtenerDatosUsuario())
    );
  }

  // OBTENER DATOS DE USUARIO LOGEADO Y GUARDADO EN LOCAL STORE
  obtenerDatosUsuario(): Observable<any> {
    const token = this.DatosEnLocalStorageService.obtenerToken();
    if (!token) {
      return of(null);
    }

    const email = this.DatosEnLocalStorageService.obtenerEmail();
    const requestBody = { email };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-token': token,
    });
    return this.http
      .post(`${base_url}/usuarios/logeado`, requestBody, { headers })
      .pipe(
        map((response: any) => {
          const nombreUsuario = response.nombreUsuario;
          const idUsuario = response.idUsuario;
          const role = response.role;
          this.DatosEnLocalStorageService.guardarIDUsuario(idUsuario);

          return { nombreUsuario, idUsuario, role };
        })
      );
  }

  // VERIFICAR SI ES ADMINISTRADOR
  isAdminCheck(): Observable<boolean> {
    return this.obtenerDatosUsuario().pipe(
      map((usuario) => usuario && usuario.role === 'admin'),
      catchError(() => of(false))
    );
  }

  // OBTENER TOTAL DE USUARIO REGISTRADOS
  obtenerTotalUsuario(): Observable<any> {
    const token = this.DatosEnLocalStorageService.obtenerToken();
    if (!token) {
      return of(null);
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-token': token,
    });
    return this.http.get(`${base_url}/usuarios`, { headers }).pipe(
      map((response: any) => {
        return response.total;
      })
    );
  }
}
