import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrormensageService } from 'src/app/core/server/errormensage.service';
import Swal from 'sweetalert2'
import { FabricaService } from '../fabrica.service';


@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.css'],
})
export class DetalheComponent implements OnInit {
  inscricao: Subscription;
  dataSistema: any;
  carregando: boolean = false;
  idSprint: number;
  idSolicitacao: number;
  idFase: number;


  constructor(
    private route: ActivatedRoute,
    private service: FabricaService,
    private router: Router,
    private errorMensagem: ErrormensageService,
  ) {
  }

  ngOnInit(): void {
    // Recebendo o parametro da rota
    this.inscricao =
      this.route.params.subscribe(
        (params: any) => {
          this.idSprint = params['id'];
          this.idSolicitacao = params['idsolicitacao'];
          this.idFase = params['idfase'];



          this.service.findByFase(this.idSprint, this.idSolicitacao, this.idFase).subscribe(
            (response: any) => {

              console.log( response );

              this.dataSistema = response;
            },
            (error: any) => {
              this.errorMensagem.mostrarError('', error);
            }
          );
        }
      );
  }

  ngOnDEstroy() {
    this.inscricao.unsubscribe();
  }

  voltar() {
    window.history.back()
  }

  excluir() {
    Swal.fire({
      title: 'Você tem certeza?',
      text: "Você não será capaz de reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, Excluir!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteFase(this.idSprint, this.idSolicitacao, this.idFase).subscribe(
          () => {
            this.voltar();
          },
          (error: any) => {
            this.errorMensagem.mostrarError('', error);
            this.router.navigate(['']);
          }
        );
      }
    })

  }

}
