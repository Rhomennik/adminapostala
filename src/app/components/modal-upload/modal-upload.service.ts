import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public tipo: string;
  public id: string;

  public oculto: string = 'oculto';

  public notificacion = new EventEmitter<any>();

  constructor() {
 //   console.log('Modal upload listo');
   }

   ocultarModal(tipo: string, id: string) {

    this.oculto = 'oculto';
    this.id = id;
    this.tipo = tipo;

   }

   mostrarModal( tipo: string, id: string) {
     this.oculto = '';
    this.id = id;
    this.tipo = tipo;
   }

   ocultaarModal() {

    this.oculto = 'oculto';

   }
}
