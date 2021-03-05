import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppCommonModule } from 'src/app/app.common.module';
import { ListarComponent } from './listar/listar.component';
import { NovoComponent } from './novo/novo.component';
import { DetalheComponent } from './detalhe/detalhe.component';
import { EditarComponent } from './editar/editar.component';
import { FaseRoutingModule } from './fase-routing.module';


@NgModule({
  declarations: [ListarComponent, NovoComponent, DetalheComponent, EditarComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    AppCommonModule,
    FaseRoutingModule,
  ],
  exports: [ListarComponent, NovoComponent, DetalheComponent, EditarComponent],
})
export class FaseModule { }
