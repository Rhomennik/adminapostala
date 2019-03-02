import { Component, OnInit } from '@angular/core';
import { TarjetasService } from '../../services/tarjetas/tarjetas.service';
import { Tarjetas } from '../../models/tarjetas.model';

declare var swal: any;
@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.css']
})
export class TarjetasComponent implements OnInit {

  tarjetas: Tarjetas[] = [];
  desde: number = 0;
  totalRegistro: number = 0;
  interval: NodeJS.Timer;
  constructor(
    public _tarjetasService: TarjetasService
  ) { }

  ngOnInit() {
    this.listarTarjeta();
    this.interval = setInterval(() => {
      this.listarTarjeta();
    }, 30000);
  }


listarTarjeta() {

  this._tarjetasService.listarTarjetas( this.desde )
  .subscribe((resp: any) => {
  //  console.log(resp);

    this.totalRegistro = resp.total;
    this.tarjetas = resp.tarjeta;
  });
}

guardarTarjeta( tarjetaa: Tarjetas) {

  this._tarjetasService.actualizarTarjetas( tarjetaa )
  .subscribe();

}

buscarTarjetas( temrino: string) {}


borrarTarjeta( tarje: Tarjetas) {
  //    console.log(hospital);
      swal({
        title: 'Esta Seguro?',
        text: 'Esta apunto de borrar a ' + tarje.cliente,
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      })
      .then(borrar => {

    //    console.log( borrar );
        if (borrar) {

          this._tarjetasService.borrarTarjeta( tarje._id )
          .subscribe(resp => this.listarTarjeta());

        }
      });

    }


    buscarTarjeta( termino: string ) {
      if ( termino.length <= 0 ) {
        this.listarTarjeta();
        return;
      }
      this._tarjetasService.buscarTarjetas( termino )
      .subscribe( tarjetas => this.tarjetas = tarjetas);
    }
}

