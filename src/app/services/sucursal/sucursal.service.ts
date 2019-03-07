import { Injectable } from '@angular/core';
import { Sucursals } from 'src/app/models/sucursal';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { map } from 'rxjs/operators';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {


  sucursales: Sucursals;

  token: string;



  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) { }

  buscarSucursal( termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/sucursal/' + termino;
    return this.http.get(url)
    .pipe(map((resp: any) => resp.sucursal));
  }

  cargarDepartamentos( desde: number = 0 ) {
    const url = URL_SERVICIOS + '/departamentos/desde/' + desde;
   // console.log('URL : ????????', url);
    return this.http.get(url);
  }

 // Este es para listar LAs Sucursales
  cargarSucursal( desde: number = 0) {
   let url = URL_SERVICIOS + '/sucursal/' + desde;
   url += '?token=' + this._usuarioService.token;
  // console.log('URL : ????????', url);
   return this.http.get(url);
  }

  guardarSucursal(sucursa: Sucursals) {

    let url = URL_SERVICIOS + '/sucursal';


    if (sucursa._id) {
      // atualizamos se vem com Id

      url += '/' + sucursa._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put(url, sucursa)
      .pipe(map((resp: any) => {
        swal('Sucursal Atualizada', sucursa.nombre, 'success');
      }));

    } else {

      // criando

      url += '?token=' + this._usuarioService.token;
      return this.http.post(url, sucursa)
      .pipe(map((resp: any) => {
        swal('Medico Creado', sucursa.nombre, 'success');
        return resp.sucursal;
      }));
    }



  }

  borrarSucursal( id: String) {

    let url = URL_SERVICIOS +  '/sucursal/' + id;
    url += '?token=' + this._usuarioService.token;
      return this.http.delete(url)
      .pipe(map((resp: any) => {
        swal('Medico Borrado', 'Correctamente', 'success');
      }));

  }
  // If for NAVIGATE TO SUCURSA PER EDIT
  editarSucursal( id: String ) {
    const url = URL_SERVICIOS + '/sucursal/id/' + id;
    return this.http.get(url)
    .pipe(map((resp: any)  => resp.sucursal ));
  }




}
