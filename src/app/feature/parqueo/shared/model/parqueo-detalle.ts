export class ParqueoDetalle {
  id: number;
  parqueoId: number;
  fechaHoraInicio: string;
  fechaHoraFin: string;
  valor: number;
  tarifaId: number;

  constructor(id: number, parqueoId: number, fechaHoraInicio: string, fechaHoraFin: string, valor: number, tarifaId: number){
    this.id = id;
    this.parqueoId = parqueoId;
    this.fechaHoraInicio = fechaHoraInicio;
    this.fechaHoraFin = fechaHoraFin;
    this.valor = valor;
    this.tarifaId = tarifaId;
  }
}
