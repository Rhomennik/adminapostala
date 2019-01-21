import { Injectable } from '@angular/core';
import { Maquinas } from '../../models/maquinas.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',

})
export class MaquinasService {



  selectedMaquinas: Maquinas;
  maquinaas: Maquinas[];
  constructor(
    public http: HttpClient
  ) { }

  list() {
    return this.http.get( URL_SERVICIOS + '/maquinas2'  )
    .pipe(
    tap(console.log)
    );

  }


}
const url = URL_SERVICIOS + '/login';
