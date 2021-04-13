import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment as env } from 'src/environments/environment';
import { debounceTime, distinctUntilChanged, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PesquisaService {
  private pathBase: string = "/api/pesquisa/v1";

  constructor(
    protected http: HttpClient,
  ) { }

  public findAll(pagina, qtd, campo, ordem, filtro) {
    let aplicandoFiltro = '';

    if (filtro != '') {
      if (campo == 'id') {
        if (isNaN(filtro)) {
          filtro = '1';
        }

        aplicandoFiltro = '/findByIdGreaterThanEqual/' + filtro
      }
      else if (campo == 'className') {
        aplicandoFiltro = '/findByClassName/' + filtro
      }
      else if (campo == 'methodName') {
        aplicandoFiltro = '/findByMethodName/' + filtro
      }
      else if (campo == 'argumento') {
        aplicandoFiltro = '/findByArgumento/' + filtro
      }
      else if (campo == 'retorno') {
        aplicandoFiltro = '/findByRetorno/' + filtro
      }
      else if (campo == 'createdBy') {
        aplicandoFiltro = '/findByCreatedBy/' + filtro
      }
    }

    if (ordem == "-1") {
      campo = '-' + campo;
    }

    let httpParams = new HttpParams();
    httpParams = httpParams.set('page', pagina);
    httpParams = httpParams.set('size', qtd);
    httpParams = httpParams.set('sort', campo);


    return this.http.get<any>(`${env.API_TICKET}${this.pathBase}${aplicandoFiltro}`, {
      params: httpParams
    })
      .pipe(
        take(1),
        debounceTime(2000),
        distinctUntilChanged(),
      );
  }

  findById(id: number) {
    return this.http.get<any>(`${env.API_TICKET}${this.pathBase}/${id}`).pipe(take(1));
  }

}
