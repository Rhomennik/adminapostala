import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {


  @ViewChild('txtProgress') txtProgress: ElementRef;
  @Input('nombre') leyenda: string =   'Leyenda';
  @Input() progreso: number = 50;



  // DEclarando um evento sobre uma variavel Cambio de Valor
  @Output('legal') cambioValor: EventEmitter<number> = new EventEmitter ();

  constructor() {
  // console.log('leyenda', this.leyenda);
   // console.log('progreso', this.progreso);
  }

  ngOnInit() {
   // console.log('leyenda', this.leyenda);
    // console.log('progreso', this.progreso);
  }
  onChanges( newValue: number ) {
    // tslint:disable-next-line:prefer-const
    // let elemHTML: any = document.getElementsByName('progreso')[0];
    //  console.log ( this.txtProgress );


    if ( newValue  >= 100) {
      this.progreso = 100;
    } else if ( newValue <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }

    // elemHTML.value = this.progreso;
    // seila
    this.cambioValor.emit( this.progreso );

  }


  cambiarValor ( valor ) {
    if ( this.progreso >= 100 && valor > 0) {
      this.progreso = 100;
      return;
    }
    if ( this.progreso <= 0 && valor > 0) {
      this.progreso = 0;
      return;
    }
    this.progreso = this.progreso + valor;
    // Variavel cambio de valor com Emit
    this.cambioValor.emit( this.progreso );
    // mantener el foco quando haces click en algun boton de las cajitas
    this.txtProgress.nativeElement.focus();
  }

}
