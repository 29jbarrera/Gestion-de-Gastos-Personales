import { CanActivateFn } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const usuarioservice = inject(UsuarioService);
  return usuarioservice.validartoken();
};
