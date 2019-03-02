import { Component, OnInit } from '@angular/core';

// importar Servico de reqqs para o backend
import { EntradaService } from '../../services/entrada';
// Para validar el crud forms
import { NgForm } from '@angular/forms';
// Importando el schema (igual que Schema mongoose)
import { Entrada } from '../../models/entrada';
// Plugins de alerta de popup
import swal from 'sweetalert';
import { TarjetasService } from 'src/app/services/tarjetas/tarjetas.service';
import { Tarjetas } from 'src/app/models/tarjetas.model';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.css'],
  providers: [ EntradaService ]
})
export class EntradaComponent implements OnInit {
  interval: NodeJS.Timer;
  tarjetas: Tarjetas[] = [];
  desde: number = 0;
  totalRegistro: number = 0;

  // tslint:disable-next-line:no-shadowed-variable
  constructor(public _tarjetasService: TarjetasService) { }

  ngOnInit() {
    this.listarEntradas();
    this.interval = setInterval(() => {
      this.listarEntradas();
    }, 5000);
  }


  listarEntradas() {
    this._tarjetasService.listarTarjetas( this.desde )
  .subscribe((resp: any) => {
 //   console.log(resp);

    this.totalRegistro = resp.total;
    this.tarjetas = resp.tarjeta;
  });
  }
}

