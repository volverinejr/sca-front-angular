import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrormensageService } from 'src/app/core/server/errormensage.service';
import { PermissaoService } from '../permissao.service';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html',
  styleUrls: ['./novo.component.css']
})
export class NovoComponent implements OnInit {
  form: FormGroup;
  carregando: boolean = false;

  constructor(
    private service: PermissaoService,
    private router: Router,
    private errorMensagem: ErrormensageService,
  ) { }

  ngOnInit(): void {
    this.iniciarForm();
  }

  iniciarForm() {
    this.form = new FormGroup({
      description: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(100)])),
    });
  }

  //------Mensagem Validação
  getErrorDescription() {
    if (this.form.controls.description.hasError('required')) {
      return 'Campo Requerido';
    } else if (this.form.controls.description.hasError('minlength')) {
      return 'Mín. de 4 caracteres';
    } else if (this.form.controls.description.hasError('maxLength')) {
      return 'Máx. de 100 caracteres';
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
        this.router.navigate(['/permissao']);
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


}
