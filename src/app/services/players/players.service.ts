import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../service.index';
import { Players } from '../../models/players';
import { map } from 'rxjs/operators';
import { Departamentos } from 'src/app/models/departamentos';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  departamentos: Departamentos;
  token: string;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  // #####################
  // listar los Players
  // #####################

  listarPlayers( desde: number = 0) {
   let url = URL_SERVICIOS + '/player/desde/' + desde;
    url += '?token=' + this._usuarioService.token;
      return this.http.get(url);
  }

// ###################################
// Actualizando Radio no Departamentos
// ###################################
actualizarDepartamentos( da: Departamentos, p: Players) {

  let url = URL_SERVICIOS + '/departamentos/' + da._id + '/' + p._id;
    url += '?token=' + this._usuarioService.token;
     return this.http.put( url, da )
       .pipe(map( (resp: any) => {
          swal('Usuario actualizado', da.nombre, 'success' );
            return true;
 }));
}

// ############################
// Guardar, Actualizar PLAYER
// ############################
guardaroatualizarSucursal(players: Players) {
  // console.log(players);

  let url = URL_SERVICIOS + '/player';


  if (players._id) {
    // atualizamos se vem com Id

    url += '/' + players._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put(url, players)
    .pipe(map((resp: any) => {
      swal('Players Atualizada', players.nombre, 'success');
    }));

  } else {

// Criando novo Player
//   url += '?token=' + this._usuarioService.token;
// console.log('Criando');
    return this.http.post(url, players)
    .pipe(map((resp: any) => {
      swal('Players Creado', players.nombre, 'success');
        return resp.players;
    }));
}

  }


// #######################################################################
// Listando info, quando edita Player => "/playe/5c82786a950977325059dc45"
// #######################################################################
editarPlayer( id: String ) {
  const url = URL_SERVICIOS + '/player/' + id;
  return this.http.get(url)
  .pipe(map((resp: any)  => resp.player ));
}


// #####################
// Eliminar Player
// #####################
borrarPlayer( id: String ) {

  let url = URL_SERVICIOS +  '/player/' + id;
  url += '?token=' + this._usuarioService.token;
    return this.http.delete(url)
    .pipe(map((resp: any) => {
      swal('Player Borrado', 'Correctamente', 'success');
    }));

}


// #####################
// Buscando Player
// #####################

buscarPlayer( termino: string) {
  const url = URL_SERVICIOS + '/busqueda/coleccion/player/' + termino;
    return this.http.get(url)
      .pipe(map((resp: any) => resp.player));
}

}
