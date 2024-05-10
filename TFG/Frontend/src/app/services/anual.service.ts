import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AnualService {

  constructor(private router: Router) { }

  navigate() {
    console.log('Estoy haciendo click')
    this.router.navigateByUrl('/inicio/ahorro-anual');
  }
}
