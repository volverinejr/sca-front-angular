import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlterarSenhaComponent } from './alterar-senha/alterar-senha.component';


const Routes: Routes = [
  { path: '', component: AlterarSenhaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(Routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }
