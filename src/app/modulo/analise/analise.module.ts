import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppCommonModule } from 'src/app/app.common.module';
import { ListarComponent } from './listar/listar.component';
import { DetalheComponent } from './detalhe/detalhe.component';
import { AnaliseRoutingModule } from './analise-routing.module';


@NgModule({
  declarations: [ListarComponent, DetalheComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    AppCommonModule,
    AnaliseRoutingModule,
  ],
  exports: [ListarComponent, DetalheComponent],
})
export class AnaliseModule { }
