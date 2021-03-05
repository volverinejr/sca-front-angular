import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetalheComponent } from './detalhe/detalhe.component';
import { EditarComponent } from './editar/editar.component';
import { TimeDetalheGuard } from './guard/time-detalhe.guard';
import { TimeEditarGuard } from './guard/time-editar.guard';
import { TimeNovoGuard } from './guard/time-novo.guard';
import { ListarComponent } from './listar/listar.component';
import { NovoComponent } from './novo/novo.component';


const Routes: Routes = [
  { path: '', component: ListarComponent },
  {
    path: 'novo', component: NovoComponent,
    canLoad: [TimeNovoGuard],
    canActivate: [TimeNovoGuard],
  },
  {
    path: 'detalhe/:id', component: DetalheComponent,
    canLoad: [TimeDetalheGuard],
    canActivate: [TimeDetalheGuard],
  },
  {
    path: 'editar/:id', component: EditarComponent,
    canLoad: [TimeEditarGuard],
    canActivate: [TimeEditarGuard],

  },
];

@NgModule({
  imports: [RouterModule.forChild(Routes)],
  exports: [RouterModule]
})
export class TimeRoutingModule { }
