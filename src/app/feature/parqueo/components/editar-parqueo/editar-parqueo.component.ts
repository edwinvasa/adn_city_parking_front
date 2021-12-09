import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ParqueoService } from '@parqueo/shared/service/parqueo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ErrorPeticion } from '@core/modelo/error-peticion';
import { Parqueo } from '@parqueo/shared/model/parqueo';
import { DatePipe } from '@angular/common'

const LONGITUD_MINIMA_PERMITIDA_TEXTO = 5;
const LONGITUD_MAXIMA_PERMITIDA_TEXTO = 8;
const LONGITUD_MINIMA_PERMITIDA_TIPO_VEHICULO = 8;
const LONGITUD_MAXIMA_PERMITIDA_TIPO_VEHICULO = 11;
const LONGITUD_PERMITIDA_FECHAS = 10;
const LONGITUD_PERMITIDA_FECHA = 19;
const ITEM = 0;
const REGISTRAR_PARQUEO = 'Registrar Parqueo';
const EDITAR_PARQUEO = 'Editar Parqueo';
const FORMATO_FECHA_HORA = 'yyyy-MM-dd HH:mm:ss';
const RUTA_LISTAR_PARQUEOS = '/parqueo/listar';

const SE_MODIFICO = 'SE MODIFICO';
const REGISTRO_CREADO = 'REGISTRO CREADO';
const SE_REGISTRO_LA_SALIDA_VALOR_DEL_PARQUEO = 'SE REGISTRO LA SALIDA, VALOR DEL PARQUEO: $';

@Component({
  selector: 'app-editar-parqueo',
  templateUrl: './editar-parqueo.component.html',
  styleUrls: ['./editar-parqueo.component.css']
})
export class EditarParqueoComponent implements OnInit {

  HORA_MINIMA:number = 0;
  MINUTOS_MINIMOS:number = 0;
  HORA_MAXIMA:number = 23;
  MINUTOS_MAXIMOS:number = 59;

  tituloCard: string = REGISTRAR_PARQUEO;

  id: number = 0;
  edicion: boolean = false;
  valorParqueo = 0;
  parqueoEdicionForm: FormGroup;
  fechaMaxima: Date = new Date();

  fechaCompletaIngreso: Date = new Date();
  fechaIngreso: Date;
  horasIngreso: number;
  minutosIngreso: number;

  fechaCompletaSalida: Date = null;
  fechaSalida: Date = null;
  horasSalida: number;
  minutosSalida: number;

  parqueo: Parqueo;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private parqueoService: ParqueoService,
    public datepipe: DatePipe
  ) {
  }

  ngOnInit(): void {
    this.construirFormularioParqueo();

    this.route.params.subscribe(data => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.iniciarFormulario();

    });
  }

  iniciarFormulario() {
    if (this.edicion) {
      this.tituloCard = EDITAR_PARQUEO;
      this.parqueoService.consultarPorId(this.id).subscribe(data => {

        if (data[ITEM].fechaHoraIngreso != null) {
          this.fechaCompletaIngreso = new Date(data[ITEM].fechaHoraIngreso);
          this.fechaIngreso = this.fechaCompletaIngreso;
          this.horasIngreso = this.fechaCompletaIngreso.getHours();
          this.minutosIngreso = this.fechaCompletaIngreso.getMinutes();
        }

        if (data[ITEM].fechaHoraSalida != null) {
          this.fechaCompletaSalida = new Date(data[ITEM].fechaHoraSalida);
          this.fechaSalida = this.fechaCompletaSalida;
          this.horasSalida = this.fechaCompletaSalida.getHours();
          this.minutosSalida = this.fechaCompletaSalida.getMinutes();
        }

        this.parqueoEdicionForm = new FormGroup({
          id: new FormControl(data[ITEM].id),
          placa: new FormControl(data[ITEM].placa),
          tipoVehiculo: new FormControl(data[ITEM].tipoVehiculo),

          fechaIngreso: new FormControl(this.fechaIngreso),
          horasIngreso: new FormControl(this.horasIngreso),
          minutosIngreso: new FormControl(this.minutosIngreso),

          fechaSalida: new FormControl(this.fechaSalida),
          horasSalida: new FormControl(this.horasSalida),
          minutosSalida: new FormControl(this.minutosSalida),
        });
      });
    } else {
      this.tituloCard = REGISTRAR_PARQUEO;
    }
  }

  operar() {
    this.fechaCompletaIngreso = generarFechaHoraIngreso(this.parqueoEdicionForm);
    let fechaHoraIngreso = this.datepipe.transform(this.fechaCompletaIngreso, FORMATO_FECHA_HORA);

    if(this.edicion){
      this.fechaCompletaSalida = generarFechaHoraSalida(this.fechaCompletaSalida, this.parqueoEdicionForm);
    }

    let fechaHoraSalida = this.datepipe.transform(this.fechaCompletaSalida, FORMATO_FECHA_HORA);

    this.parqueo = crearObjetoParqueo(this.id, this.parqueoEdicionForm, fechaHoraIngreso, fechaHoraSalida);

    if (this.id == null) {
      registrarNuevoIngreso(this.parqueoService, this.parqueo, this.router)
    }

    if (this.id != null && this.fechaCompletaSalida == null) {
      modificarParqueo(this.parqueoService, this.parqueo, this.router);
    }

    if (this.id != null && this.fechaCompletaSalida != null) {
      registrarSalidaParqueo(this.parqueoService, this.parqueo, this.router)
    }
  }

  construirFormularioParqueo() {
    this.parqueoEdicionForm = new FormGroup({
      id: new FormControl(0, [Validators.required]),

      placa: new FormControl('', [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO),
      Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TEXTO)]),

      tipoVehiculo: new FormControl('', [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TIPO_VEHICULO),
      Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TIPO_VEHICULO)]),

      fechaIngreso: new FormControl('', [Validators.required, Validators.minLength(LONGITUD_PERMITIDA_FECHAS),
      Validators.maxLength(LONGITUD_PERMITIDA_FECHAS)]),

      horasIngreso: new FormControl(this.fechaCompletaIngreso.getHours(), [Validators.required, Validators.min(this.HORA_MINIMA),
      Validators.max(this.HORA_MAXIMA)]),

      minutosIngreso: new FormControl(this.fechaCompletaIngreso.getMinutes(), [Validators.required, Validators.min(this.MINUTOS_MINIMOS),
      Validators.max(this.MINUTOS_MAXIMOS)]),

      fechaSalida: new FormControl('', [Validators.minLength(LONGITUD_PERMITIDA_FECHA),
      Validators.maxLength(LONGITUD_PERMITIDA_FECHA)]),

      horasSalida: new FormControl('', [Validators.min(this.HORA_MINIMA),
      Validators.max(this.HORA_MAXIMA)]),

      minutosSalida: new FormControl('', [Validators.min(this.MINUTOS_MINIMOS),
      Validators.max(this.MINUTOS_MAXIMOS)])
    });
  }

}

