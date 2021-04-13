import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetalheComponent } from './detalhe/detalhe.component';
import { PesquisaListarGuard } from './guard/pesquisa-listar.guard';
import { ListarComponent } from './listar/listar.component';


const Routes: Routes = [
  { path: '', component: ListarComponent },
  {
    path: 'detalhe/:id', component: DetalheComponent,
    canLoad: [PesquisaListarGuard],
    canActivate: [PesquisaListarGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(Routes)],
  exports: [RouterModule]
})
export class PesquisaRoutingModule { }
