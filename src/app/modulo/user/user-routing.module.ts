import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetalheComponent } from './detalhe/detalhe.component';
import { EditarComponent } from './editar/editar.component';
import { UserDetalheGuard } from './guard/user-detalhe.guard';
import { UserEditarGuard } from './guard/user-editar.guard';
import { UserNovoGuard } from './guard/user-novo.guard';
import { ListarComponent } from './listar/listar.component';
import { NovoComponent } from './novo/novo.component';
import { PermissaoListarComponent } from './permissao-listar/permissao-listar.component';
import { SistemaListarComponent } from './sistema-listar/sistema-listar.component';


const Routes: Routes = [
  { path: '', component: ListarComponent },
  {
    path: 'novo', component: NovoComponent,
    canLoad: [UserNovoGuard],
    canActivate: [UserNovoGuard],
  },
  {
    path: 'detalhe/:id', component: DetalheComponent,
    canLoad: [UserDetalheGuard],
    canActivate: [UserDetalheGuard],
  },
  {
    path: 'editar/:id', component: EditarComponent,
    canLoad: [UserEditarGuard],
    canActivate: [UserEditarGuard],
  },
  {
    path: ':id/sistemas', component: SistemaListarComponent,
    canLoad: [UserEditarGuard],
    canActivate: [UserEditarGuard],
  },
  {
    path: ':id/permissao', component: PermissaoListarComponent,
    canLoad: [UserEditarGuard],
    canActivate: [UserEditarGuard],
  },

];

@NgModule({
  imports: [RouterModule.forChild(Routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
