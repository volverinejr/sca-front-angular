import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  //const usuarioData = JSON.parse(atob(response.token.split('.')[1]));

  constructor() { }

  loginUsuario(token: string) {
    const usuarioData = JSON.parse(atob(token.split('.')[1]));

    localStorage['username'] = usuarioData.sub;
    localStorage['token'] = token;
  }

  logout(){
    localStorage.removeItem('username');
    localStorage.removeItem('token');
  }

  getToken() {
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    }
    else {
      return '';
    }
  }

  getUsuarioLogado() {
    if (localStorage.getItem("username")) {
      return localStorage.getItem("username");
    }
    else {
      return '';
    }
  }

  isTokenExpirado(): boolean {
    if (localStorage.getItem("token")) {
      const expiry = (JSON.parse(atob(localStorage.getItem("token").split('.')[1]))).exp;
      return (Math.floor((new Date).getTime() / 1000)) >= expiry;
    }
    else {
      return true;
    }
  }

  getPerfil() {
    if (localStorage.getItem("token")) {
      return (JSON.parse(atob(localStorage.getItem("token").split('.')[1]))).roles;
    }
    return [];
  }


  getUsuarioAutenticado(){
    return ( localStorage.getItem("username") ? true : false );
  }

}
