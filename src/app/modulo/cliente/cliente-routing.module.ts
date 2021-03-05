import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetalheComponent } from './detalhe/detalhe.component';
import { EditarComponent } from './editar/editar.component';
import { ClienteDetalheGuard } from './guard/cliente-detalhe.guard';
import { ClienteNovoGuard } from './guard/cliente-novo.guard';
import { ClientEditarGuard } from './guard/cliente-editar.guard';
import { ListarComponent } from './listar/listar.component';
import { NovoComponent } from './novo/novo.component';
import { SistemaListarComponent } from './sistema-listar/sistema-listar.component';


const Routes: Routes = [
  { path: '', component: ListarComponent },
  {
    path: 'novo', component: NovoComponent,
    canLoad: [ClienteNovoGuard],
    canActivate: [ClienteNovoGuard],
  },
  {
    path: 'detalhe/:id', component: DetalheComponent,
    canLoad: [ClienteDetalheGuard],
    canActivate: [ClienteDetalheGuard],
  },
  {
    path: 'editar/:id', component: EditarComponent,
    canLoad: [ClientEditarGuard],
    canActivate: [ClientEditarGuard],
  },
  {
    path: ':id/sistemas', component: SistemaListarComponent,
    canLoad: [ClientEditarGuard],
    canActivate: [ClientEditarGuard],
  },

];

@NgModule({
  imports: [RouterModule.forChild(Routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
