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
import { delay } from 'q';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styles: ['./radio.component.css']
})
export class RadioComponent implements OnInit {

  // Models
  play: Players[] = [];
  dep: Departamentos[] = [];

  // Funcoes
  desde: number = 0;
  totalRegistro: Number = 0;
  cargando: boolean = false;

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


// #####################
// Listando Sucursales
// #####################
listarSucursal() {
  this._sucursalService.cargarDepartamentos(this.desde)
  .subscribe((resp: any) => {
    console.log('listar');
    this.dep = resp.departamentoses;
    this.totalRegistro = resp.total;
  });
}



// #####################
// Listando Players
// #####################

listarPlayer() {
this._playerService.listarPlayers()
.subscribe((resp: any) => {
  this.play = resp.player;
  const a = this.play = resp.player;
  });
}

// ##########################
// Guardando Radio escolhida,
// ##########################
  async guardarDepartamento(da: Departamentos, p: Players) {


  // ***Comentario Explicativo***
  // console.log('Departamento Seleccionado:', da.nombre, 'Player Seleccionado', p.nombre);
  this._playerService.actualizarDepartamentos( da, p )
  .subscribe();

  // ***Comentario Explicativo***
    // Aqui logo de trocar a radio atualizamos a interface, para ve ra radio atual
    await delay(100);
  this.listarSucursal();
  }
}
