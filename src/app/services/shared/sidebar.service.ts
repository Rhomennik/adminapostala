import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      // aqui podemos modificar iconos e tmb titulos do sidebar
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        // aqui iremos adicionar as futuras RUTAS?
        { titulo: 'Dashboard', url: '/dashboard' },
        { titulo: 'Maquinas', url: '/maquinas' },
        { titulo: 'Tarjetas', url: '/tarjetas' },
        { titulo: 'ProgressBar', url: '/progress' },
        { titulo: 'Graficas', url: '/graficas1' },
        { titulo: 'Promesas', url: '/promesas' },
        { titulo: 'Rxjs', url: '/rxjs' },
      ]
    }
  ];

  constructor() { }
}