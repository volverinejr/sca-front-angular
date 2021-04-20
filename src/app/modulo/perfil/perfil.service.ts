import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment as env } from 'src/environments/environment';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private pathBase: string = "/api/user/v1";

  constructor(
    protected http: HttpClient,
  ) { }

  public updateSenha(model: any) {
    return this.http.patch(`${env.API_TICKET}${this.pathBase}`, model).pipe(take(1));
  }

}
