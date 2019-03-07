import { Component, OnInit } from '@angular/core';
import { Sucursals } from '../../models/sucursal';
import { SucursalService } from '../../services/sucursal/sucursal.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Departamentos } from '../../models/departamentos';


@Component({
  selector: 'app-sucursa',
  templateUrl: './sucursa.component.html',
  styleUrls: []
})
export class SucursaComponent implements OnInit {

  // Para listar departamentos
  departamentos: Departamentos[] = [];

  suc: Sucursals[] = [];
  // Para Crear Sucursal usa este
  sucursales: Sucursals = new Sucursals();

  // Para editar SUcursal usa este
  sucursal: Sucursals = new Sucursals();

  constructor(
    public _sucursalService: SucursalService,
    public router: Router,
    public activatedRoute: ActivatedRoute

  ) {
    activatedRoute.params.subscribe( params => {
      const id = params['id'];

      if ( id !== 'nuevo') {
        this.editarSucursal(id);
     //   console.log('Id de acivated Route No es nuevooooooo', id);
      }
    });

  }

  ngOnInit() {
    this._sucursalService.cargarSucursal()
    .subscribe( sucursal => this.sucursal = sucursal);
    this.cargarDepartamentos();
  }
  // Cargando departamentos no Select
cargarDepartamentos() {
  this._sucursalService.cargarDepartamentos()
  .subscribe((resp: any) => {
    this.departamentos = resp.departamentos;
    const a = this.departamentos = resp.departamentoses;
  //   console.log('LUZ DA VIDA', a);
  });
}

  guardarSucursal(f: NgForm) {

    console.log(f.valid);
    console.log(f.value);
    if (  f.invalid ) {
      return;
    }

    this._sucursalService.guardarSucursal( this.sucursales )
    .subscribe( sucursal => {
     // this.sucursal._id = sucursal._id;
     // this.router.navigate(['/sucursa', sucursal._id]);
    });

  }

  editarSucursal(id: string) {
    this._sucursalService.editarSucursal(id)
    .subscribe( (resp: any) => {
      this.suc = resp;
     const a = this.sucursales = resp;
    // console.log(a);
    });

  }




}
