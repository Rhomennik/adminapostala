import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tarjetas } from '../../models/tarjetas.model';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
@Injectable({
  providedIn: 'root'
})
export class TarjetasService {

  tarjeta: Tarjetas;
  token: string;
  constructor(public http: HttpClient,
    public _usuarioService: UsuarioService) { }

  listarTarjetas( desde: number = 0) {

    const url = URL_SERVICIOS + '/tarjeta?desde=' + desde;
  return this.http.get(url);

     }

     buscarTarjetas( termino: string) {
      const url = URL_SERVICIOS + '/busqueda/coleccion/tarjetas/' + termino;
      return this.http.get(url)
      .pipe(map((resp: any) => resp.tarjetas));
    }


    actualizarTarjetas( tarjeta: Tarjetas ) {
      let url = URL_SERVICIOS + '/tarjeta/' + tarjeta._id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put(url, tarjeta)
      .pipe(map((resp: any) => {
      swal('Tarjeta Actualizada', tarjeta.cliente, 'success');
      return resp.tarjeta;
      }));
    }

    borrarTarjeta( _id: string ) {
      let url = URL_SERVICIOS + '/tarjeta/' + _id;
      url += '?token=' + this._usuarioService.token;
      return this.http.delete(url)
      .pipe(map(resp => {
        swal('Tarjeta Borrado', 'El Tarjeta a sido eliminado correctamente', 'success');
        return true;
      }));
    }
}

