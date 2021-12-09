import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarParqueoComponent } from './components/editar-parqueo/editar-parqueo.component';
import { FacturaComponent } from './components/factura/factura.component';
import { ListarParqueoComponent } from './components/listar-parqueo/listar-parqueo.component';
import { ParqueoComponent } from './components/parqueo/parqueo.component';

const routes: Routes = [
  {
    path: '',
    component: ParqueoComponent,
    children: [
      {
        path: 'crear',
        component: EditarParqueoComponent
      },
      {
        path: 'listar',
        component: ListarParqueoComponent,
        children: [
          {
            path: 'crear',
            component: EditarParqueoComponent
          },
          {
            path: 'editar/:id',
            component: EditarParqueoComponent
          },
          {
            path: 'factura/:id',
            component: FacturaComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParqueoRoutingModule { }
