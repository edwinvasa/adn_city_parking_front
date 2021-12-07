import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ErrorPeticion } from '@core/modelo/error-peticion';
import { ParqueoService } from '@parqueo/shared/service/parqueo.service';

const LONGITUD_MINIMA_PERMITIDA_TEXTO = 5;
const LONGITUD_MAXIMA_PERMITIDA_TEXTO = 8;
const LONGITUD_MINIMA_PERMITIDA_TIPO_VEHICULO = 8;
const LONGITUD_MAXIMA_PERMITIDA_TIPO_VEHICULO = 11;
const LONGITUD_PERMITIDA_FECHA = 19;

@Component({
  selector: 'app-crear-parqueo',
  templateUrl: './crear-parqueo.component.html',
  styleUrls: ['./crear-parqueo.component.css']
})
export class CrearParqueoComponent implements OnInit {

  parqueoForm: FormGroup;

  constructor(protected parqueoService: ParqueoService) { }

  ngOnInit(): void {
    this.construirFormularioParqueo();
  }

  crear(){
    this.parqueoService.guardar(this.parqueoForm.value).subscribe({
      error: (err: ErrorPeticion) => {
        console.log(err.error.mensaje);
      },
      complete: () => {
       console.log('parqueo creado correctamente');
      },
    });
  }


  construirFormularioParqueo() {
    this.parqueoForm = new FormGroup({
      placa: new FormControl('', [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO),
                                                       Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TEXTO)]),
      tipoVehiculo: new FormControl('', [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TIPO_VEHICULO),
                                                        Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TIPO_VEHICULO)]),
      fechaHoraIngreso: new FormControl('', [Validators.required, Validators.minLength(LONGITUD_PERMITIDA_FECHA),
                                                                  Validators.maxLength(LONGITUD_PERMITIDA_FECHA)])
    });
  }

}
