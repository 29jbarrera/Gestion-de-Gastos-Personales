import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { enviroment } from '../environments/enviroment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { loginForm } from '../interfaces/login-form.interface';

const base_url = enviroment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient, private router: Router) {}

  // CERRAR SESION Y ELIMINAR LOCAL STORE

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
  }

  // VALIDACION DE TOKEN

  validartoken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

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
        localStorage.setItem('token', resp.token);
      })
    );
  }

  // FUNCION DE LOGEAR USUARIO

  login(formData: loginForm): Observable<any> {
    localStorage.setItem('email', formData.email);
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
        const currentYear = new Date().getFullYear().toString();
        localStorage.setItem('year', currentYear);
      }),
      map(() => this.obtenerDatosUsuario())
    );
  }

  // OBTENER DATOS DE USUARIO LOGEADO Y GUARDADO EN LOCAL STORE

  obtenerDatosUsuario(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      return of(null);
    }

    const email = localStorage.getItem('email') || '';
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
          localStorage.setItem('idUsuario', idUsuario);

          return { nombreUsuario, idUsuario, role };
        })
      );
  }

  // VERIFICAR SI ES ADMINISTRADOR
  isAdminCheck(): Observable<boolean> {
    return this.obtenerDatosUsuario().pipe(
      map((usuario) => usuario && usuario.role === 'admin'),
      catchError(() => of(false)) // Manejo de errores, devuelve false si hay algún error
    );
  }

  // OBTENER TOTAL DE USUARIO REGISTRADOS
  obtenerTotalUsuario(): Observable<any> {
    const token = localStorage.getItem('token');
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
