import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrormensageService } from 'src/app/core/server/errormensage.service';
import Swal from 'sweetalert2'
import { FabricaService } from '../fabrica.service';


@Component({
  selector: 'app-listar',
  templateUrl: './solicitacao-listar.component.html',
  styleUrls: ['./solicitacao-listar.component.css']
})
export class SolicitacaoListarComponent implements OnInit {
  carregandoGrid: boolean = false;
  totalRecords: number = 0;
  dataSouce: any[];
  protected pagNumero = 0;
  protected pagQtd = 10;
  protected pagCampo = 'id';
  protected pagOrdem = 1;
  protected pagFiltro = '';
  id: number;
  spintHeader: string;
  spintContent: string;
  prioridadeOptions: any[] = [
    {label: 'Baixa', value: 3},
    {label: 'Média', value: 2},
    {label: 'Alta', value: 1},
  ];


  constructor(
    private service: FabricaService,
    private router: Router,
    private errorMensagem: ErrormensageService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    // Recebendo o parametro da rota
    this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];

        this.carregarSprint();

        this.carregarGrid();
      }
    );
  }


  lazyLoad(event: any) {
    const filtroGlobal = event.globalFilter;

    this.pagNumero = ((event.first + event.rows) / event.rows) - 1;
    this.pagQtd = event.rows;

    if (event.sortField === undefined) {
      this.pagCampo = 'Id';
    } else {
      this.pagCampo = event.sortField;
    }
    this.pagOrdem = event.sortOrder;
    this.pagFiltro = '';


    if (filtroGlobal) {
      this.pagFiltro = filtroGlobal;

      this.carregarGrid();
    } else {
      this.carregarGrid();
    }
  }

/*
  protected add(idSolicitacao: number) {
    var sprintSolicitacao = {
      "sprintId": this.id,
      "solicitacaoId": idSolicitacao
    }

    this.carregandoGrid = true;
    this.service.addSolicitacaoASprint(sprintSolicitacao).subscribe(
      () => {

        for (var data in this.dataSouce) {
          if (this.dataSouce[data].id == idSolicitacao) {
            this.dataSouce[data].cadastrado = '1';
          }
        }

        this.carregandoGrid = false;
      },
      (error: any) => {
        this.carregandoGrid = false;
        this.errorMensagem.mostrarError('', error);
      }
    );

  }

  protected remover(idSolicitacao: number) {
    this.carregandoGrid = true;
    this.service.deleteSolicitacaoDaSprint(this.id, idSolicitacao).subscribe(
      () => {

        for (var data in this.dataSouce) {
          if (this.dataSouce[data].id == idSolicitacao) {
            this.dataSouce[data].cadastrado = '0';
          }
        }

        this.carregandoGrid = false;
      },
      (error: any) => {
        this.carregandoGrid = false;
        this.errorMensagem.mostrarError('', error);
      }
    );

  }
*/

  protected carregarGrid() {
    this.carregandoGrid = true;

    this.service.FindBySolicitacaoDaSprint(this.id, this.pagNumero, this.pagQtd, this.pagCampo, this.pagOrdem).subscribe(
      (res: any) => {
        this.dataSouce = res.content;
        this.totalRecords = res.totalElements;

        this.carregandoGrid = false;
      },
      (error: any) => {
        this.carregandoGrid = false;
        this.errorMensagem.mostrarError('', error);
        this.router.navigate(['']);
      }
    );
  }


  protected carregarSprint() {
    this.service.findById(this.id).subscribe(
      (response: any) => {
        this.spintHeader = "Sprint: " + response.id;
        this.spintContent = 'Período: ' + response.dataInicioFormatada + ' à ' + response.dataFimFormatada
                            + ' | Time: ' + response.time.nome;
      },
      (error: any) => {
        this.errorMensagem.mostrarError('', error);
      }
    );
  }



  protected voltar() {
    window.history.back()
  }


  onRowSelect(event: any){
    let codigo = '#' + event.data.id;
    let solicitacao =
      event.data.sistema.nome +
      '<br><br>' + event.data.descricao;

    console.log( event.data );

    Swal.fire({
      icon: 'info',
      position: 'center',
      title: codigo,
      html: solicitacao,
      showConfirmButton: true,
      width: 800,
    })

  }


  addFases(idSolicitacao: number){
    this.router.navigate(['/fabrica/' + this.id + '/solicitacao/' + idSolicitacao + '/fase']);
  }

}
