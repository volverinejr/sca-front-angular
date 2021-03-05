import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment as env } from 'src/environments/environment';
import { debounceTime, distinctUntilChanged, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService {
  private pathBase: string = "/api/solicitacao/v1";

  constructor(
    protected http: HttpClient,
  ) { }

  public novo(model: any) {
    return this.http.post(`${env.API_TICKET}${this.pathBase}`, model).pipe(take(1));
  }

  public update(model: any) {
    return this.http.put(`${env.API_TICKET}${this.pathBase}`, model).pipe(take(1));
  }


  public findAll(pagina, qtd, campo, ordem, filtro) {
    let aplicandoFiltro = '';

    if (filtro != '') {
      if (campo == 'id') {
        if ( isNaN(filtro) ) {
          filtro = '1';
        }

        aplicandoFiltro = '/findByIdGreaterThanEqual/' + filtro
      }
      else if (campo == 'nome') {
        aplicandoFiltro = '/findByNome/' + filtro
      }
      else if (campo == 'descricao') {
        aplicandoFiltro = '/findByDescricao/' + filtro
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



  public FindByClientesDoUsuario(pagina, qtd, campo, ordem) {
    if (ordem == "-1") {
      campo = '-' + campo;
    }

    let httpParams = new HttpParams();
    httpParams = httpParams.set('page', pagina);
    httpParams = httpParams.set('size', qtd);
    httpParams = httpParams.set('sort', campo);


    return this.http.get<any>(`${env.API_TICKET}${this.pathBase}/clientes`, {
      params: httpParams
    })
      .pipe(
        take(1),
      );
  }

  public FindBySistemasDoClientes(idCliente, pagina, qtd, campo, ordem) {
    if (ordem == "-1") {
      campo = '-' + campo;
    }

    let httpParams = new HttpParams();
    httpParams = httpParams.set('page', pagina);
    httpParams = httpParams.set('size', qtd);
    httpParams = httpParams.set('sort', campo);


    return this.http.get<any>(`${env.API_TICKET}${this.pathBase}/cliente/${idCliente}/sistemas`, {
      params: httpParams
    })
      .pipe(
        take(1),
      );
  }


}
