import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetalheComponent } from './detalhe/detalhe.component';
import { EditarComponent } from './editar/editar.component';
import { SolicitacaoListarGuard } from './guard/solicitacao-listar.guard';
import { ListarComponent } from './listar/listar.component';
import { NovoComponent } from './novo/novo.component';

const Routes: Routes = [
  { path: '', component: ListarComponent },
  {
    path: 'novo', component: NovoComponent,
    canLoad: [SolicitacaoListarGuard],
    canActivate: [SolicitacaoListarGuard],
  },
  {
    path: 'detalhe/:id', component: DetalheComponent,
    canLoad: [SolicitacaoListarGuard],
    canActivate: [SolicitacaoListarGuard],
  },
  {
    path: 'editar/:id', component: EditarComponent,
    canLoad: [SolicitacaoListarGuard],
    canActivate: [SolicitacaoListarGuard],

  },

];

@NgModule({
  imports: [RouterModule.forChild(Routes)],
  exports: [RouterModule]
})
export class SolicitacaoRoutingModule { }
