import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrormensageService } from 'src/app/core/server/errormensage.service';
import { ClienteService } from '../../cliente/cliente.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html',
  styleUrls: ['./novo.component.css']
})
export class NovoComponent implements OnInit {
  form: FormGroup;
  carregando: boolean = false;
  clientes: any[];


  constructor(
    private service: UserService,
    private clienteService: ClienteService,
    private router: Router,
    private errorMensagem: ErrormensageService,
  ) { }

  ngOnInit(): void {
    this.iniciarForm();

    this.carregarClientes();
  }

  iniciarForm() {
    this.form = new FormGroup({
      userName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(50)])),
      fullName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(100)])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(12)])),
      enabled: new FormControl(true),
      verOutraSolicitacao: new FormControl(false),
      cliente: new FormControl(null),
    });
  }

  //------Mensagem Validação
  getErrorUserName() {
    if (this.form.controls.userName.hasError('required')) {
      return 'Campo Requerido';
    } else if (this.form.controls.userName.hasError('minlength')) {
      return 'Mín. de 4 caracteres';
    } else if (this.form.controls.userName.hasError('maxLength')) {
      return 'Máx. de 50 caracteres';
    }
    return '';
  }
  getErrorFullName() {
    if (this.form.controls.fullName.hasError('required')) {
      return 'Campo Requerido';
    } else if (this.form.controls.fullName.hasError('minlength')) {
      return 'Mín. de 4 caracteres';
    } else if (this.form.controls.fullName.hasError('maxLength')) {
      return 'Máx. de 100 caracteres';
    }
    return '';
  }
  getErrorEmail() {
    if (this.form.controls.email.hasError('required')) {
      return 'Campo Requerido';
    } else if (this.form.controls.email.hasError('email')) {
      return 'Email inválido';
    }
    return '';
  }
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

  salvar() {
    if (this.form.invalid) {
      return;
    }

    this.carregando = true;
    this.service.novo(this.form.value).subscribe(
      () => {
        this.carregando = false;
        this.router.navigate(['/user']);
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

  protected carregarClientes() {

    this.clienteService.findAll(0, 100, 'nome', '1', '').subscribe(
      (res: any) => {
        this.clientes = res.content;
      },
      (error: any) => {
        this.errorMensagem.mostrarError('', error);
        this.router.navigate(['']);
      }
    );
  }


}
