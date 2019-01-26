import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number = 0;

  constructor(
    public http: HttpClient
  ) { }

  cargarMedicos() {
    let url = URL_SERVICIOS + '/medico';
    return this.http.get(url)
            .pipe(map(( resp: any) => {
              this.totalMedicos = resp.total;
              return resp.medicos;
            }));
}


buscarMedicos( termino: string) {
  const url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
  return this.http.get(url)
  .pipe(map((resp: any) => resp.medicos));
}

}
