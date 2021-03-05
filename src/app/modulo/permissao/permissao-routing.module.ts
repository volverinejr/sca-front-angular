import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetalheComponent } from './detalhe/detalhe.component';
import { EditarComponent } from './editar/editar.component';
import { PermissaoDetalheGuard } from './guard/permissao-detalhe.guard';
import { PermissaoEditarGuard } from './guard/permissao-editar.guard';
import { PermissaoNovoGuard } from './guard/permissao-novo.guard';
import { ListarComponent } from './listar/listar.component';
import { NovoComponent } from './novo/novo.component';


const Routes: Routes = [
  { path: '', component: ListarComponent },
  {
    path: 'novo', component: NovoComponent,
    canLoad: [PermissaoNovoGuard],
    canActivate: [PermissaoNovoGuard],
  },
  {
    path: 'detalhe/:id', component: DetalheComponent,
    canLoad: [PermissaoDetalheGuard],
    canActivate: [PermissaoDetalheGuard],
  },
  {
    path: 'editar/:id', component: EditarComponent,
    canLoad: [PermissaoEditarGuard],
    canActivate: [PermissaoEditarGuard],

  },
];

@NgModule({
  imports: [RouterModule.forChild(Routes)],
  exports: [RouterModule]
})
export class PermissaoRoutingModule { }
