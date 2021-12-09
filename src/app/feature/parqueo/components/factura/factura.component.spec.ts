import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { of } from 'rxjs';
import { ParqueoDetalle } from '@parqueo/shared/model/parqueo-detalle';
import { ParqueoService } from '@parqueo/shared/service/parqueo.service';

import { FacturaComponent } from './factura.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('FacturaComponent', () => {
  let component: FacturaComponent;
  let fixture: ComponentFixture<FacturaComponent>;
  let parqueoService: ParqueoService;
  const listaParqueoDetalle: ParqueoDetalle[] = [new ParqueoDetalle(1, 1, '2021-12-07 10:40:00', '2021-12-07 23:59:00', 20000, 1),
                                                new ParqueoDetalle(2, 1, '2021-12-08 00:00:00', '2021-12-08 13:17:00', 30000, 1)]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturaComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [ParqueoService,
                  HttpService,
                  {provide: MatDialogRef, useValue: {}},
                  {provide: MAT_DIALOG_DATA, useValue: {}}],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturaComponent);
    component = fixture.componentInstance;
    parqueoService = TestBed.inject(ParqueoService);
    spyOn(parqueoService, 'consultarDetalle').and.returnValue(
      of(listaParqueoDetalle)
    );
    fixture.detectChanges();
  });

  it('Deberia crear el componente correctanente', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia haber cargado datos a la tabla de parqueos', () => {
    expect(component.dataSourceDetalle.filteredData.length).toBe(listaParqueoDetalle.length);
  });

});