function crearObjetoParqueo(id: number, parqueoEdicionForm: FormGroup, fechaHoraIngreso: string, fechaHoraSalida: string): Parqueo {
  return new Parqueo(
    id,
    parqueoEdicionForm.value.placa,
    parqueoEdicionForm.value.tipoVehiculo,
    fechaHoraIngreso,
    fechaHoraSalida,
    parqueoEdicionForm.value.valor);
}

function generarFechaHoraIngreso(parqueoEdicionForm: FormGroup): Date {
  if (parqueoEdicionForm.value.fechaIngreso != null) {
    let fechaCompletaIngreso = new Date(parqueoEdicionForm.value.fechaIngreso);
    fechaCompletaIngreso.setHours(parqueoEdicionForm.value.horasIngreso);
    fechaCompletaIngreso.setMinutes(parqueoEdicionForm.value.minutosIngreso);
    return fechaCompletaIngreso;
  }
}

function generarFechaHoraSalida( fechaCompletaSalida: Date, parqueoEdicionForm: FormGroup): Date {
  if (parqueoEdicionForm.value.fechaSalida != null) {
    fechaCompletaSalida = new Date(parqueoEdicionForm.value.fechaSalida);
    fechaCompletaSalida.setHours(parqueoEdicionForm.value.horasSalida);
    fechaCompletaSalida.setMinutes(parqueoEdicionForm.value.minutosSalida);
    return fechaCompletaSalida;
  }
}
function modificarParqueo(parqueoService: ParqueoService, parqueo: Parqueo, router: Router) {
  parqueoService.actualizar(parqueo).pipe(switchMap(() => {
    return parqueoService.consultar();
  })).subscribe({
    next: data => {
      parqueoService.setParqueoCambio(data);
    },
    error: (err: ErrorPeticion) => {
      parqueoService.setMensajeCambio(err.error.mensaje);
    },
    complete: () => {
      parqueoService.setMensajeCambio(SE_MODIFICO);
      router.navigate([RUTA_LISTAR_PARQUEOS]);
    }
  });
}

function registrarSalidaParqueo(parqueoService: ParqueoService, parqueo: Parqueo, router: Router) {
  parqueoService.actualizarSalida(parqueo).pipe(switchMap(() => {
    return parqueoService.consultar();
  })).subscribe({
    next: data => {
      parqueoService.setParqueoCambio(data);
    },
    error: (err: ErrorPeticion) => {
      parqueoService.setMensajeCambio(err.error.mensaje);
    },
    complete: () => {
      parqueoService.consultarPorId(parqueo.id).subscribe(data => {
        parqueoService.setMensajeCambio(SE_REGISTRO_LA_SALIDA_VALOR_DEL_PARQUEO + data[ITEM].valor);
        router.navigate([RUTA_LISTAR_PARQUEOS]);
      });
    },
  });
}

function registrarNuevoIngreso(parqueoService: ParqueoService, parqueo: Parqueo, router: Router) {
  parqueoService.guardar(parqueo).pipe(switchMap(() => {
    return parqueoService.consultar();
  })).subscribe({
    next: data => {
      parqueoService.setParqueoCambio(data);
    },
    error: (err: ErrorPeticion) => {
      parqueoService.setMensajeCambio(err.error.mensaje);
    },
    complete: () => {
      parqueoService.setMensajeCambio(REGISTRO_CREADO);
      router.navigate([RUTA_LISTAR_PARQUEOS]);
    }
  });
}

