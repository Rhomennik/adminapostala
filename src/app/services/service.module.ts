import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import {
  SettingsService,
  SidebarService,
  SharedService,
  UsuarioService,
  LoginGuardGuard,
  SubirArchivoService,
  VerificaTokenGuard


} from './service.index';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import { MedicoService } from './medico/medico.service';
import { EmployeeService } from './employee';
import { MaquinasService } from './maquinas/maquinas.service';
import { AdminGuard } from './guards/admin.guard';
import { NormalGuard } from './guards/normal.guard';


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
  AdminGuard,
  NormalGuard,
  SubirArchivoService,
  ModalUploadService,
  MedicoService,
  EmployeeService,
  MaquinasService,
  VerificaTokenGuard
  ],
  declarations: []
})
export class ServiceModule { }
