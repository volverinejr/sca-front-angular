import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetalheComponent } from './detalhe/detalhe.component';
import { EditarComponent } from './editar/editar.component';
import { FaseListarGuard } from './guard/fase-listar.guard';
import { ListarComponent } from './listar/listar.component';
import { NovoComponent } from './novo/novo.component';


const Routes: Routes = [
  { path: '', component: ListarComponent },
  {
    path: 'novo', component: NovoComponent,
    canLoad: [FaseListarGuard],
    canActivate: [FaseListarGuard],
  },
  {
    path: 'detalhe/:id', component: DetalheComponent,
    canLoad: [FaseListarGuard],
    canActivate: [FaseListarGuard],
  },
  {
    path: 'editar/:id', component: EditarComponent,
    canLoad: [FaseListarGuard],
    canActivate: [FaseListarGuard],

  },
];

@NgModule({
  imports: [RouterModule.forChild(Routes)],
  exports: [RouterModule]
})
export class FaseRoutingModule { }
