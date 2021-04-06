import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrormensageService } from 'src/app/core/server/errormensage.service';
import Swal from 'sweetalert2'
import { SolicitacaoService } from '../solicitacao.service';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.css'],
})
export class DetalheComponent implements OnInit {
  id: number;
  inscricao: Subscription;
  dataSistema: any;
  dataMovimentacao: any;
  carregando: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private service: SolicitacaoService,
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

              this.carregarMovimentacao();
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


  carregarMovimentacao() {
    this.service.FindByMovimentacao(this.id).subscribe(
      (response: any) => {
        this.dataMovimentacao = response;
      },
      (error: any) => {
        this.errorMensagem.mostrarError('', error);
      }
    );

  }


  public openPDF_1(): void {
    let DATA = document.getElementById('htmlData');

    html2canvas(DATA).then(canvas => {

      let fileWidth = 208;
      let fileHeight = canvas.height * fileWidth / canvas.width;

      const FILEURI = canvas.toDataURL('image/png')
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)

      PDF.save('solicitacao-' + this.id + '.pdf');
    });
  }

  public openPDF_2(): void {
    let documento = new jsPDF();

    documento.setFont("Courier");
    documento.setFontSize(20);
    documento.text("Solicitação: #" + this.id, 65, 15);

    documento.setFontSize(12);
    documento.text("Descrição", 12, 25);
    documento.text("Cliente", 12, 33);
    documento.text("Sistema", 12, 41);
    documento.text("Usuário", 12, 49);
    documento.text("Cadastro", 12, 57);
    documento.text("Status Atual", 12, 65);

    documento.text(this.dataSistema.descricao, 45, 25);
    documento.text(this.dataSistema.cliente.nome, 45, 33);
    documento.text(this.dataSistema.sistema.nome, 45, 41);
    documento.text(this.dataSistema.userName, 45, 49);
    documento.text(this.dataSistema.dataCadastroFormatada, 45, 57);
    documento.text(this.dataSistema.statusAtual, 45, 65);

    documento.output("dataurlnewwindow");
  }

}
