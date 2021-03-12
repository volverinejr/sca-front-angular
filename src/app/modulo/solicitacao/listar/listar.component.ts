import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrormensageService } from 'src/app/core/server/errormensage.service';
import { LocalStorageService } from 'src/app/core/server/local-storage.service';
import { SolicitacaoService } from '../solicitacao.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  carregandoGrid: boolean = false;
  totalRecords: number = 0;
  dataSouce: any[];
  protected pagNumero = 0;
  protected pagQtd = 10;
  protected pagCampo = 'id';
  protected pagOrdem = 1;
  protected pagFiltro = '';
  private usuarioLogado: String;



  constructor(
    private service: SolicitacaoService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private errorMensagem: ErrormensageService,
  ) { }

  ngOnInit(): void {
    this.usuarioLogado = this.localStorageService.getUsuarioLogado(); //'Patrícia Franco';

    this.carregarGrid();
  }




  lazyLoad(event: any){
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

  novo(){
    this.router.navigate(['/solicitacao/novo']);
  }

  editar(id: number){
    this.router.navigate(['/solicitacao/editar/' + id]);
  }

  detalhe(id: number){
    this.router.navigate(['/solicitacao/detalhe/' + id]);
  }


  protected carregarGrid() {
    this.carregandoGrid = true;

    this.service.findAll(this.pagNumero, this.pagQtd, this.pagCampo, this.pagOrdem, this.pagFiltro).subscribe(
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


}
