import { Component, OnInit } from '@angular/core';
import { Sucursals } from '../../models/sucursal';
import { SucursalService } from '../../services/sucursal/sucursal.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-sucursa',
  templateUrl: './sucursa.component.html',
  styleUrls: []
})
export class SucursaComponent implements OnInit {

  suc: Sucursals[] = [];

  sucursal: Sucursals = new Sucursals();

  constructor(
    public _sucursalService: SucursalService,
    public router: Router,
    public activatedRoute: ActivatedRoute

  ) {
    activatedRoute.params.subscribe( params => {
      const id = params['id'];

      if ( id !== 'nuevo') {
        this.cargarSucursal(id);
      }
      this.editarSucursal(id);
    });

  }

  ngOnInit() {
  }


  guardarSucursal(f: NgForm) {

    console.log(f.valid);
    console.log(f.value);
    if (  f.invalid ) {
      return;
    }

    this._sucursalService.guardarSucursal( this.sucursal )
    .subscribe( sucursal => {
      this.sucursal._id = sucursal._id;
      this.router.navigate(['/sucursa', sucursal._id]);
    });

  }

  cargarSucursal( id: string) {
    this._sucursalService.editarSucursal(id)
    .subscribe( sucursal => this.sucursal = sucursal);

  }



  editarSucursal(id: string) {
    this._sucursalService.editarSucursal(id)
    .subscribe( sucursal => this.sucursal = sucursal);

  }




}
