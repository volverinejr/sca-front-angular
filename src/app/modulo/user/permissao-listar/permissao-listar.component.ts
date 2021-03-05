import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrormensageService } from 'src/app/core/server/errormensage.service';
import { UserService } from '../user.service';


@Component({
  selector: 'app-listar',
  templateUrl: './permissao-listar.component.html',
  styleUrls: ['./permissao-listar.component.css']
})
export class PermissaoListarComponent implements OnInit {
  carregandoGrid: boolean = false;
  totalRecords: number = 0;
  dataSouce: any[];
  protected pagNumero = 0;
  protected pagQtd = 10;
  protected pagCampo = 'id';
  protected pagOrdem = 1;
  protected pagFiltro = '';
  id: number;
  nomeUser: string;




  constructor(
    private service: UserService,
    private router: Router,
    private errorMensagem: ErrormensageService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    // Recebendo o parametro da rota
    this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];

        this.carregarUser();

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


  protected add(idPermissao: number) {
    var userClienteSistema = {
      "userId": this.id,
      "permissaoId": idPermissao
    }

    this.carregandoGrid = true;
    this.service.addPermissaoAoUser(userClienteSistema).subscribe(
      () => {

        for (var data in this.dataSouce) {
          if (this.dataSouce[data].id == idPermissao) {
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

  protected remover(idPermissao: number) {
    this.carregandoGrid = true;
    this.service.deletePermissaoDoUser(this.id, idPermissao).subscribe(
      () => {

        for (var data in this.dataSouce) {
          if (this.dataSouce[data].id == idPermissao) {
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

    this.service.findByPermissaoDoUser(this.id, this.pagNumero, this.pagQtd, this.pagCampo, this.pagOrdem).subscribe(
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


  protected carregarUser() {
    this.service.findById(this.id).subscribe(
      (response: any) => {
        this.nomeUser = response.userName;
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
