import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/internal/operators/map';
import { UsuarioService } from '../usuario/usuario.service';
import swal from 'sweetalert';
import { Medico } from 'src/app/models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarMedicos() {
    const url = URL_SERVICIOS + '/medico';
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

borrarMedico(_id: String) {
  let url = URL_SERVICIOS + '/medico/' + _id;
  url += '?token=' + this._usuarioService.token;
  return this.http.delete(url)
  .pipe(map(
    resp => {
    swal('Medico Borrado', 'Medico Borrado Correctamente', 'success');
    return resp;
  }));
}

guardarMedico(medico: Medico) {

  let url = URL_SERVICIOS + '/medico/';

  if ( medico._id) {
    // atualizando

    url += '/' + medico._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put( url, medico)
    .pipe(map ((resp: any) => {

      swal('Medico Atualizado', medico.nombre, 'success');
      return resp;

    }));

  } else {
    // criando

    url += '?token=' + this._usuarioService.token;
    return this.http.post(url, medico)
    .pipe(map((resp: any) => {
      swal('Medico Creado', medico.nombre, 'success');
      return resp.medico;
    }));
  }
}

cargarMedico(id: string) {

  const url = URL_SERVICIOS + '/medico/' + id;
  return this.http.get(url)
        .pipe(map( (resp: any) => resp.medico));
}


}
