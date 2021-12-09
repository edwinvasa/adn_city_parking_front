import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

import { Parqueo } from '../../shared/model/parqueo';
import { ParqueoService } from '../../shared/service/parqueo.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { FacturaComponent } from '../factura/factura.component';

const AVISO = 'AVISO';

@Component({
  selector: 'app-listar-parqueo',
  templateUrl: './listar-parqueo.component.html',
  styleUrls: ['./listar-parqueo.component.css']
})
export class ListarParqueoComponent implements OnInit {

  dataSource: MatTableDataSource<Parqueo>;
  displayedColumns: string[] = ['id', 'tipo vehiculo', 'placa', 'fecha hora ingreso', 'fecha hora salida', 'valor', 'acciones'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(protected parqueoService: ParqueoService,
              protected dialog: MatDialog,
              protected snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.parqueoService.consultar().subscribe(data => {
      this.crearTabla(data);
    });

    this.parqueoService.getParqueoCambio().subscribe(data => {
      this.crearTabla(data);
    });

    this.parqueoService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, AVISO, {
        duration: 4500
      });
    });
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(FacturaComponent, {
      width: '500px',
      data: {idParqueo: id},
    });
    dialogRef.afterClosed().subscribe();
  }

  crearTabla(data: Parqueo[]){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  filtrar(e : any){
    this.dataSource.filter = e.target.value.trim().toLowerCase();
  }

}
