import { Component, OnInit } from '@angular/core';

// Http Cliente servicio para fazer GET POST PUT PUSH
import { HttpClient } from '@angular/common/http';

// Services
import { SucursalService } from 'src/app/services/sucursal/sucursal.service';
import { PlayersService } from 'src/app/services/players/players.service';

// Modelos
import { Departamentos } from 'src/app/models/departamentos';
import { Players } from 'src/app/models/players';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styles: ['./radio.component.css']
})
export class RadioComponent implements OnInit {
  ak: Players = new Players();
  play: Players[] = [];
  dep: Departamentos[] = [];
  desde: number = 0;
  totalRegistro: Number = 0;

  cargando: false;

  depi: Departamentos = new Departamentos();

  constructor(
    public http: HttpClient,
    public _sucursalService: SucursalService,
    public _playerService: PlayersService
  ) { }

  ngOnInit() {
    this.listarSucursal();
    this.listarPlayer();
  }

listarSucursal() {
  this._sucursalService.cargarDepartamentos(this.desde)
  .subscribe((resp: any) => {
    this.dep = resp.departamentoses;
    this.totalRegistro = resp.total;
 //   const a = this.dep = resp.departamentoses;
 //   console.log('este es dep', a);
  });
}

listarPlayer() {

this._playerService.listarPlayers()
.subscribe((resp: any) => {
  this.play = resp.player;
  const a = this.play = resp.player;
 // console.log(a);
});
}

guardarDepartamento(da: Departamentos) {

  console.log(da);
  this._playerService.actualizarDepartamentos( da )
  .subscribe();


}




}
