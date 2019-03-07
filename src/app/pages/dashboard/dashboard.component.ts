import { Component, OnInit } from '@angular/core';

// KANBAN
import {DayPilotKanbanComponent} from 'daypilot-pro-angular';

// Importanto servico  E MODELO de usuario apra Conteo de Total usuarios
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';

import { Stream } from 'node-rtsp-stream';

// importar Servico de reqqs para o backend
import { EntradaService } from '../../services/entrada';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [EntradaService]
})
export class DashboardComponent implements OnInit {
  // Conta total de usuarios variaveis
  usuarios: Usuario[] = [];
  totalRegistros: number = 0;

  constructor(public entradaService: EntradaService,
    public _usuarioService: UsuarioService) { }

  ngOnInit() {
    this.cargarUsuario();
  }


// Abrir a porta do piso 9
  abrirPorta() {
   this.entradaService.abrirPorta()
    .subscribe(res => {
     console.log('funcionando');
      });
    }

    // Contando Usuarios
    cargarUsuario() {
      this._usuarioService.cargarUsuarios()
      .subscribe((resp: any) => {
        this.totalRegistros = resp.total;
      });

   }

}

