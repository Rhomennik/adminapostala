import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { throwError, empty } from 'rxjs';
import {Observable} from 'rxjs/Observable';

import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
    ) {

    this.cargarStorage();
   // console.log('Serivicio de usuario funcionando');
   }


   renuevaToken() {
     let url = URL_SERVICIOS + '/login/renuevatoken';
     url += '?token=' + this.token;

     this.http.get(url)
     .pipe(map((resp: any) => {

        this.token = resp.token;
        localStorage.setItem('token', this.token );
       // console.log('Token Renovado');
        return true;
     }),
     catchError( (err: any) => {
       this.router.navigate(['/login']);
      swal({
        title: 'Error',
        text: 'No se pudo borrar el Token',
        icon: 'error',
      });
      //  console.log(err.error.mensaje);
        return new Observable<any>();
     }));
   }

   estaLogueado( ) {
      return( this.token.length > 5 ) ? true : false;
   }

   cargarStorage() {
     if ( localStorage.getItem('token')) {
        this.token = localStorage.getItem('token');
        this.usuario = JSON.parse(localStorage.getItem('usuario'));
        this.menu = JSON.parse(localStorage.getItem('menu'));
     } else {
       this.token = '';
       this.usuario = null;
       this.menu = [];
     }
   }


   guardarStorage( id: string, token: string, usuario: Usuario, menu: any ) {

          localStorage.setItem('id', id );
          localStorage.setItem('token', token );
          localStorage.setItem('usuario', JSON.stringify(usuario) );
          localStorage.setItem('menu', JSON.stringify(menu) );
          this.usuario = usuario;
          this.token = token;
          this.menu = menu;

  }
// ===================
// Logout cuando se sale da el clear en el local storage al token y usuario
// ===================
logout() {
  this.usuario = null ;
  this.token = '';
  this.menu = [];
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
  localStorage.removeItem('menu');
  this.router.navigate(['/login']);
}



// ===================
// Login por google
// ===================

loginGoogle( token: string ) {
  const url = URL_SERVICIOS + '/login/google';

  return this.http.post( url, { token } )
                .pipe(map ((resp: any) => {
                 // console.log(resp);
                  this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu );
                  return true;
                }));


}






// ===================
// Entrar con un usuario, Login e gravando no local storage
// ===================

login( usuario: Usuario, recordar: boolean= false ) {
  if ( recordar ) {
    localStorage.setItem('email', usuario.email);
  } else {
    localStorage.removeItem('email');
  }

  const url = URL_SERVICIOS + '/login';
  return this.http.post( url, usuario)
        .pipe(map( (resp: any) => {
         // console.log(resp);
          this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu );
          return true;
        }),
       catchError( (err: any) => {
        swal({
          title: 'Error',
          text: err.error.mensaje,
          icon: 'error',
        });
        //  console.log(err.error.mensaje);
          return new Observable<any>();
       })
     );
   }



// ===================
// Crear un usuario, REgister
// ===================
   // este metodo crearusuario vai ser chamaod ao clicar no botao registarr, ele ira fazer um qry do postman
   //  "Usuario" chama nosso usuario.model.ts nossa informacao do usuario inplementado no html
   crearUsuario( usuario: Usuario) {

    const url = URL_SERVICIOS + '/usuario';

return this.http.post(url, usuario)
.pipe(map((res: any) => {
     swal('Correo Creado', usuario.email, 'success');
     return res.usuario;
    }) );



   }

   actualizarUsuario( usuario: Usuario ) {

    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put( url, usuario )
                .pipe(map( (resp: any) => {

                  if ( usuario._id === this.usuario._id ) {
                    const usuarioDB: Usuario = resp.usuario;
                    this.guardarStorage( usuarioDB._id, this.token, usuarioDB, this.menu );
                  }

                  swal('Usuario actualizado', usuario.nombre, 'success' );

                  return true;
                }));

  }

   cambiarImagen(archivo: File, id: string) {
     this._subirArchivoService.subirArchivo( archivo, 'usuarios', id )
     .then( (resp: any) => {

      this.usuario.img = resp.usuario.img;
      swal('Imagen Atualizada', this.usuario.nombre, 'success');

      this.guardarStorage( id, this.token, this.usuario, this.menu );
     })
     .catch( resp => {
     //  console.log (resp);
     });
   }

   cargarUsuarios( desde: number = 0) {

  let url = URL_SERVICIOS + '/usuario/' + desde;
  url += '/?token=' + this.token;
return this.http.get(url);

   }

   buscarUsuarios( termino: string) {
     const url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
     return this.http.get(url)
     .pipe(map((resp: any) => resp.usuarios));
   }

   buscaarUsuarios( termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/NORMAL_USER';
    return this.http.get(url)
    .pipe(map((resp: any) => resp.usuarios));
  }

   borrarUsuario(_id: string) {
     let url = URL_SERVICIOS + '/usuario/' + _id;
     url += '?token=' + this.token;
     return this.http.delete(url)
     .pipe(map(resp => {
       swal('Usuario Borrado', 'El usuario a sido eliminado correctamente', 'success');
       return true;
     }));
   }



  }
