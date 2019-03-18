import { Component, OnInit } from '@angular/core';
import { SucursalService } from '../../services/sucursal/sucursal.service';

import { Sucursals } from 'src/app/models/sucursal';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: []
})
export class SucursalComponent implements OnInit {

  sucursal: Sucursals[] = [];
  desde: number = 0;
  totalRegistro: number = 0;

  constructor(
    public _sucursalService: SucursalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarSucursal();
  }

  cargarSucursal() {

    this._sucursalService.cargarSucursal( this.desde)
    .subscribe((resp: any) => {
      this.totalRegistro = resp.total;
      // Entao o resp.xxxx => a resposta tem que ser igual ao que vem do backend ej: "sucursals": [] "  Entao seria resp.sucursals
      this.sucursal = resp.sucursals;
      const a = this.sucursal = resp.sucursals;
      console.log(a);
    });

  }

  actualizarImagen( a: string ) {

  }

  borrarSucursal(sucursal: Sucursals) {

    this._sucursalService.borrarSucursal( sucursal._id )
    .subscribe(() => this.cargarSucursal());

  }

  crearSucursal() {
  }
  buscarSucursal( termino: string ) {
    if ( termino.length <= 0 ) {
      this.cargarSucursal();
      return;
    }
    this._sucursalService.buscarSucursal( termino )
    .subscribe( sucursal => this.sucursal = sucursal);
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
    this.cargarSucursal();

  }

  }
