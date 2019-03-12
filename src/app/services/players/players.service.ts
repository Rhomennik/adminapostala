import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../service.index';
import { Players } from '../../models/players';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }
  // Este es para listar LAs Sucursales
  listarPlayers( desde: number = 0) {
    let url = URL_SERVICIOS + '/player/desde/' + desde;
    url += '?token=' + this._usuarioService.token;
    return this.http.get(url);
  }



  // Ou guarda ou atualiza?

guardaroatualizarSucursal(players: Players) {
  console.log('valor]es');

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

    // criando

 //   url += '?token=' + this._usuarioService.token;
 console.log('Criando');
    return this.http.post(url, players)
    .pipe(map((resp: any) => {
      swal('Players Creado', players.nombre, 'success');
      return resp.players;
    }));
}

  }


// If for NAVIGATE TO SUCURSA PER EDIT
editarPlayer( id: String ) {
  const url = URL_SERVICIOS + '/player/' + id;
  return this.http.get(url)
  .pipe(map((resp: any)  => resp.player ));
}



// Eliminar Player

borrarPlayer( id: String ) {

  let url = URL_SERVICIOS +  '/player/' + id;
  url += '?token=' + this._usuarioService.token;
    return this.http.delete(url)
    .pipe(map((resp: any) => {
      swal('Player Borrado', 'Correctamente', 'success');
    }));

}


// Buscar Player

buscarPlayer( termino: string) {
  const url = URL_SERVICIOS + '/busqueda/coleccion/player/' + termino;
  return this.http.get(url)
  .pipe(map((resp: any) => resp.player));
}

}
