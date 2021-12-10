import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
//import { Parqueo } from '@parqueo/shared/model/parqueo';
import { ParqueoService } from '@parqueo/shared/service/parqueo.service';
import { of } from 'rxjs';

import { EditarParqueoComponent } from './editar-parqueo.component';

/*
const PARQUEO_REGISTRO = new Parqueo(null, 'PLA111', 'AUTOMOVIL', '2021-12-07 10:40:00', '', 0);
const PARQUEO_EDICION = new Parqueo(1, 'PLA111', 'AUTOMOVIL', '2021-12-07 10:40:00', '', 0);
const PARQUEO_SALIDA = new Parqueo(1, 'PLA111', 'AUTOMOVIL', '2021-12-07 10:40:00', '2021-12-07 11:40:00', 8000);
*/
describe('EditarParqueoComponent', () => {
  let component: EditarParqueoComponent;
  let fixture: ComponentFixture<EditarParqueoComponent>;
  let parqueoService: ParqueoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarParqueoComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        NoopAnimationsModule
      ],
      providers: [
        ParqueoService,
        HttpService,
        DatePipe
      ],
      schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

/*
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarParqueoComponent ]
    })
    .compileComponents();
  });*/

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarParqueoComponent);
    component = fixture.componentInstance;
    parqueoService = TestBed.inject(ParqueoService);

    spyOn(parqueoService, 'guardar').and.returnValue(
      of(true)
    );
    fixture.detectChanges();
  });

  it('Deberia crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('formulario es invalido cuando esta vacio', () => {
    expect(component.parqueoEdicionForm.valid).toBeFalsy();
  });

  it('Deberia validar la placa como invalido cuando esta vacio', () => {
    // arrange
    component.parqueoEdicionForm.controls.placa.setValue('');
    component.parqueoEdicionForm.controls.tipoVehiculo.setValue('AUTOMOVIL');
    component.parqueoEdicionForm.controls.fechaIngreso.setValue('2021-12-07 10:40:00');
    component.parqueoEdicionForm.controls.horasIngreso.setValue(10);
    component.parqueoEdicionForm.controls.minutosIngreso.setValue(40);

    // Act - Assert
    expect(component.parqueoEdicionForm.valid).toBeFalsy();
  });

  it('Deberia validar la placa como invalido cuando tiene una longitud mayor a la permitida', () => {
    // arrange
    component.parqueoEdicionForm.controls.placa.setValue('PLACATESTING123456');
    component.parqueoEdicionForm.controls.tipoVehiculo.setValue('AUTOMOVIL');
    component.parqueoEdicionForm.controls.fechaIngreso.setValue('2021-12-07 10:40:00');
    component.parqueoEdicionForm.controls.horasIngreso.setValue(10);
    component.parqueoEdicionForm.controls.minutosIngreso.setValue(40);

    // Act - Assert
    expect(component.parqueoEdicionForm.valid).toBeFalsy();
  });

  it('Deberia validar la fecha de ingreso como invalida cuando esta vacia', () => {
    // arrange
    component.parqueoEdicionForm.controls.fechaIngreso.setValue('');
    component.parqueoEdicionForm.controls.placa.setValue('PLA111');
    component.parqueoEdicionForm.controls.tipoVehiculo.setValue('AUTOMOVIL');
    component.parqueoEdicionForm.controls.horasIngreso.setValue(10);
    component.parqueoEdicionForm.controls.minutosIngreso.setValue(40);

    // Act - Assert
    expect(component.parqueoEdicionForm.valid).toBeFalsy();
  });

  it('Deberia validar la hora de ingreso como invalida cuando esta vacia', () => {
    // arrange
    component.parqueoEdicionForm.controls.horasIngreso.setValue('');
    component.parqueoEdicionForm.controls.placa.setValue('PLA111');
    component.parqueoEdicionForm.controls.tipoVehiculo.setValue('AUTOMOVIL');
    component.parqueoEdicionForm.controls.fechaIngreso.setValue('2021-12-07 10:40:00');
    component.parqueoEdicionForm.controls.minutosIngreso.setValue(40);

    // Act - Assert
    expect(component.parqueoEdicionForm.valid).toBeFalsy();
  });

  it('Deberia validar los minutos  de ingreso como invalida cuando estan vacios', () => {
    // arrange
    component.parqueoEdicionForm.controls.minutosIngreso.setValue('');
    component.parqueoEdicionForm.controls.placa.setValue('PLA111');
    component.parqueoEdicionForm.controls.tipoVehiculo.setValue('AUTOMOVIL');
    component.parqueoEdicionForm.controls.fechaIngreso.setValue('2021-12-07 10:40:00');
    component.parqueoEdicionForm.controls.horasIngreso.setValue(10);

    // Act - Assert
    expect(component.parqueoEdicionForm.valid).toBeFalsy();
  });

  it('Deberia validar el tipo de vehiculo como invalido cuando esta vacio', () => {
    // arrange
    component.parqueoEdicionForm.controls.placa.setValue('PLA111');
    component.parqueoEdicionForm.controls.tipoVehiculo.setValue('');
    component.parqueoEdicionForm.controls.fechaIngreso.setValue('2021-12-07 10:40:00');
    component.parqueoEdicionForm.controls.horasIngreso.setValue(10);
    component.parqueoEdicionForm.controls.minutosIngreso.setValue(40);

    // Act - Assert
    expect(component.parqueoEdicionForm.valid).toBeFalsy();
  });

  it('Deberia validar que el formulario este deligenciado por completo para el registro o edicion', () => {
    // arrange
    component.parqueoEdicionForm.controls.placa.setValue('PLA111');
    component.parqueoEdicionForm.controls.tipoVehiculo.setValue('AUTOMOVIL');
    component.parqueoEdicionForm.controls.fechaIngreso.setValue('2021-12-07 10:40:00');
    component.parqueoEdicionForm.controls.fechaSalida.setValue('2021-12-07 10:40:00');
    component.parqueoEdicionForm.controls.horasIngreso.setValue(10);
    component.parqueoEdicionForm.controls.horasSalida.setValue(11);
    component.parqueoEdicionForm.controls.minutosIngreso.setValue(40);
    component.parqueoEdicionForm.controls.minutosSalida.setValue(41);
    fixture.detectChanges();
    // Act - Assert
    expect(component.parqueoEdicionForm.valid).toBeTrue();
  });

  it('Deberia validar que el formulario este deligenciado por completo para la salida', () => {
    // arrange
    component.id = 1;
    component.edicion = true;
    component.parqueoEdicionForm.controls.placa.setValue('PLA111');
    component.parqueoEdicionForm.controls.tipoVehiculo.setValue('AUTOMOVIL');
    component.parqueoEdicionForm.controls.fechaIngreso.setValue('2021-12-07 10:40:00');
    component.parqueoEdicionForm.controls.horasIngreso.setValue(10);
    component.parqueoEdicionForm.controls.minutosIngreso.setValue(40);

    // Act - Assert
    expect(component.parqueoEdicionForm.valid).toBeTrue();
  });

  it('deberia registrar el parqueo correctamente', () => {
    // arrange
    expect(component.parqueoEdicionForm.valid).toBeFalsy();
    component.parqueoEdicionForm.controls.placa.setValue('PLA111');
    component.parqueoEdicionForm.controls.tipoVehiculo.setValue('AUTOMOVIL');
    component.parqueoEdicionForm.controls.fechaIngreso.setValue('2021-12-07 10:40:00');
    component.parqueoEdicionForm.controls.horasIngreso.setValue(10);
    component.parqueoEdicionForm.controls.minutosIngreso.setValue(40);

    expect(component.parqueoEdicionForm.valid).toBeTruthy();

    component.operar();

    // Aca validamos el resultado esperado al enviar la petición
    // TODO adicionar expect
  });

});
