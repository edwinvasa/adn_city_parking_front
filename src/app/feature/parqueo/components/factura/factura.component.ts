import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ParqueoDetalle } from '@parqueo/shared/model/parqueo-detalle';
import { ParqueoService } from '@parqueo/shared/service/parqueo.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  idParqueo: number;
}

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {

  dataSourceDetalle: MatTableDataSource<ParqueoDetalle>;

  displayedColumns: string[] = ['fecha hora inicio', 'fecha hora fin', 'valor'];


  constructor(protected parqueoService: ParqueoService,
              public dialogRef: MatDialogRef<FacturaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,) { }

  ngOnInit(): void {
    this.parqueoService.consultarDetalle(this.data.idParqueo).subscribe(dataDetalle => {
      this.dataSourceDetalle = new MatTableDataSource(dataDetalle);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
