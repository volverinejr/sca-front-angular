import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrormensageService } from 'src/app/core/server/errormensage.service';
import { FaseService } from '../../fase/fase.service';
import { FabricaService } from '../fabrica.service';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html',
  styleUrls: ['./novo.component.css']
})
export class NovoComponent implements OnInit {
  form: FormGroup;
  carregando: boolean = false;
  fases: any[];
  idSprint: number;
  idSolicitacao: number;



  constructor(
    private service: FabricaService,
    private serviceFase: FaseService,
    private router: Router,
    private errorMensagem: ErrormensageService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: any) => {
        this.idSprint = params['id'];
        this.idSolicitacao = params['idsolicitacao'];
      }
    );

    this.iniciarForm();

    this.carregarFases();
  }

  iniciarForm() {
    this.form = new FormGroup({
      fase: new FormControl('', Validators.required),
      observacao: new FormControl(''),
      finalizada: new FormControl(false),
    });
  }

  //------Mensagem Validação
  getErrorFase() {
    if (this.form.controls.fase.hasError('required')) {
      return 'Campo Requerido';
    }
    return '';
  }  //------Mensagem Validação

  salvar() {
    if (this.form.invalid) {
      return;
    }

    this.carregando = true;
    this.service.novaFase(this.idSprint, this.idSolicitacao, this.form.value).subscribe(
      () => {
        this.carregando = false;

        this.voltar();
      },
      (error: any) => {
        this.carregando = false;
        this.errorMensagem.mostrarError('', error);
      }
    );

  }

  voltar() {
    window.history.back()
  }

  protected carregarFases() {

    this.serviceFase.findAll(0, 100, 'id', '1', '').subscribe(
      (res: any) => {
        this.fases = res.content;
      },
      (error: any) => {
        this.errorMensagem.mostrarError('', error);
        this.router.navigate(['']);
      }
    );
  }


}
