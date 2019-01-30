import { Component, OnInit } from '@angular/core';
import { Maquinas } from 'src/app/models/maquinas.model';
import { MaquinasService } from 'src/app/services/service.index';
import tiempo from 'tiempo';
import * as $ from 'jquery';
@Component({
  selector: 'app-maquinas',
  templateUrl: './maquinas.component.html',
  styleUrls: ['./maquinas.component.css'],
  providers: [MaquinasService]
})
export class MaquinasComponent implements OnInit {
  maquinas: Maquinas[] = [];
  interval: NodeJS.Timer;
  desde: number = 0;
  totalRegistros: number = 0;
  constructor(
    public _maquinasService: MaquinasService
    ) { }

  ngOnInit() {
    this.CalculoOff();
    this.listarMaquinas();
   // this.interval = setInterval(() => {
   //   this.listagem();
   // }, 5000);

  }

  listarMaquinas() {
    this._maquinasService.listarMaquinas( this.desde )
    .subscribe((resp: any) => {
     this.maquinas = resp.maquinas;
     this.totalRegistros = resp.total;
    });

  }

  teste( maquinaaas: Maquinas ) {
    // Hora atual
    const date = require('date-and-time');
    const now = new Date();
    const Atual = date.format(now, 'YYYY-MM-DD HH:mm:ss');
    const final = tiempo.format(maquinaaas.updatedAt, Atual);
    console.log( final );
    return Atual;

  }
  HoraAtual() {
  }
  CalculoOff() {

    $(function() {
      const date = require('date-and-time');
      const now = new Date();
      const Atual = date.format(now, 'YYYY-MM-DD HH:MM:SS');

      const texto =  $('#idDaTabela tr:nth-child(1) td:nth-child(6)').text();
      const result = (texto);
      const a = tiempo.format(Atual, result);
  });
  }


}
