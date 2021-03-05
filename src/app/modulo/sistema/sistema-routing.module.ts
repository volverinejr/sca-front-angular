import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetalheComponent } from './detalhe/detalhe.component';
import { EditarComponent } from './editar/editar.component';
import { SistemaDetalheGuard } from './guard/sistema-detalhe.guard';
import { SistemaEditarGuard } from './guard/sistema-editar.guard';
import { SistemaNovoGuard } from './guard/sistema-novo.guard';
import { ListarComponent } from './listar/listar.component';
import { NovoComponent } from './novo/novo.component';


const Routes: Routes = [
  { path: '', component: ListarComponent },
  {
    path: 'novo', component: NovoComponent,
    canLoad: [SistemaNovoGuard],
    canActivate: [SistemaNovoGuard],
  },
  {
    path: 'detalhe/:id', component: DetalheComponent,
    canLoad: [SistemaDetalheGuard],
    canActivate: [SistemaDetalheGuard],
  },
  {
    path: 'editar/:id', component: EditarComponent,
    canLoad: [SistemaEditarGuard],
    canActivate: [SistemaEditarGuard],

  },
];

@NgModule({
  imports: [RouterModule.forChild(Routes)],
  exports: [RouterModule]
})
export class SistemaRoutingModule { }
