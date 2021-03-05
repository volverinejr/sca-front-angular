import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrormensageService } from 'src/app/core/server/errormensage.service';
import { AnaliseService } from '../analise.service';


@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.css'],
})
export class DetalheComponent implements OnInit {
  id: number;
  inscricao: Subscription;
  dataSistema: any;
  form: FormGroup;
  carregando: boolean = false;

  prioridadeOptions: any[] = [
    {label: 'Baixa', value: 3},
    {label: 'Média', value: 2},
    {label: 'Alta', value: 1},
  ];
  prioridadeSelecionada: string;



  constructor(
    private route: ActivatedRoute,
    private service: AnaliseService,
    private router: Router,
    private errorMensagem: ErrormensageService,
  ) {
  }

  ngOnInit(): void {
    // Recebendo o parametro da rota
    this.inscricao =
      this.route.params.subscribe(
        (params: any) => {
          this.id = params['id'];

          this.service.findById(this.id).subscribe(
            (response: any) => {
              this.dataSistema = response;

              console.log( this.dataSistema.prioridade );

              this.prioridadeSelecionada = this.dataSistema.prioridade;
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


  analisar() {
    this.dataSistema.prioridade = this.prioridadeSelecionada;

    this.carregando = true;
    this.service.update(this.dataSistema).subscribe(
      () => {
        this.carregando = false;
        this.router.navigate(['/analise']);
      },
      (error: any) => {
        this.carregando = false;
        this.errorMensagem.mostrarError('', error);
      }
    );

  }

}
