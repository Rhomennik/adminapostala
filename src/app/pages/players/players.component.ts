import { Component, OnInit } from '@angular/core';





import { Players } from '../../models/players';
import { PlayersService } from '../../services/players/players.service';
@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  desde: number = 0;
  totalRegistro: number = 0;
  players: Players[] = [];

  constructor(
    public _playerService: PlayersService
  ) { }

  ngOnInit() {
    this.listarPlayers();
  }
// Listando (GET) Para a pagina !!!
  listarPlayers() {
    this._playerService.listarPlayers(this.desde)
    .subscribe((resp: any) => {
        this.totalRegistro = resp.total;
        this.players = resp.player;
    });
  }
  borrarPlayer( player: Players ) {

    this._playerService.borrarPlayer(player._id)
    .subscribe(() => this.listarPlayers());
  }

  cambiarDesde( valor: number ) {

    const desde = this.desde + valor;

    if ( desde >= this.totalRegistro ) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.listarPlayers();

  }

  buscarPlayer( termino: string ) {
  //  console.log(termino);
    if ( termino.length <= 0 ) {
      this.listarPlayers();
      return;
    }
    this._playerService.buscarPlayer( termino )
    .subscribe( players => this.players = players);
  }
}