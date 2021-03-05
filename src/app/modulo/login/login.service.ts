import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { environment as env } from 'src/environments/environment';
import { take } from 'rxjs/operators';
import * as EventEmitter from 'events';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    protected http: HttpClient
  ) {
  }

  public login(model: any) {
    return this.http.post(`${env.API_TICKET}/auth/signin`, model).pipe(take(1));
  }

}
