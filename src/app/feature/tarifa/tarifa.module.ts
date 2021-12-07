import { NgModule } from '@angular/core';

import { TarifaRoutingModule } from './tarifa-routing.module';
import { TarifaComponent } from './components/tarifa/tarifa.component';
import { ListarTarifaComponent } from './components/listar-tarifa/listar-tarifa.component';
import { SharedModule } from '@shared/shared.module';
import { TarifaService } from './shared/service/tarifa.service';


@NgModule({
  declarations: [
    TarifaComponent,
    ListarTarifaComponent
  ],
  imports: [
    SharedModule,
    TarifaRoutingModule
  ],
  providers: [TarifaService]
})
export class TarifaModule { }
