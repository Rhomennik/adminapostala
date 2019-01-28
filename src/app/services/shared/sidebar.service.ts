import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [];

//  menu: any = [
//    {
//      // aqui podemos modificar iconos e tmb titulos do sidebar
//      titulo: 'Principal',
//      icono: 'mdi mdi-gauge',
//      submenu: [
        // aqui iremos adicionar as futuras RUTAS?
//        { titulo: 'Dashboard', url: '/dashboard' },
//        { titulo: 'Maquinas', url: '/maquinas' }
      //  { titulo: 'ProgressBar', url: '/progress' },
      //  { titulo: 'Graficas', url: '/graficas1' },
      //  { titulo: 'Promesas', url: '/promesas' },
      //  { titulo: 'Rxjs', url: '/rxjs' },
//      ]
//    },
//    {
//      titulo: 'Puerta',
//      icono: 'mdi mdi-glassdoor',
//      submenu: [
//        // aqui iremos adicionar as futuras RUTAS?
//        { titulo: 'Tarjetas', url: '/tarjetas' },
//        { titulo: 'Entradas',  url: '/entrada' }
//      ]
//    },
//    {
//      titulo: 'Mantenimientos',
//      icono: 'mdi mdi-folder-lock-open',
 //     submenu: [
 //       {titulo: 'Usuarios', url: '/usuarios'},
//        {titulo: 'Hospitales', url: '/hospitales'},
//        {titulo: 'Medicos', url: '/medicos'}
//      ]
//    }
// ];

  constructor(
    public _UsuarioService: UsuarioService
  ) {}

   cargarMenu() {

    this.menu = this._UsuarioService.menu;

   }
}
