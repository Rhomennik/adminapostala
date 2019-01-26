import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import {
  SettingsService,
  SidebarService,
  SharedService,
  UsuarioService,
  LoginGuardGuard,
  SubirArchivoService


} from './service.index';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import { MedicoService } from './medico/medico.service';
import { EmployeeService } from './employee';
import { MaquinasService } from './maquinas/maquinas.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
  SettingsService,
  SidebarService,
  SharedService,
  UsuarioService,
  LoginGuardGuard,
  SubirArchivoService,
  ModalUploadService,
  MedicoService,
  EmployeeService,
  MaquinasService
  ],
  declarations: []
})
export class ServiceModule { }
