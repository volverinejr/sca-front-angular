import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrormensageService } from 'src/app/core/server/errormensage.service';
import { SolicitacaoService } from '../solicitacao.service';

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
  clientes: any[];
  sistemas: any[];



  constructor(
    private route: ActivatedRoute,
    private service: SolicitacaoService,
    private router: Router,
    private errorMensagem: ErrormensageService,
  ) {
  }

  ngOnInit(): void {
    this.iniciarForm();

    this.carregarClientes();

    // Recebendo o parametro da rota
    this.inscricao =
      this.route.params.subscribe(
        (params: any) => {
          this.id = params['id'];

          this.service.findById(this.id).subscribe(
            (response: any) => {
              this.form.patchValue(response);

              this.form.get("cliente").setValue(this.clientes.find(cli => cli.nome === response.cliente.nome));

              this.carregarSistemasDoCliente(response.cliente.id);
            },
            (error: any) => {
              this.errorMensagem.mostrarError('', error);
            }
          );
        }
      );


  }

  iniciarForm() {
    this.form = new FormGroup({
      id: new FormControl(''),
      descricao: new FormControl('', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(2000)])),
      cliente: new FormControl(null, Validators.compose([Validators.required])),
      sistema: new FormControl(null, Validators.compose([Validators.required])),
    });
  }

  //------Mensagem Validação
  getErrorDescricao() {
    if (this.form.controls.descricao.hasError('required')) {
      return 'Campo Requerido';
    } else if (this.form.controls.descricao.hasError('minlength')) {
      return 'Mín. de 10 caracteres';
    } else if (this.form.controls.descricao.hasError('maxLength')) {
      return 'Máx. de 2000 caracteres';
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
        this.router.navigate(['/solicitacao']);
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



  protected carregarClientes() {

    this.service.FindByClientesDoUsuario(0, 100, 'nome', '1').subscribe(
      (res: any) => {
        this.clientes = res.content;
      },
      (error: any) => {
        this.errorMensagem.mostrarError('', error);
        this.router.navigate(['']);
      }
    );
  }

  onChangeCliente(event: any){
    this.carregarSistemasDoCliente(event.value.id);
  }

  protected carregarSistemasDoCliente(idCliente: number){

    this.service.FindBySistemasDoClientes(idCliente, 0, "100", 'id', '1').subscribe(
      (res: any) => {

        this.sistemas = [];
        for (var val of res.content) {
          this.sistemas.push(val.sistema);
        }

      },
      (error: any) => {
        this.errorMensagem.mostrarError('', error);
        this.router.navigate(['']);
      }
    );

  }


}
