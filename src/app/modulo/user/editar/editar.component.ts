import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrormensageService } from 'src/app/core/server/errormensage.service';
import { ClienteService } from '../../cliente/cliente.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  id: number;
  dataSistema: any;
  form: FormGroup;
  carregando: boolean = false;
  clientes: any[];


  constructor(
    private route: ActivatedRoute,
    private service: UserService,
    private clienteService: ClienteService,
    private router: Router,
    private errorMensagem: ErrormensageService,
  ) {
  }

  ngOnInit(): void {
    this.iniciarForm();

    this.carregarSistemas();
  }

  iniciarForm() {
    this.form = new FormGroup({
      id: new FormControl(''),
      userName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(50)])),
      fullName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(100)])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('xxxx'),
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
  //------Mensagem Validação

  atualizar() {
    if (this.form.invalid) {
      return;
    }

    this.carregando = true;
    this.service.update(this.form.value).subscribe(
      () => {
        this.carregando = false;
        this.router.navigate(['/user']);
      },
      (error: any) => {
        this.carregando = false;
        console.log(error.error.message);
      }
    );

  }

  protected carregarSistemas() {

    this.clienteService.findAll(0, 100, 'nome', '1', '').subscribe(
      (res: any) => {
        this.clientes = res.content;

        this.carregarUser();
      },
      (error: any) => {
        this.errorMensagem.mostrarError('', error);
        this.router.navigate(['']);
      }
    );
  }


  protected carregarUser() {
    //Recebendo o parametro da rota
    this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];

        this.service.findById(this.id).subscribe(
          (response: any) => {
            this.form.patchValue(response);

            this.form.get("cliente").setValue(this.clientes.find(cli => cli.nome === response.cliente.nome));
          },
          (error: any) => {
            this.errorMensagem.mostrarError('', error);
          }
        );
      }
    );

  }

  voltar() {
    window.history.back()
  }

}
