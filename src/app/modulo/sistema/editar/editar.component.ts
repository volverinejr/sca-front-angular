import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrormensageService } from 'src/app/core/server/errormensage.service';
import { TimeService } from '../../time/time.service';
import { SistemaService } from '../sistema.service';

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
  times: any[];



  constructor(
    private route: ActivatedRoute,
    private service: SistemaService,
    private serviceTime: TimeService,
    private router: Router,
    private errorMensagem: ErrormensageService,
  ) {
  }

  ngOnInit(): void {
    this.iniciarForm();

    this.carregarTimes();
  }

  iniciarForm() {
    this.form = new FormGroup({
      id: new FormControl(''),
      nome: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(100)])),
      time: new FormControl('', Validators.compose([Validators.required])),
      ativo: new FormControl(false),
    });
  }

  //------Mensagem Validação
  getErrorNome() {
    if (this.form.controls.nome.hasError('required')) {
      return 'Campo Requerido';
    } else if (this.form.controls.nome.hasError('minlength')) {
      return 'Mín. de 4 caracteres';
    } else if (this.form.controls.nome.hasError('maxLength')) {
      return 'Máx. de 100 caracteres';
    }
    return '';
  }
  getErrorTime() {
    if (this.form.controls.time.hasError('required')) {
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
    this.service.update(this.form.value).subscribe(
      () => {
        this.carregando = false;
        this.router.navigate(['/sistema']);
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

  protected carregarTimes() {

    this.serviceTime.findAll(0, 100, 'nome', '1', '').subscribe(
      (res: any) => {
        this.times = res.content;


    // Recebendo o parametro da rota
    this.inscricao =
      this.route.params.subscribe(
        (params: any) => {
          this.id = params['id'];

          this.service.findById(this.id).subscribe(
            (response: any) => {
              this.form.patchValue(response);

              this.form.get("time").setValue(this.times.find(t => t.id === response.time.id));
            },
            (error: any) => {
              this.errorMensagem.mostrarError('', error);
            }
          );
        }
      );

      },
      (error: any) => {
        this.errorMensagem.mostrarError('', error);
        this.router.navigate(['']);
      }
    );
  }
}
