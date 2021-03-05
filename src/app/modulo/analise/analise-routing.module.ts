import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetalheComponent } from './detalhe/detalhe.component';
import { AnaliseListarGuard } from './guard/analise-listar.guard';
import { ListarComponent } from './listar/listar.component';

const Routes: Routes = [
  { path: '', component: ListarComponent },
  {
    path: 'detalhe/:id', component: DetalheComponent,
    canLoad: [AnaliseListarGuard],
    canActivate: [AnaliseListarGuard],
  },

];

@NgModule({
  imports: [RouterModule.forChild(Routes)],
  exports: [RouterModule]
})
export class AnaliseRoutingModule { }
