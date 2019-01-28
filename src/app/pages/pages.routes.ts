import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { MaquinasComponent } from './maquinas/maquinas.component';
// Guards
import { LoginGuardGuard } from '../services/service.index';
import { AdminGuard } from '../services/service.index';

import { ProfileComponent } from './profile/profile.component';
import { EmployeeComponent } from './employee/employee.component';
import { EntradaComponent } from './entrada/entrada.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
const pagesRoutes: Routes = [ {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' }},
            { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficas' }},
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' }},
            { path: 'maquinas', component: MaquinasComponent, data: { titulo: 'Maquinas' }},
            // Puerta
            { path: 'entrada', component: EntradaComponent, data: { titulo: 'Entradas' }},
            { path: 'tarjetas', component: EmployeeComponent, data: { titulo: 'Tarjetas' }},

            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RXJS' }},
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Color-Sistema' }},
            { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil del Usuario' }},
            { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador' }},

            {
                path: 'usuarios',
                component: UsuariosComponent,
                canActivate: [ AdminGuard ],
                data: { titulo: 'Usuarios' }},

            // Mantenimientos
            { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Hospitales' }},
            { path: 'medicos', component: MedicosComponent, data: { titulo: 'Medicos' }},
            { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Actualizar Medico' }},
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    }
];
export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
