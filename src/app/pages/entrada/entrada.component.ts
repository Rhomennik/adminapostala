import { Component, OnInit } from '@angular/core';

// importar Servico de reqqs para o backend
import { EntradaService } from '../../services/entrada';
// Para validar el crud forms
import { NgForm } from '@angular/forms';
// Importando el schema (igual que Schema mongoose)
import { Entrada } from '../../models/entrada';
// Plugins de alerta de popup
import swal from 'sweetalert';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.css'],
  providers: [ EntradaService ]
})
export class EntradaComponent implements OnInit {
  interval: NodeJS.Timer;

  // tslint:disable-next-line:no-shadowed-variable
  constructor(public entradaService: EntradaService) { }

  ngOnInit() {
    this.getEntradas();
  }
  addEntrada(form?: NgForm) {
    console.log(form.value);
    if (form.value._id) {
      this.entradaService.putEntrada(form.value)
        .subscribe(res => {
          this.resetForm(form);
          this.getEntradas();
          swal('Todo atualizado', '!', 'success');
        });
    } else {
      this.entradaService.postEntrada(form.value)
      .subscribe(res => {
        this.getEntradas();
        this.resetForm(form);
        swal('Todo atualizado', '!', 'success');
      });
    }

  }

  getEntradas() {
    this.entradaService.getEntradas()
      .subscribe(res => {
        this.entradaService.entradaas = res as Entrada[];
        console.log('funcionando');
      });
  }
  abrirPorta() {
    this.entradaService.abrirPorta()
      .subscribe(res => {
        console.log('funcionando');
      });
    }

  editEntrada(entrada: Entrada) {
    this.entradaService.selectedEntrada = entrada;
    console.log('click funcionando');
  }

  deleteEntrada(_id: string, form: NgForm) {
    if (confirm('Are you sure you want to delete it?')) {
      this.entradaService.deleteEntrada(_id)
        .subscribe(res => {
          this.getEntradas();
          this.resetForm(form);
          swal('Eliminado', '!', 'success');
        });
    }
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.entradaService.selectedEntrada = new Entrada();
    }
  }


  // final
}

