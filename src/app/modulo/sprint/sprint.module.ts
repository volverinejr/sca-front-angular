import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppCommonModule } from 'src/app/app.common.module';
import { ListarComponent } from './listar/listar.component';
import { NovoComponent } from './novo/novo.component';
import { DetalheComponent } from './detalhe/detalhe.component';
import { EditarComponent } from './editar/editar.component';
import { SprintRoutingModule } from './sprint-routing.module';
import { SolicitacaoListarComponent } from './solicitacao-listar/solicitacao-listar.component';


@NgModule({
  declarations: [ListarComponent, NovoComponent, DetalheComponent, EditarComponent, SolicitacaoListarComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    AppCommonModule,
    SprintRoutingModule,
  ],
  exports: [ListarComponent, NovoComponent, DetalheComponent, EditarComponent, SolicitacaoListarComponent],
})
export class SprintModule { }
