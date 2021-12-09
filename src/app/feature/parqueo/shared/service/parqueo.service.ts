import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Parqueo } from '../model/parqueo';
import { ParqueoDetalle } from '../model/parqueo-detalle';

@Injectable()
export class ParqueoService {

  private parqueoCambio: Subject<Parqueo[]> = new Subject<Parqueo[]>();
  private mensajeCambio: Subject<string> = new Subject<string>();

  constructor(protected http: HttpService) { }

  getParqueoCambio(){
    return this.parqueoCambio.asObservable();
  }

  setParqueoCambio(lista: Parqueo[]){
    this.parqueoCambio.next(lista);
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(msj: string){
    this.mensajeCambio.next(msj);
  }

  public consultar(){
    return this.http.doGet<Parqueo[]>(`${environment.endpoint}/parqueos`, this.http.optsName('Listar Parqueos'));
  }

  public consultarPorId(id: number) {
    return this.http.doGet<Parqueo[]>(`${environment.endpoint}/parqueos/${id}`, this.http.optsName('Consultar Parqueo Por Id'));
  }

  public guardar(parqueo: Parqueo) {
    return this.http.doPost<Parqueo, boolean>(`${environment.endpoint}/parqueos`, parqueo,
                                                this.http.optsName('crear parqueos'));
  }

  public actualizar(parqueo: Parqueo) {
    return this.http.doPut<Parqueo, boolean>(`${environment.endpoint}/parqueos/${parqueo.id}`, parqueo,
                                                this.http.optsName('actualizar parqueo'));
  }

  public actualizarSalida(parqueo: Parqueo) {
    return this.http.doPut<Parqueo, boolean>(`${environment.endpoint}/parqueos/salida/${parqueo.id}`, parqueo,
                                                this.http.optsName('actualizar parqueo'));
  }

  public consultarDetalle(idParqueo: number) {
    return this.http.doGet<ParqueoDetalle[]>(`${environment.endpoint}/parqueo_detalles/${idParqueo}`,
                                                 this.http.optsName('consultar detalle del parqueo'));
  }

}
