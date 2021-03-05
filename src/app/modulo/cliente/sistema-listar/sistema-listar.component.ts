import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrormensageService } from 'src/app/core/server/errormensage.service';
import { ClienteService } from '../cliente.service';


@Component({
  selector: 'app-listar',
  templateUrl: './sistema-listar.component.html',
  styleUrls: ['./sistema-listar.component.css']
})
export class SistemaListarComponent implements OnInit {
  carregandoGrid: boolean = false;
  totalRecords: number = 0;
  dataSouce: any[];
  protected pagNumero = 0;
  protected pagQtd = 10;
  protected pagCampo = 'id';
  protected pagOrdem = 1;
  protected pagFiltro = '';
  id: number;
  nomeCliente: string;




  constructor(
    private service: ClienteService,
    private router: Router,
    private errorMensagem: ErrormensageService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    // Recebendo o parametro da rota
    this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];

        this.carregarCliente();

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

  protected add(idSistema: number) {
    var clienteSistema = {
      "clienteId": this.id,
      "sistemaId": idSistema
    }

    this.carregandoGrid = true;
    this.service.addSistemaAoCliente(clienteSistema).subscribe(
      () => {

        for (var data in this.dataSouce) {
          if (this.dataSouce[data].id == idSistema) {
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

  protected remover(idSistema: number) {
    this.carregandoGrid = true;
    this.service.deleteSistemaDoCliente(this.id, idSistema).subscribe(
      () => {

        for (var data in this.dataSouce) {
          if (this.dataSouce[data].id == idSistema) {
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


  protected carregarGrid() {
    this.carregandoGrid = true;

    this.service.FindBySistemasDoCliente(this.id, this.pagNumero, this.pagQtd, this.pagCampo, this.pagOrdem).subscribe(
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


  protected carregarCliente() {
    this.service.findById(this.id).subscribe(
      (response: any) => {
        this.nomeCliente = response.nome;
      },
      (error: any) => {
        this.errorMensagem.mostrarError('', error);
      }
    );
  }



  protected voltar() {
    window.history.back()
  }

}
