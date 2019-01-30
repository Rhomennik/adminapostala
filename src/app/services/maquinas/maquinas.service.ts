import { Injectable } from '@angular/core';
import { Maquinas } from '../../models/maquinas.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
@Injectable({
  providedIn: 'root',

})
export class MaquinasService {

  maquinas: Maquinas;

  constructor(
    public http: HttpClient
  ) { }

  listarMaquinas(desde: number = 0) {
    const url = URL_SERVICIOS + '/maquinas?desde=' + desde;
    return this.http.get(url);
  }

}
