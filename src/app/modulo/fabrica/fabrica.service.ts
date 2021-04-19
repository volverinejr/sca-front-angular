import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment as env } from 'src/environments/environment';
import { debounceTime, distinctUntilChanged, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FabricaService {
  private pathBase: string = "/api/fabrica/v1";

  constructor(
    protected http: HttpClient,
  ) { }

  public novaFase(idSprint:number, idSolicitacao:number, model: any) {
    return this.http.post(`${env.API_TICKET}${this.pathBase}/sprint/${idSprint}/solicitacao/${idSolicitacao}`, model).pipe(take(1));
  }

  public updateFase(idSprint:number, idSolicitacao:number, model: any) {
    return this.http.put(`${env.API_TICKET}${this.pathBase}/sprint/${idSprint}/solicitacao/${idSolicitacao}`, model).pipe(take(1));
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



  public deleteFase(idSprint:number, idSolicitacao:number, idFase:number) {
    return this.http.delete(`${env.API_TICKET}${this.pathBase}/sprint/${idSprint}/solicitacao/${idSolicitacao}/fase/${idFase}`).pipe(take(1));
  }

  public FindBySolicitacaoDaSprint(id, pagina, qtd, campo, ordem) {
    if (ordem == "-1") {
      campo = '-' + campo;
    }

    let httpParams = new HttpParams();
    httpParams = httpParams.set('page', pagina);
    httpParams = httpParams.set('size', qtd);
    httpParams = httpParams.set('sort', campo);


    return this.http.get<any>(`${env.API_TICKET}${this.pathBase}/${id}/solicitacao`, {
      params: httpParams
    })
      .pipe(
        take(1),
      );
  }


  public FindBySprintSolicitacaoFase(idSprint, idSolicitacao, pagina, qtd, campo, ordem) {
    if (ordem == "-1") {
      campo = '-' + campo;
    }

    let httpParams = new HttpParams();
    httpParams = httpParams.set('page', pagina);
    httpParams = httpParams.set('size', qtd);
    httpParams = httpParams.set('sort', campo);


    return this.http.get<any>(`${env.API_TICKET}${this.pathBase}/${idSprint}/solicitacao/${idSolicitacao}`, {
      params: httpParams
    })
      .pipe(
        take(1),
      );
  }


  findBySolicitacaoDaSprint(idSprint: number, idSolicitacao: number) {
    return this.http.get<any>(`${env.API_TICKET}${this.pathBase}/sprint/${idSprint}/solicitacao/${idSolicitacao}`).pipe(take(1));
  }

  public FindByFasesDaSolicitacao(id, idSolicitacao, pagina, qtd, campo, ordem) {
    if (ordem == "-1") {
      campo = '-' + campo;
    }

    let httpParams = new HttpParams();
    httpParams = httpParams.set('page', pagina);
    httpParams = httpParams.set('size', qtd);
    httpParams = httpParams.set('sort', campo);


    return this.http.get<any>(`${env.API_TICKET}${this.pathBase}/${id}/solicitacao/${idSolicitacao}`, {
      params: httpParams
    })
      .pipe(
        take(1),
      );
  }

  findByFase(idSprint: number, idSolicitacao: number, idFase: number) {
    return this.http.get<any>(`${env.API_TICKET}${this.pathBase}/sprint/${idSprint}/solicitacao/${idSolicitacao}/fase/${idFase}`).pipe(take(1));
  }


  findByResponsavel(idSprint: number, idSolicitacao: number) {
    return this.http.get<any>(`${env.API_TICKET}${this.pathBase}/sprint/${idSprint}/solicitacao/${idSolicitacao}/responsavel`).pipe(take(1));
  }

}
