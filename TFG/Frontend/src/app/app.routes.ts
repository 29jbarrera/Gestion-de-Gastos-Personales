import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { authGuard } from './guards/auth.guard';

import InterfazInicioComponent from './auth/interfaz-inicio/interfaz-inicio.component';
import { CalendarInicioComponent } from './pages/calendar-inicio/calendar-inicio.component';
import { MesesComponent } from './pages/meses/meses.component';
import { RegisterComponent } from './auth/register/register.component';
import { HeaderComponent } from './header/header.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { AhorroAnualComponent } from './pages/ahorro-anual/ahorro-anual.component';

const routes: Routes = [
  {
    path: 'inicio',
    component: HeaderComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: CalendarInicioComponent },
      { path: 'enero', component: MesesComponent },
      { path: 'febrero', component: MesesComponent },
      { path: 'marzo', component: MesesComponent },
      { path: 'abril', component: MesesComponent },
      { path: 'mayo', component: MesesComponent },
      { path: 'junio', component: MesesComponent },
      { path: 'julio', component: MesesComponent },
      { path: 'agosto', component: MesesComponent },
      { path: 'septiembre', component: MesesComponent },
      { path: 'octubre', component: MesesComponent },
      { path: 'noviembre', component: MesesComponent },
      { path: 'diciembre', component: MesesComponent },
      { path: 'ahorro-anual', component: AhorroAnualComponent },
    ],
  },
  { path: 'register', component: RegisterComponent },
  { path: '', component: InterfazInicioComponent },

  { path: '**', component: NopagefoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

export { routes };
