import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment as env } from 'src/environments/environment';
import { debounceTime, distinctUntilChanged, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private pathBase: string = "/api/user/v1";

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
        if (isNaN(filtro)) {
          filtro = '1';
        }

        aplicandoFiltro = '/findByIdGreaterThanEqual/' + filtro
      }
      else if (campo == 'userName') {
        aplicandoFiltro = '/findByNome/' + filtro
      }
      else if (campo == 'fullName') {
        aplicandoFiltro = '/findByNomeCompleto/' + filtro
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

  public delete(id: number) {
    return this.http.delete(`${env.API_TICKET}${this.pathBase}/${id}`).pipe(take(1));
  }

  // USER X SISTEMAS
  public FindBySistemasDoUser(id, pagina, qtd, campo, ordem) {
    if (ordem == "-1") {
      campo = '-' + campo;
    }

    let httpParams = new HttpParams();
    httpParams = httpParams.set('page', pagina);
    httpParams = httpParams.set('size', qtd);
    httpParams = httpParams.set('sort', campo);


    return this.http.get<any>(`${env.API_TICKET}${this.pathBase}/${id}/sistemas`, {
      params: httpParams
    })
      .pipe(
        take(1),
      );
  }


  public addSistemaAoUser(model: any) {
    return this.http.post(`${env.API_TICKET}${this.pathBase}/sistemas`, model).pipe(take(1));
  }

  public deleteSistemaDoUser(userId: number, clienteSistemaId: number) {
    return this.http.delete(`${env.API_TICKET}${this.pathBase}/${userId}/sistema/${clienteSistemaId}`).pipe(take(1));
  }

  // USER X PERMISSÃO
  public findByPermissaoDoUser(id, pagina, qtd, campo, ordem) {
    if (ordem == "-1") {
      campo = '-' + campo;
    }

    let httpParams = new HttpParams();
    httpParams = httpParams.set('page', pagina);
    httpParams = httpParams.set('size', qtd);
    httpParams = httpParams.set('sort', campo);


    return this.http.get<any>(`${env.API_TICKET}${this.pathBase}/${id}/permissao`, {
      params: httpParams
    })
      .pipe(
        take(1),
      );
  }


  public addPermissaoAoUser(model: any) {
    return this.http.post(`${env.API_TICKET}${this.pathBase}/permissao`, model).pipe(take(1));
  }

  public deletePermissaoDoUser(userId: number, permissaoId: number) {
    return this.http.delete(`${env.API_TICKET}${this.pathBase}/${userId}/permissao/${permissaoId}`).pipe(take(1));
  }

  // USER X TIME
  public findByTimeDoUser(id, pagina, qtd, campo, ordem) {
    if (ordem == "-1") {
      campo = '-' + campo;
    }

    let httpParams = new HttpParams();
    httpParams = httpParams.set('page', pagina);
    httpParams = httpParams.set('size', qtd);
    httpParams = httpParams.set('sort', campo);


    return this.http.get<any>(`${env.API_TICKET}${this.pathBase}/${id}/time`, {
      params: httpParams
    })
      .pipe(
        take(1),
      );
  }


  public addTimeAoUser(model: any) {
    return this.http.post(`${env.API_TICKET}${this.pathBase}/time`, model).pipe(take(1));
  }

  public deleteTimeDoUser(userId: number, timeId: number) {
    return this.http.delete(`${env.API_TICKET}${this.pathBase}/${userId}/time/${timeId}`).pipe(take(1));
  }


}
