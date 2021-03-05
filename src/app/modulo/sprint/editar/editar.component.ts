import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SprintService } from '../sprint.service';

import localePt from '@angular/common/locales/pt';
import { DatePipe, registerLocaleData } from '@angular/common';
import { TimeService } from '../../time/time.service';
import { ErrormensageService } from 'src/app/core/server/errormensage.service';

registerLocaleData(localePt, 'pt');

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
  providers: [DatePipe]
})
export class EditarComponent implements OnInit {
  id: number;
  inscricao: Subscription;
  dataSistema: any;
  form: FormGroup;
  carregando: boolean = false;
  times: any[];
  pt: any;
  registro: any = {};




  constructor(
    private route: ActivatedRoute,
    private service: SprintService,
    private serviceTime: TimeService,
    private router: Router,
    public datepipe: DatePipe,
    private errorMensagem: ErrormensageService,
  ) {
  }

  ngOnInit(): void {
    this.carregarTimes();

    this.pt = {
      firstDayOfWeek: 0,
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
      dayNamesMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
        'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      today: 'Hoje',
      clear: 'Limpar'
    }

    this.iniciarForm();


    // Recebendo o parametro da rota
    this.inscricao =
      this.route.params.subscribe(
        (params: any) => {
          this.id = params['id'];

          this.service.findById(this.id).subscribe(
            (response: any) => {
              this.form.patchValue(response);

              this.form.get("time").setValue(this.times.find(tim => tim.id === response.time.id));
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
      dataInicioFormatada: new FormControl('', Validators.compose([Validators.required])),
      dataFimFormatada: new FormControl('', Validators.compose([Validators.required])),
      time: new FormControl('', Validators.compose([Validators.required])),
    });
  }

  //------Mensagem Validação
  //------Mensagem Validação

  atualizar() {
    if (this.form.invalid) {
      return;
    }


    this.registro = this.form.value;

    if (this.form.controls.dataInicioFormatada.dirty) {
      let prazoTemp: Date = this.form.controls.dataInicioFormatada.value;
      let inicioFormatado: string = this.datepipe.transform(prazoTemp, 'yyyy-MM-dd');

      this.registro.dataInicio = inicioFormatado + 'T10:00:00.000+00:00';

    } else {
      let separandoData = this.form.controls.dataInicioFormatada.value.split('/');

      this.registro.dataInicio = separandoData[2] + '-' + separandoData[1] + '-' + separandoData[0] + 'T10:00:00.000+00:00';
    }



    if (this.form.controls.dataFimFormatada.dirty) {
      let prazoTemp: Date = this.form.controls.dataFimFormatada.value;
      let fimFormatado: string = this.datepipe.transform(prazoTemp, 'yyyy-MM-dd');

      this.registro.dataFim = fimFormatado + 'T10:00:00.000+00:00';

    } else {
      let separandoData = this.form.controls.dataFimFormatada.value.split('/');

      this.registro.dataFim = separandoData[2] + '-' + separandoData[1] + '-' + separandoData[0] + 'T10:00:00.000+00:00';
    }

    if (this.registro.dataFim < this.registro.dataInicio) {
      this.errorMensagem.mensagemInformativa("Data final menor que a data inicial");
    } else {

      this.carregando = true;
      this.service.update(this.registro).subscribe(
        () => {
          this.carregando = false;
          this.router.navigate(['/sprint']);
        },
        (error: any) => {
          this.carregando = false;
          this.errorMensagem.mostrarError('', error);
        }
      );
    }

  }

  voltar() {
    window.history.back()
  }



  ngOnDEstroy() {
    this.inscricao.unsubscribe();
  }


  carregarTimes() {

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
