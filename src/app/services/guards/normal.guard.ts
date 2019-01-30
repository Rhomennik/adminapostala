import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class NormalGuard implements CanActivate {

  constructor(
    public _usuarioService: UsuarioService
  ) {}
  canActivate() {

    if (this._usuarioService.usuario.role === 'USER_ROLE') {
      return true;
    }
    if (this._usuarioService.usuario.role === 'ADMIN_ROLE') {
      return true;
    } else {
        console.log('Baaloqueado por el ADMIN GUARD');
    }

    this._usuarioService.logout();
    swal ( 'Alerta' ,  'No estas autorizado, El administrador sabra que querias entrar donde no debes' ,  'error' );
    return true;
  }
}
