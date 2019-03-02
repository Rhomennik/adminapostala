import { RouterModule, Routes, CanActivate } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
// Guards
import { LoginGuardGuard } from '../services/service.index';
import { AdminGuard } from '../services/service.index';
import { NormalGuard } from '../services/guards/normal.guard';

// maquinas
import { MaquinasComponent } from './maquinas/maquinas.component';
import { SucursalComponent } from './sucursal/sucursal.component';
import { SucursaComponent } from './sucursal/sucursa.component';

import { ProfileComponent } from './profile/profile.component';
import { EmployeeComponent } from './employee/employee.component';
import { EntradaComponent } from './entrada/entrada.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';
import { TarjetasComponent } from './tarjetas/tarjetas.component';
const pagesRoutes: Routes = [
            {
                path: 'dashboard',
                component: DashboardComponent,
                data: { titulo: 'Dashboard' },
                canActivate: [  NormalGuard, VerificaTokenGuard ] },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' }},
            { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficas' }},
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' }},
            // Maquinas
            { path: 'sucursa/:id', component: SucursaComponent, canActivate: [ AdminGuard ], data: { titulo: 'Atualizar Sucursal' }},
            { path: 'maquinas', component: MaquinasComponent, canActivate: [ AdminGuard ], data: { titulo: 'Maquinas' }},
            // Puerta
            { path: 'entrada', component: EntradaComponent,  canActivate: [ AdminGuard ], data: { titulo: 'Entradas' }},
            // { path: 'tarjetas', component: EmployeeComponent, data: { titulo: 'Tarjetas', canActivate: [ AdminGuard ] }},
            { path: 'tarjetas', component: TarjetasComponent, canActivate: [ AdminGuard ], data: { titulo: 'Tarjetas' }},

            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RXJS' }},
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Color-Sistema'}, canActivate: [ AdminGuard ]},
            { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil del Usuario' }, canActivate: [ NormalGuard ]},
            { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador' }, canActivate: [ AdminGuard ]},

            {
                path: 'usuarios',
                component: UsuariosComponent,
                canActivate: [ AdminGuard ],
                data: { titulo: 'Usuarios' }},

                // Mantenimientos
                    {
                        path: 'sucursal',
                        component: SucursalComponent,
                        canActivate: [ AdminGuard ],
                        data: { titulo: 'Sucursal', }
                    },
            { path: 'hospitales', component: HospitalesComponent,  canActivate: [ AdminGuard ], data: { titulo: 'Hospitales' }},
           { path: 'medicos', component: MedicosComponent, data: { titulo: 'Medicos' }, canActivate: [ AdminGuard ]},
            { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Actualizar Medico' }, canActivate: [ AdminGuard ]},
            { path: '', redirectTo: '/dashboard', pathMatch: 'full', canActivate: [ AdminGuard ] }
];
export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
