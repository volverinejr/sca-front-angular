import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnaliseListarGuard } from './modulo/analise/guard/analise-listar.guard';
import { ClienteListarGuard } from './modulo/cliente/guard/cliente-listar.guard';
import { FaseListarGuard } from './modulo/fase/guard/fase-listar.guard';
import { PermissaoListarGuard } from './modulo/permissao/guard/permissao-listar.guard';
import { SistemaListarGuard } from './modulo/sistema/guard/sistema-listar.guard';
import { SolicitacaoListarGuard } from './modulo/solicitacao/guard/solicitacao-listar.guard';
import { SprintListarGuard } from './modulo/sprint/guard/sprint-listar.guard';
import { TimeListarGuard } from './modulo/time/guard/time-listar.guard';
import { UserListarGuard } from './modulo/user/guard/user-listar.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./modulo/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'sistema',
    loadChildren: () => import('./modulo/sistema/sistema.module').then(m => m.SistemaModule),
    canLoad: [SistemaListarGuard],
    canActivate: [SistemaListarGuard],
  },
  {
    path: 'cliente',
    loadChildren: () => import('./modulo/cliente/cliente.module').then(m => m.ClienteModule),
    canLoad: [ClienteListarGuard],
    canActivate: [ClienteListarGuard],
  },
  {
    path: 'time',
    loadChildren: () => import('./modulo/time/time.module').then(m => m.TimeModule),
    canLoad: [TimeListarGuard],
    canActivate: [TimeListarGuard],
  },
  {
    path: 'permissao',
    loadChildren: () => import('./modulo/permissao/permissao.module').then(m => m.PermissaoModule),
    canLoad: [PermissaoListarGuard],
    canActivate: [PermissaoListarGuard],
  },
  {
    path: 'user',
    loadChildren: () => import('./modulo/user/user.module').then(m => m.UserModule),
    canLoad: [UserListarGuard],
    canActivate: [UserListarGuard],
  },
  {
    path: 'solicitacao',
    loadChildren: () => import('./modulo/solicitacao/solicitacao.module').then(m => m.SolicitacaoModule),
    canLoad: [SolicitacaoListarGuard],
    canActivate: [SolicitacaoListarGuard],
  },
  {
    path: 'analise',
    loadChildren: () => import('./modulo/analise/analise.module').then(m => m.AnaliseModule),
    canLoad: [AnaliseListarGuard],
    canActivate: [AnaliseListarGuard],
  },
  {
    path: 'sprint',
    loadChildren: () => import('./modulo/sprint/sprint.module').then(m => m.SprintModule),
    canLoad: [SprintListarGuard],
    canActivate: [SprintListarGuard],
  },
  {
    path: 'fase',
    loadChildren: () => import('./modulo/fase/fase.module').then(m => m.FaseModule),
    canLoad: [FaseListarGuard],
    canActivate: [FaseListarGuard],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
