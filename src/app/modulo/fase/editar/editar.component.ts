import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FaseService } from '../fase.service';

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



  constructor(
    private route: ActivatedRoute,
    private service: FaseService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.iniciarForm();

    // Recebendo o parametro da rota
    this.inscricao =
      this.route.params.subscribe(
        (params: any) => {
          this.id = params['id'];

          this.service.findById(this.id).subscribe(
            (response: any) => {
              this.form.patchValue(response);
            },
            (error: any) => {
              console.log(error.error.message);
            }
          );
        }
      );


  }

  iniciarForm() {
    this.form = new FormGroup({
      id: new FormControl(''),
      nome: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(100)])),
      pedirAceiteDoUsuario: new FormControl(false),
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
  //------Mensagem Validação

  atualizar() {
    if (this.form.invalid) {
      return;
    }

    this.carregando = true;
    this.service.update(this.form.value).subscribe(
      () => {
        this.carregando = false;
        this.router.navigate(['/fase']);
      },
      (error: any) => {
        this.carregando = false;
        console.log(error.error.message);
      }
    );

  }

  voltar() {
    window.history.back()
  }



  ngOnDEstroy() {
    this.inscricao.unsubscribe();
  }
}
