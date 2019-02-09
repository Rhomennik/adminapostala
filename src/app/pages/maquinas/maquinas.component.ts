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
    this.listarMaquinas();
    this.interval = setInterval(() => {
      this.listarMaquinas();
    }, 5000);

  }

  listarMaquinas() {
    this._maquinasService.listarMaquinas( this.desde )
    .subscribe((resp: any) => {
     this.maquinas = resp.maquinas;
     this.totalRegistros = resp.total;
    });

  }

  buscarMaquinas( termino: string ) {
this._maquinasService.buscarMaquinas(termino)
.subscribe( (maquinas: Maquinas[]) => {
  this.maquinas = maquinas;
  console.log(maquinas);
});
  }

}
