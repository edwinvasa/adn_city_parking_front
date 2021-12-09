import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { of } from 'rxjs';
import { Parqueo } from '@parqueo/shared/model/parqueo';
import { ParqueoService } from '@parqueo/shared/service/parqueo.service';

import { ListarParqueoComponent } from './listar-parqueo.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

describe('ListarParqueoComponent', () => {
  let component: ListarParqueoComponent;
  let fixture: ComponentFixture<ListarParqueoComponent>;
  let parqueoService: ParqueoService;
  const listaParqueos: Parqueo[] = [new Parqueo(1, 'PLA111', 'AUTOMOVIL', '2021-12-07 10:40:00', '', 0),
                                    new Parqueo(2, 'PLA222', 'MOTOCICLETA', '2021-12-08 13:17:00', '', 0)];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarParqueoComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [ParqueoService,
        HttpService,
        { provide: MatSnackBar, useValue: [] },
        { provide: MatDialog, useValue: {} }
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarParqueoComponent);
    component = fixture.componentInstance;
    parqueoService = TestBed.inject(ParqueoService);
    spyOn(parqueoService, 'consultar').and.returnValue(
      of(listaParqueos)
      );
    fixture.detectChanges();
  });

  it('Deberia crear el componente correctanente', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia haber cargado datos a la tabla de parqueos', () => {
    expect(component.dataSource.filteredData.length).toBe(listaParqueos.length);
  });
});
