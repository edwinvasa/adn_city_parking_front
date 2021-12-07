import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarTarifaComponent } from './components/listar-tarifa/listar-tarifa.component';
import { TarifaComponent } from './components/tarifa/tarifa.component';

const routes: Routes = [
  {
    path: '',
    component: TarifaComponent,
    children: [
      {
        path: 'listar',
        component: ListarTarifaComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TarifaRoutingModule { }
