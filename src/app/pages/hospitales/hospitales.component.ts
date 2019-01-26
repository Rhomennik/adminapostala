import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { Hospital } from 'src/app/models/hospital.model';

declare var swal: any;
@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {
  hospitales: Hospital[] = [];
  desde: number = 0;
  totalRegistros: number = 0;

  constructor( public _hospitalService: HospitalService,
               public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarHospital();

    this._modalUploadService.notificacion
    .subscribe(( ) => this.cargarHospital());
  }

  cargarHospital() {
    this._hospitalService.cargarHospitales( this.desde )
    .subscribe((resp: any) => {
   //   console.log('Teste', resp);
      this.totalRegistros = resp.total;
      this.hospitales = resp.hospitales;
    });
  }

  cambiarDesde( valor: number ) {

    const desde = this.desde + valor;

    if ( desde >= this.totalRegistros ) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarHospital();

  }

  borrarHospital( hospital: Hospital) {
//    console.log(hospital);
    swal({
      title: 'Esta Seguro?',
      text: 'Esta apunto de borrar a ' + hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then(borrar => {

  //    console.log( borrar );
      if (borrar) {

        this._hospitalService.borrarHospital( hospital._id )
        .subscribe(resp => this.cargarHospital());

      }
    });

  }

  buscarHospital( termino: string) {
    if ( termino.length <= 0 ) {
      this.cargarHospital();
    }
    this._hospitalService.buscarHospital( termino )
    .subscribe((hospitalees: Hospital[]) => {
      this.hospitales =  hospitalees;
  //    console.log(hospitalees);
    });
}

guardarHospital( hospital: Hospital) {

  this._hospitalService.actualizarHospital( hospital )
          .subscribe();

}

crearHospital() {
  swal({
    title: ' Crear hospital',
    text: 'Ingrese el nombre del hospital',
    content: 'input',
    icon: 'info',
    buttons: true,
    dangerMode: true
  }).then( valor => {
    if ( !valor || valor.length === 0 ) {
      return;
    }
    this._hospitalService.crearHospital(valor)
    .subscribe( () => this.cargarHospital() );
  });
}

actualizarImagen( hospital: Hospital ) {

  this._modalUploadService.mostrarModal( 'hospitales', hospital._id );

}

}
