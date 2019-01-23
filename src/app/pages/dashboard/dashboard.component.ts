import { Component, OnInit } from '@angular/core';

// importar Servico de reqqs para o backend
import { EntradaService } from '../../services/entrada';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./entrada.component.css'],
  providers: [EntradaService]
})
export class DashboardComponent implements OnInit {

  constructor(public entradaService: EntradaService) { }

  ngOnInit() {
  }
  abrirPorta() {
    this.entradaService.abrirPorta()
      .subscribe(res => {
        console.log('funcionando');
      });
    }
  }
