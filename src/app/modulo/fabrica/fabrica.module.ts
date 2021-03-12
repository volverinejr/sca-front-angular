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


@NgModule({
  declarations: [ListarComponent, SolicitacaoListarComponent, FaseListarComponent, NovoComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    AppCommonModule,
    FabricaRoutingModule,
  ],
  exports: [ListarComponent, SolicitacaoListarComponent, FaseListarComponent, NovoComponent],
})
export class FabricaModule { }
