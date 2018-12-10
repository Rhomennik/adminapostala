import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
    ) {

    this.cargarStorage();
   // console.log('Serivicio de usuario funcionando');
   }

   estaLogueado( ) {
      return( this.token.length > 5 ) ? true : false;
   }

   cargarStorage() {
     if ( localStorage.getItem('token')) {
        this.token = localStorage.getItem('token');
        this.usuario = JSON.parse(localStorage.getItem('usuario'));
     } else {
       this.token = '';
       this.usuario = null;
     }
   }


   guardarStorage( id: string, token: string, usuario: Usuario ) {

          localStorage.setItem('id', id );
          localStorage.setItem('token', token );
          localStorage.setItem('usuario', JSON.stringify(usuario) );
          this.usuario = usuario;
          this.token = token;

  }
// ===================
// Logout cuando se sale da el clear en el local storage al token y usuario
// ===================
logout() {
  this.usuario = null ;
  this.token = '';
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
  this.router.navigate(['/login']);
}



// ===================
// Login por google
// ===================

loginGoogle( token: string ) {
  const url = URL_SERVICIOS + '/login/google';

  return this.http.post( url, { token } )
                .pipe(map ((resp: any) => {
                  this.guardarStorage( resp.id, resp.token, resp.usuario );
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
          this.guardarStorage( resp.id, resp.token, resp.usuario );
        }));

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

    }));



   }

   actualizarUsuario( usuario: Usuario ) {

    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;
    // console.log( url );

    this.http.put( url, usuario )
    .pipe(map((resp: any) => {

      // this.usuario = resp.usuario;
      const usuarioDB: Usuario = resp.usuario;
      if ( !this.usuario.google ) {
        this.guardarStorage( usuarioDB._id, this.token, usuarioDB );
      }
      sweetAlert('Correcto', usuario.nombre, 'success');

      return true;

    }))
    .subscribe( resp => {
      console.log(resp);
    });

   }

   cambiarImagen(archivo: File, id: string) {
     this._subirArchivoService.subirArchivo( archivo, 'usuarios', id )
     .then( (resp: any) => {

      this.usuario.img = resp.usuario.img;
      swal('Imagen Atualizada', this.usuario.nombre, 'success');

      this.guardarStorage( id, this.token, this.usuario );
     })
     .catch( resp => {
       console.log (resp);
     });
   }


  }
