import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { Subscriber, Subscription } from 'rxjs';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';


declare var swal: any;
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarUsuario();
    this._modalUploadService.notificacion.subscribe( resp => this.cargarUsuario());
  }

  mostrarModal( _id: string ) {
    this._modalUploadService.mostrarModal( 'usuarios', _id );

  }

  cargarUsuario() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios( this.desde )
    .subscribe((resp: any) => {
     // console.log(resp);
      this.totalRegistros = resp.total;
      this.usuarios = resp.usuarios;
      this.cargando = false;
    });

  }


  cambiarDesde( valor: number ) {

    const desde = this.desde + valor;

    if ( desde >= this.totalRegistros ) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarUsuario();

  }

  buscarUsuario( termino: string) {

    if ( termino.length <= 0 ) {
      this.cargarUsuario();
      return;
    }
    this._usuarioService.buscarUsuarios( termino )
    .subscribe((usuarios: Usuario[]) => {
      this.usuarios =  usuarios;
     // console.log(usuarios);
    });

  }
  nuevosUsuarios(termino: string) {

    this._usuarioService.buscaarUsuarios( termino )
    .subscribe((usuarios: Usuario[]) => {
      this.usuarios =  usuarios;
     // console.log(usuarios);
    });

  }

  borrarUsuario( usuario: Usuario) {
    // console.log(usuario);
    if ( usuario._id === this._usuarioService.usuario._id) {
    swal('No puede borrar usuario', 'No se puede borrar a si mismo', 'error');
    return;
    }
    swal({
      title: 'Esta Seguro?',
      text: 'Esta apunto de borrar a ' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then(borrar => {

     // console.log( borrar );
      if (borrar) {

        this._usuarioService.borrarUsuario( usuario._id )
        .subscribe(resp => {
       //   console.log( resp );
          this.cargarUsuario();
        });

      }
    });

  }

  guardarUsuario( usuario: Usuario) {
    this._usuarioService.actualizarUsuario( usuario )
    .subscribe();
  }

}
