import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrormensageService } from 'src/app/core/server/errormensage.service';
import { TimeService } from '../../time/time.service';
import { SistemaService } from '../sistema.service';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html',
  styleUrls: ['./novo.component.css']
})
export class NovoComponent implements OnInit {
  form: FormGroup;
  carregando: boolean = false;
  times: any[];


  constructor(
    private service: SistemaService,
    private serviceTime: TimeService,
    private router: Router,
    private errorMensagem: ErrormensageService,
  ) { }

  ngOnInit(): void {
    this.iniciarForm();

    this.carregarTimes();
  }

  iniciarForm() {
    this.form = new FormGroup({
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

  salvar() {
    if (this.form.invalid) {
      return;
    }

    this.carregando = true;
    this.service.novo(this.form.value).subscribe(
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

  protected carregarTimes() {

    this.serviceTime.findAll(0, 100, 'nome', '1', '').subscribe(
      (res: any) => {
        this.times = res.content;
      },
      (error: any) => {
        this.errorMensagem.mostrarError('', error);
        this.router.navigate(['']);
      }
    );
  }


}
