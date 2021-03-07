import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrormensageService } from 'src/app/core/server/errormensage.service';
import { SprintService } from '../sprint.service';



import localePt from '@angular/common/locales/pt';
import { DatePipe, registerLocaleData } from '@angular/common';
import { TimeService } from '../../time/time.service';

registerLocaleData(localePt, 'pt');

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html',
  styleUrls: ['./novo.component.css'],
  providers: [DatePipe]
})
export class NovoComponent implements OnInit {
  form: FormGroup;
  carregando: boolean = false;
  times: any[];
  pt: any;
  registro: any = {};


  constructor(
    private service: SprintService,
    private serviceTime: TimeService,
    private router: Router,
    private errorMensagem: ErrormensageService,
    public datepipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.iniciarForm();

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
  }

  iniciarForm() {
    this.form = new FormGroup({
      dataInicioFormatada: new FormControl('', Validators.compose([Validators.required])),
      dataFimFormatada: new FormControl('', Validators.compose([Validators.required])),
      time: new FormControl('', Validators.compose([Validators.required])),
    });
  }

  //------Mensagem Validação
  //------Mensagem Validação

  salvar() {
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
      this.service.novo(this.registro).subscribe(
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


  carregarTimes() {

    this.serviceTime.findAll(0, 100, 'nome', '1', '').subscribe(
      (res: any) => {
        this.times = res.content;
      },
      (error: any) => {
        this.errorMensagem.mostrarError('', error);
      }
    );

  }


}
