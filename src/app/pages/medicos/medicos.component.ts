import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/medico/medico.service';
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicoss: Medico[] = [];

  constructor(public _medicosService: MedicoService) { }

  ngOnInit() {
    this.cargarMedico();
  }

  cargarMedico() {
    this._medicosService.cargarMedicos()
    .subscribe( medicos => this.medicoss = medicos);
  }

  editMedico( medico ) {

  }

  borrarMedico( medico ) {

  }

  buscarMedico( termino: string) {
      if ( termino.length <= 0 ) {
        this.cargarMedico();
        return;
      }


    this._medicosService.buscarMedicos( termino )
    .subscribe(medicos => this.medicoss = medicos);

  }

  crearMedico() {

  }


}
