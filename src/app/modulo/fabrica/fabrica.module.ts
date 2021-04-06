import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppCommonModule } from 'src/app/app.common.module';
import { ListarComponent } from './listar/listar.component';
import { FabricaRoutingModule } from './fabrica-routing.module';
import { SolicitacaoListarComponent } from './solicitacao-listar/solicitacao-listar.component';
import { FaseListarComponent } from './fase-listar/fase-listar.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { DetalheComponent } from './detalhe/detalhe.component';


@NgModule({
  declarations: [ListarComponent, SolicitacaoListarComponent, FaseListarComponent, NovoComponent, EditarComponent, DetalheComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    AppCommonModule,
    FabricaRoutingModule,
  ],
  exports: [ListarComponent, SolicitacaoListarComponent, FaseListarComponent, NovoComponent, EditarComponent, DetalheComponent],
})
export class FabricaModule { }
