import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { SucursalService } from '../../services/sucursal/sucursal.service';
import { Players } from 'src/app/models/players';
import { PlayersService } from '../../services/players/players.service';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-playe',
  templateUrl: './playe.component.html',
  styleUrls: ['./playe.component.css']
})
export class PlayeComponent implements OnInit {

   // Para Crear Sucursal usa este
   pc: Players = new Players();
   player: Players = new Players();
   // Para atualizar
   // e tmb editar quando clica no botao de editar ele vai e lista as info co m o id dps atualiza se guardar
   pa:  Players = new Players();

  constructor(public _sucursalService: SucursalService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _playersService: PlayersService) {

    activatedRoute.params.subscribe( params => {
      const id = params['id'];

      if ( id !== 'nuevo') {
        this.editarPlayer(id);
        console.log('Id de acivated Route No es nuevooooooo', id);
      }
    });
  }

  ngOnInit() {
  }


  guardarSucursal(f: NgForm) {

    console.log(f.valid);
    console.log('valores', f.value);
    if (  f.invalid ) {
     // console.log('invalido');
      return;
    }
// !!! IMPROTANTES   este THIS.PA tem que ser Players = new Players(); se naop nao manda kj
    this._playersService.guardaroatualizarSucursal( this.pa )
    .subscribe( player => {
   //  this.pc._id = this.pc._id;
     this.router.navigate(['/players']);
    });

  }
// Isso so ta listando a info quando aperta no editar
  editarPlayer(id: string) {
    this._playersService.editarPlayer(id)
    .subscribe( (resp: any) => {
      this.pa = resp;
     const a = this.pc = resp;
    });

}


}
