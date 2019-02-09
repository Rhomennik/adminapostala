import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Employee } from '../models/employee';
import { URL_SERVICIOS } from '../config/config';
import { map } from 'rxjs/internal/operators/map';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  selectedEmployee: Employee;
  employees: Employee[];

  readonly URL_API = 'http://172.16.0.15:3000/tarjetas';

  constructor(private http: HttpClient) {
    this.selectedEmployee = new Employee();
  }

  postEmployee(employee: Employee) {
    return this.http.post(this.URL_API, employee);
  }

  getEmployees() {
    return this.http.get(this.URL_API);
  }

  putEmployee(employee: Employee) {
    return this.http.put(this.URL_API + `/${employee._id}`, employee);
  }

  deleteEmployee(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }

  buscarTarjeta(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/tarjetas/' + termino;
    return this.http.get(url)
    .pipe(map((resp: any) => resp.tarjetas));
  }
}
