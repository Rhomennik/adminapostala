import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from 'src/app/models/usuario.model';
import { withLatestFrom } from 'rxjs/operators';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: string;

  constructor(
    public _usuarioService: UsuarioService
  ) {
    this.usuario = this._usuarioService.usuario;
   }

  ngOnInit() {

  }
      guardar( usuario: Usuario) {
        console.log('1');
        this.usuario.nombre = usuario.nombre;
        if ( !this.usuario.google ) {
          this.usuario.email = usuario.email;
        }
        console.log('2');
        this._usuarioService.actualizarUsuario( this.usuario );

  }

  seleccionImagen( archivo: File) {
    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0 ) {
      swal('Solo Imagenes', 'El archivo tiene que ser GIF,JPG,JPEG,PNG ', 'error');
      this.imagenSubir = null;
      return;
    }
    this.imagenSubir = archivo;
    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result.toString();


  }
  cambiarImagen() {

    this._usuarioService.cambiarImagen( this.imagenSubir, this.usuario._id );

  }

}
