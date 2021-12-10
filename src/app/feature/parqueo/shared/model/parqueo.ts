export class Parqueo {

    id: number;
    placa: string;
    tipoVehiculo: string;
    fechaHoraIngreso: string;
    fechaHoraSalida: string;
    valor: number;

    constructor(id: number, placa: string, tipoVehiculo: string, fechaHoraIngreso: string, fechaHoraSalida: string, valor: number){
        this.id = id;
        this.placa = placa;
        this.tipoVehiculo = tipoVehiculo;
        this.fechaHoraIngreso = fechaHoraIngreso;
        this.fechaHoraSalida = fechaHoraSalida;
        this.valor = valor;
    }
}
