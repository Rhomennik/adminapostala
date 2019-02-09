import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/medico/medico.service';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor( public _medicosService: MedicoService,
    public _hospitalService: HospitalService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
    ) {
      activatedRoute.params.subscribe( params => {
        const id = params['id'];

        if ( id !== 'nuevo') {
          this.cargarMedico(id);
        }
        console.log(id);
      });

     }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion
    .subscribe( resp => {

      this.medico.img = resp.medico.img;

    });
  }
  guardarMedico(f: NgForm) {

    console.log(f.valid);
    console.log(f.value);

    if (  f.invalid ) {
    return;
    }

    this._medicosService.guardarMedico( this.medico )
    .subscribe( medico => {
      this.medico._id = medico._id;
      this.router.navigate(['/medico', medico._id]);
      console.log('deubom');
    });

  }

  cargarHospitales() {
    this._hospitalService.cargarHospitales()
    .subscribe((resp: any) => {
      this.hospitales = resp.hospitales;
  });

}

cambioHospital(id: string) {
  this._hospitalService.obtenerHospital( id )
  // resumiento o codigo ant
  .subscribe(hospital => this.hospital = hospital);


  // codigo ant  ########

  //   .subscribe( hospital => {
  //     console.log(hospital);
        // o novo hospital NEW HOSPITAL('') Vai ser hospital que ta dps do subscribe
  //     this.hospital = hospital;
  //   });
}
cargarMedico( id: string ) {
 this._medicosService.cargarMedico(id)
     .subscribe(medico => {
       this.medico = medico;
       this.medico.hospital = medico.hospital._id;
       this.cambioHospital( this.medico.hospital );
      });
}

cambiarFoto() {
this._modalUploadService.mostrarModal( 'medicos', this.medico._id);
}
}
