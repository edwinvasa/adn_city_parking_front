import { Component, OnInit } from '@angular/core';

import { Parqueo } from '../../shared/model/parqueo';
import { ParqueoService } from '../../shared/service/parqueo.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FacturaComponent } from '../factura/factura.component';

@Component({
  selector: 'app-listar-parqueo',
  templateUrl: './listar-parqueo.component.html',
  styleUrls: ['./listar-parqueo.component.css']
})
export class ListarParqueoComponent implements OnInit {

  dataSource: MatTableDataSource<Parqueo>;
  displayedColumns: string[] = ['id', 'tipo vehiculo', 'placa', 'fecha hora ingreso', 'fecha hora salida', 'valor', 'acciones'];


  constructor(protected parqueoService: ParqueoService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.parqueoService.consultar().subscribe(data => {
    this.dataSource = new MatTableDataSource(data);
    });

    this.parqueoService.getParqueoCambio().subscribe(data => {
      this.crearTabla(data);
    });

    this.parqueoService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000
      });
    });
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(FacturaComponent, {
      width: '500px',
      data: {idParqueo: id},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
    });

  }

  crearTabla(data: Parqueo[]){
    this.dataSource = new MatTableDataSource(data);
  }

}
