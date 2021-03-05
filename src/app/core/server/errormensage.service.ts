import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'



@Injectable({
  providedIn: 'root'
})
export class ErrormensageService {

  constructor() { }

  public mostrarError(pagina: string, error: any) {

    if (error.status == 400) {
      Swal.fire({
        icon: 'info',
        position: 'center',
        title: error.error.message,
        showConfirmButton: true,
        timer: 5000
      })
    }
    else if (error.status == 403) {
      Swal.fire({
        icon: 'error',
        position: 'center',
        title: error.error.message,
        showConfirmButton: true,
        timer: 5000
      }).then((result) => {
        window.history.back();
      });
    }
    else if (error.status == 500) {

      if (pagina == 'login') {
        Swal.fire({
          icon: 'warning',
          position: 'center',
          title: error.error.message,
          showConfirmButton: true,
          timer: 5000
        })
      }
      else {
        Swal.fire({
          icon: 'error',
          position: 'center',
          title: 'Status: 500, Error interno do servidor',
          showConfirmButton: true,
          timer: 5000
        })
      }
    } else if (error.status == 504){
      Swal.fire({
        icon: 'error',
        position: 'center',
        title: 'Status: 504, Servidor não responde',
        showConfirmButton: true,
        timer: 5000
      })
    }
  }


  public rotaNaoPermitida(){
    Swal.fire({
      icon: 'error',
      position: 'center',
      title: 'Acesso Negado',
      showConfirmButton: true,
      timer: 5000
    })
  }


  public mensagemInformativa(msg: string){
    Swal.fire({
      icon: 'info',
      position: 'center',
      title: msg,
      showConfirmButton: true,
      timer: 5000
    })
  }



}
