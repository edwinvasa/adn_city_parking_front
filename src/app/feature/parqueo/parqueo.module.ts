import { NgModule } from '@angular/core';

import { ParqueoRoutingModule } from './parqueo-routing.module';
import { ListarParqueoComponent } from './components/listar-parqueo/listar-parqueo.component';
import { ParqueoComponent } from './components/parqueo/parqueo.component';
import { SharedModule } from '@shared/shared.module';
import { ParqueoService } from './shared/service/parqueo.service';
import { EditarParqueoComponent } from './components/editar-parqueo/editar-parqueo.component';
import { FacturaComponent } from './components/factura/factura.component';


@NgModule({
  declarations: [
    ParqueoComponent,
    ListarParqueoComponent,
    EditarParqueoComponent,
    FacturaComponent
  ],
  imports: [
    SharedModule,
    ParqueoRoutingModule
  ],
  providers: [ParqueoService]
})
export class ParqueoModule { }
