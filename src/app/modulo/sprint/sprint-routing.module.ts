import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetalheComponent } from './detalhe/detalhe.component';
import { EditarComponent } from './editar/editar.component';
import { SprintListarGuard } from './guard/sprint-listar.guard';
import { ListarComponent } from './listar/listar.component';
import { NovoComponent } from './novo/novo.component';
import { SolicitacaoListarComponent } from './solicitacao-listar/solicitacao-listar.component';


const Routes: Routes = [
  { path: '', component: ListarComponent },
  {
    path: 'novo', component: NovoComponent,
    canLoad: [SprintListarGuard],
    canActivate: [SprintListarGuard],
  },
  {
    path: 'detalhe/:id', component: DetalheComponent,
    canLoad: [SprintListarGuard],
    canActivate: [SprintListarGuard],
  },
  {
    path: 'editar/:id', component: EditarComponent,
    canLoad: [SprintListarGuard],
    canActivate: [SprintListarGuard],
  },
  {
    path: ':id/solicitacao', component: SolicitacaoListarComponent,
    canLoad: [SprintListarGuard],
    canActivate: [SprintListarGuard],
  },

];

@NgModule({
  imports: [RouterModule.forChild(Routes)],
  exports: [RouterModule]
})
export class SprintRoutingModule { }
