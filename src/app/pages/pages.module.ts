import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
// ng2-charts

import { ChartsModule } from 'ng2-charts';

// Pipe module
import { PipesModule } from '../pipes/pipes.module';

// TEmporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { MaquinasComponent } from './maquinas/maquinas.component';
import { ProfileComponent } from './profile/profile.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
// Puerta
import { EmployeeComponent } from './employee/employee.component';
import { EntradaComponent } from './entrada/entrada.component';
import { TarjetasComponent } from './tarjetas/tarjetas.component';
// Mantenimientos
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { SucursalComponent } from './sucursal/sucursal.component';
import { SucursaComponent } from './sucursal/sucursa.component';


// Kanban
import {DayPilotModule} from 'daypilot-pro-angular';
import { PlayersComponent } from './players/players.component';
import { PlayeComponent } from './players/playe.component';






@NgModule({
    declarations: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
   // PagesComponent,
    IncrementadorComponent,
    GraficoDonaComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    MaquinasComponent,
    ProfileComponent,
    EmployeeComponent,
    EntradaComponent,
    UsuariosComponent,
   // ModalUploadComponent,
    HospitalesComponent,
    MedicosComponent,
    MedicoComponent,
    BusquedaComponent,
    SucursalComponent,
    SucursaComponent,
    TarjetasComponent,
    PlayersComponent,
    PlayeComponent
    ],
    // exportando para poder usar em outros lugares
    exports: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        PipesModule,
        CommonModule
    ]

})
export class PagesModule { }
