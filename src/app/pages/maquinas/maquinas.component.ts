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
  maquinaas: Maquinas[];
  Object = Object;
  interval: NodeJS.Timer;
  constructor(
    public _maquinasService: MaquinasService
    ) { }

  ngOnInit() {
    this.CalculoOff();
    this.listagem();
   // this.interval = setInterval(() => {
   //   this.listagem();
   // }, 5000);

  }
  listagem() {
    this._maquinasService.list()
    .subscribe(res => {
      this._maquinasService.maquinaas = res as Maquinas[];
    });
  }
  HoraAtual() {
    // Hora atual
    const date = require('date-and-time');
    const now = new Date();
    const Atual = date.format(now, 'Hmm');
    return Atual;
  }
  CalculoOff() {

    $(function() {
      const date = require('date-and-time');
      const now = new Date();
      const Atual = date.format(now, 'YYYY-MM-DD HH:MM:SS');

      const texto =  $('#idDaTabela tr:nth-child(1) td:nth-child(6)').text();
      const result = (texto);
      const a = tiempo.format(Atual, result);
      console.log([0], a);
  });
  }


}
