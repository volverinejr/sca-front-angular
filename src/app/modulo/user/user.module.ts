import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppCommonModule } from 'src/app/app.common.module';
import { ListarComponent } from './listar/listar.component';
import { NovoComponent } from './novo/novo.component';
import { DetalheComponent } from './detalhe/detalhe.component';
import { EditarComponent } from './editar/editar.component';
import { UserRoutingModule } from './user-routing.module';
import { SistemaListarComponent } from './sistema-listar/sistema-listar.component';
import { PermissaoListarComponent } from './permissao-listar/permissao-listar.component';
import { TimeListarComponent } from './time-listar/time-listar.component';


@NgModule({
  declarations: [
    ListarComponent,
    NovoComponent,
    DetalheComponent,
    EditarComponent,
    SistemaListarComponent,
    PermissaoListarComponent,
    TimeListarComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    AppCommonModule,
    UserRoutingModule,
  ],
  exports: [
    ListarComponent,
    NovoComponent,
    DetalheComponent,
    EditarComponent,
    SistemaListarComponent,
    PermissaoListarComponent,
    TimeListarComponent,
  ],
})
export class UserModule { }
