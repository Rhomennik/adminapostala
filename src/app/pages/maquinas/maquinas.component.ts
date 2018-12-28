import { Component, OnInit } from '@angular/core';
import { Maquinas } from 'src/app/models/maquinas.model';
import { MaquinasService } from 'src/app/services/service.index';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
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
    this.listagem();
    this.interval = setInterval(() => {
      this.listagem();
    }, 50000);

  }
  listagem() {
    this._maquinasService.list()
    .subscribe(res => {
      this._maquinasService.maquinaas = res as Maquinas[];
    });
  }
}
