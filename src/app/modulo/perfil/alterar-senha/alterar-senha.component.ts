import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrormensageService } from 'src/app/core/server/errormensage.service';
import { PerfilService } from '../perfil.service';

@Component({
  selector: 'app-novo',
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.css']
})
export class AlterarSenhaComponent implements OnInit {
  form: FormGroup;
  carregando: boolean = false;

  constructor(
    private service: PerfilService,
    private router: Router,
    private errorMensagem: ErrormensageService,
  ) { }

  ngOnInit(): void {
    this.iniciarForm();
  }

  iniciarForm() {
    this.form = new FormGroup({
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(12)])),
    });
  }

  //------Mensagem Validação
  getErrorPassword() {
    if (this.form.controls.password.hasError('required')) {
      return 'Campo Requerido';
    } else if (this.form.controls.password.hasError('minlength')) {
      return 'Mín. de 8 caracteres';
    } else if (this.form.controls.password.hasError('maxLength')) {
      return 'Máx. de 12 caracteres';
    }
    return '';
  }
  //------Mensagem Validação

  atualizar() {
    if (this.form.invalid) {
      return;
    }

    this.carregando = true;
    this.service.updateSenha(this.form.value).subscribe(
      () => {
        this.carregando = false;
        this.errorMensagem.mensagemInformativa('Senha atualizada!');
      },
      (error: any) => {
        this.carregando = false;
        this.errorMensagem.mostrarError('', error);
      }
    );

  }

}
