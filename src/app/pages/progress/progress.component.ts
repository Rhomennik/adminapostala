import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
  export class ProgressComponent implements OnInit {

    progreso1: number = 80;
    progreso2: number = 30;

  constructor() { }

  ngOnInit() {
  }

  // esta funcao grava no log console o aumento e tambem aumenta com o this
    atualizar( event: number ) {

     console.log('Evento: ', event);
    }
   //  this.progreso1 = event;
}
