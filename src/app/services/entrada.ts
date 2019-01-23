import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Entrada } from '../models/entrada';

@Injectable({
  providedIn: 'root'
})
export class EntradaService {

  selectedEntrada: Entrada;
  entradaas: Entrada[];

  readonly URL_API = 'http://172.16.0.15:3000/entrada';
  readonly abrir = 'http://172.16.0.69/f.php';


  constructor(private http: HttpClient) {
    this.selectedEntrada = new Entrada();
  }

  postEntrada(entrada: Entrada) {
    return this.http.post(this.URL_API, entrada);
  }

  getEntradas() {
    return this.http.get(this.URL_API);
  }

  putEntrada(entrada: Entrada) {
    return this.http.put(this.URL_API + `/${entrada._id}`, entrada);
  }

  deleteEntrada(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }
  abrirPorta() {
    return this.http.get(this.abrir);
  }
}
