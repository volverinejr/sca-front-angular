import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrormensageService } from 'src/app/core/server/errormensage.service';
import { SprintService } from '../sprint.service';
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



  constructor(
    private service: SprintService,
    private router: Router,
    private errorMensagem: ErrormensageService,
  ) { }

  ngOnInit(): void {
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
    this.router.navigate(['/sprint/novo']);
  }

  editar(id: number){
    this.router.navigate(['/sprint/editar/' + id]);
  }

  detalhe(id: number){
    this.router.navigate(['/sprint/detalhe/' + id]);
  }


  protected carregarGrid() {
    this.carregandoGrid = true;

    this.service.findAll(this.pagNumero, this.pagQtd, this.pagCampo, this.pagOrdem, this.pagFiltro).subscribe(
      (res: any) => {


        console.log( res.content );

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


  protected solicitacoesDaSprint(idSprint: number){
    this.router.navigate(['/sprint/' + idSprint + '/solicitacao']);
  }

  encaminharAoTime(idSprint: number){
    Swal.fire({
      title: 'Você tem certeza?',
      text: "Enviar Sprint ao Time!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, Encaminhar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.patch(idSprint).subscribe(
          () => {
            Swal.fire({
              title: 'Encaminhamento realizado',
              icon: 'info',
            })
          },
          (error: any) => {
            this.errorMensagem.mostrarError('', error);
          }
        );
      }
    })
  }

}
