import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ParqueoService } from './parqueo.service';
import { environment } from 'src/environments/environment';
import { HttpService } from '@core/services/http.service';
import { Parqueo } from '../model/parqueo';
import { HttpResponse } from '@angular/common/http';
import { ParqueoDetalle } from '../model/parqueo-detalle';


const ID_PARQUEO = 1;
const RESPUESTA_CREACION_ACTUALIZACION_PARQUEO = true;
const DUMMY_PARQUEO_POR_ID: Parqueo[] = [new Parqueo(1, 'PLA111', 'AUTOMOVIL', '2021-12-07 10:40:00', '', 0)];
const DUMMY_PARQUEO_SALIDA: Parqueo = new Parqueo(1, 'PLA111', 'AUTOMOVIL', '2021-12-07 10:40:00', '2021-12-07 11:40:00', 0);
const DUMMY_PARQUEOS: Parqueo[] = [new Parqueo(1, 'PLA111', 'AUTOMOVIL', '2021-12-07 10:40:00', '', 0),
                                  new Parqueo(2, 'PLA222', 'MOTOCICLETA', '2021-12-08 13:17:00', '', 0)];

const DUMMY_PARQUEO_DETALLE: ParqueoDetalle[] = [new ParqueoDetalle(1, 1, '2021-12-07 10:40:00', '2021-12-07 23:59:00', 20000, 1),
                                                new ParqueoDetalle(2, 1, '2021-12-08 00:00:00', '2021-12-08 13:17:00', 30000, 1)];


describe('ParqueoService', () => {
  let service: ParqueoService;
  let httpMock: HttpTestingController;
  const apiEndpointListarParqueos = `${environment.endpoint}/parqueos`;
  const apiEndpointConsultarParqueoPorId = `${environment.endpoint}/parqueos/${ID_PARQUEO}`;
  const apiEndpointConsultarDetalleParqueo = `${environment.endpoint}/parqueo_detalles/${ID_PARQUEO}`;
  const apiEndpointCrearParqueo = `${environment.endpoint}/parqueos`;
  const apiEndpointActualizarParqueo = `${environment.endpoint}/parqueos/${ID_PARQUEO}`;
  const apiEndpointRegistrarSalidaParqueo = `${environment.endpoint}/parqueos/salida/${ID_PARQUEO}`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ParqueoService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(ParqueoService);
  });

  it('Deberia crear el servicio correctamente', () => {
    const parqueoService: ParqueoService = TestBed.inject(ParqueoService);
    expect(parqueoService).toBeTruthy();
  });

  it('deberia listar parqueos', (done: DoneFn) => {
    // act
    service.consultar().subscribe(parqueos => {
      expect(parqueos.length).toBe(2);
      expect(parqueos).toEqual(DUMMY_PARQUEOS);
      done();
    });

    const req = httpMock.expectOne(apiEndpointListarParqueos);
    expect(req.request.method).toBe('GET');
    req.flush(DUMMY_PARQUEOS);
  });

  it('deberia crear un parqueo', () => {
    service.guardar(DUMMY_PARQUEOS[0]).subscribe((respuesta) => {
      expect(respuesta).toEqual(RESPUESTA_CREACION_ACTUALIZACION_PARQUEO);
    });
    const req = httpMock.expectOne(apiEndpointCrearParqueo);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<boolean>({ body: RESPUESTA_CREACION_ACTUALIZACION_PARQUEO }));
  });

  it('Deberia consultar un parqueo por su id', (done: DoneFn) => {
    // act
    service.consultarPorId(ID_PARQUEO).subscribe((response) => {
      // assert

      expect(response).toEqual(DUMMY_PARQUEO_POR_ID);
      done();
    });
    const request = httpMock.expectOne(apiEndpointConsultarParqueoPorId);
    expect(request.request.method).toBe('GET');
    request.flush(DUMMY_PARQUEO_POR_ID);
  });

  it('Deberia consultar un detalle de un parqueo por su id', (done: DoneFn) => {
    // act
    service.consultarDetalle(ID_PARQUEO).subscribe((response) => {
      // assert

      expect(response).toEqual(DUMMY_PARQUEO_DETALLE);
      done();
    });
    const request = httpMock.expectOne(apiEndpointConsultarDetalleParqueo);
    expect(request.request.method).toBe('GET');
    request.flush(DUMMY_PARQUEO_DETALLE);
  });

  it('deberia actualizar un parqueo', () => {
    service.actualizar(DUMMY_PARQUEOS[0]).subscribe((respuesta) => {
      expect(respuesta).toEqual(RESPUESTA_CREACION_ACTUALIZACION_PARQUEO);
    });
    const req = httpMock.expectOne(apiEndpointActualizarParqueo);
    expect(req.request.method).toBe('PUT');
    req.event(new HttpResponse<boolean>({ body: RESPUESTA_CREACION_ACTUALIZACION_PARQUEO }));
  });

  it('deberia registrar la salida de un parqueo', () => {
    service.actualizarSalida(DUMMY_PARQUEO_SALIDA).subscribe((respuesta) => {
      expect(respuesta).toEqual(RESPUESTA_CREACION_ACTUALIZACION_PARQUEO);
    });
    const req = httpMock.expectOne(apiEndpointRegistrarSalidaParqueo);
    expect(req.request.method).toBe('PUT');
    req.event(new HttpResponse<boolean>({ body: RESPUESTA_CREACION_ACTUALIZACION_PARQUEO }));
  });

});
