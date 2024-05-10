import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Ahorro } from '../interfaces/ahorro-interface';

@Injectable({
  providedIn: 'root',
})
export class AnualService {
  constructor(private router: Router, private http: HttpClient) {}

  navigate() {
    console.log('Estoy haciendo click');
    this.router.navigateByUrl('/inicio/ahorro-anual');
  }

  guardarAhorro(_id: string, mes: string, year: number, ahorro: number) {
    return this.http.post<any>('/api/ahorro', { _id, mes, year, ahorro });
  }
}
