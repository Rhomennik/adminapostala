import { Injectable } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  hospitales: Hospital;

  token: string;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService) { }


  cargarHospitales( desde: number = 0 ) {
    const url = URL_SERVICIOS + '/hospital?desde=' + desde;
    return this.http.get(url);
  }

  obtenerHospital(_id: string) {

    const url = URL_SERVICIOS + '/hospital/' + _id;
    return this.http.get(url)
    .pipe(map( (resp: any) => resp.hospital));

  }

  borrarHospital(	_id:	string	) {
    let url = URL_SERVICIOS + '/hospital/' + _id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete(url)
    .pipe(map(resp => {
      swal('Hospital Borrado', 'El Hospital a sido eliminado correctamente', 'success');
      return true;
    }));

  }

  crearHospital(	nombre:	string	) {

    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this._usuarioService.token;
    return this.http.post( url, { nombre })
    .pipe(map((resp: any) => resp.hospital));

  }

  buscarHospital(	termino:	string ) {

    const url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
     return this.http.get(url)
     .pipe(map((resp: any) => resp.hospitales));

  }

  actualizarHospital( hospital: Hospital ) {

    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put( url, hospital )
              .pipe(map( (resp: any) => {

                swal('Hospital Actualiado', hospital.nombre, 'success');
                return resp.hospital;
              }));

  }

  actualizarImagen( hospital: Hospital ) {

    this._modalUploadService.mostrarModal( ' hospitales', hospital._id);


  }
}

