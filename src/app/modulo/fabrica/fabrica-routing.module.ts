import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FaseListarComponent } from './fase-listar/fase-listar.component';
import { FabricaListarGuard } from './guard/fabrica-listar.guard';
import { ListarComponent } from './listar/listar.component';
import { NovoComponent } from './novo/novo.component';
import { SolicitacaoListarComponent } from './solicitacao-listar/solicitacao-listar.component';


const Routes: Routes = [
  { path: '', component: ListarComponent },
  {
    path: ':id/solicitacao', component: SolicitacaoListarComponent,
    canLoad: [FabricaListarGuard],
    canActivate: [FabricaListarGuard],
  },
  {
    path: ':id/solicitacao/:idsolicitacao/fase', component: FaseListarComponent,
    canLoad: [FabricaListarGuard],
    canActivate: [FabricaListarGuard],
  },
  {
    path: ':id/solicitacao/:idsolicitacao/fase/novo', component: NovoComponent,
    canLoad: [FabricaListarGuard],
    canActivate: [FabricaListarGuard],
  },

/*  {
    path: ':id/solicitacao/:idsolicitacao/fase', component: FaseListarComponent,
    canLoad: [FabricaListarGuard],
    canActivate: [FabricaListarGuard],
  },
*/


];

@NgModule({
  imports: [RouterModule.forChild(Routes)],
  exports: [RouterModule]
})
export class FabricaRoutingModule { }
