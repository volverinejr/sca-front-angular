import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrormensageService } from 'src/app/core/server/errormensage.service';
import { FaseService } from '../../fase/fase.service';
import { FabricaService } from '../fabrica.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  id: number;
  inscricao: Subscription;
  dataSistema: any;
  form: FormGroup;
  carregando: boolean = false;

  fases: any[];
  idSprint: number;
  idSolicitacao: number;
  idFase: number;




  constructor(
    private route: ActivatedRoute,
    private service: FabricaService,
    private serviceFase: FaseService,
    private errorMensagem: ErrormensageService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.iniciarForm();

    // Recebendo o parametro da rota
    this.inscricao =
      this.route.params.subscribe(
        (params: any) => {
          this.idSprint = params['id'];
          this.idSolicitacao = params['idsolicitacao'];
          this.idFase = params['idfase'];

          this.carregarFases();
        }
      );


  }

  iniciarForm() {
    this.form = new FormGroup({
      id: new FormControl(''),
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
  }
  //------Mensagem Validação

  atualizar() {
    if (this.form.invalid) {
      return;
    }

    this.carregando = true;
    this.service.updateFase(this.idSprint, this.idSolicitacao, this.form.value).subscribe(
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



  ngOnDEstroy() {
    this.inscricao.unsubscribe();
  }

  protected carregarFases() {

    this.serviceFase.findAll(0, 100, 'id', '1', '').subscribe(
      (res: any) => {
        this.fases = res.content;

        this.carregarRegistro();
      },
      (error: any) => {
        this.errorMensagem.mostrarError('', error);
        this.router.navigate(['']);
      }
    );
  }


  protected carregarRegistro() {
    this.service.findByFase(this.idSprint, this.idSolicitacao, this.idFase).subscribe(
      (response: any) => {
        this.form.patchValue(response);

        this.form.get("fase").setValue(this.fases.find(f => f.id === response.fase.id));
      },
      (error: any) => {
        this.errorMensagem.mostrarError('', error);
      }
    );
  }
}
