import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-repayment-fe-credit',
  templateUrl: './repayment-fe-credit.component.html',
  styleUrls: ['./repayment-fe-credit.component.scss'],
})
export class RepaymentFeCreditComponent implements  AfterViewInit {

  displayedColumns: string[] = ['id', 'endDate', 'nameProvider', 'price','status', 'action','columnName'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

@ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface PeriodicElement {
  id: number;
  endDate: string;
  nameProvider: string;
  price: number;
  status: string;
  action: string;
  columnName: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, endDate: '2022/11/11', nameProvider: 'Hydrogen', price: 1.0079, status: 'H',action: 'View', columnName: 'yyy'},
  {id: 2, endDate: '2022/12/12', nameProvider: 'Hydrogen', price: 1.0079, status: 'H',action: 'View', columnName: 'yyy'},
  {id: 3, endDate: '2022/12/12', nameProvider: 'Hydrogen', price: 1.0079, status: 'H',action: 'View', columnName: 'yyy'},
  {id: 4, endDate: '2022/12/12', nameProvider: 'Hydrogen', price: 1.0079, status: 'H',action: 'View', columnName: 'yyy'},
  {id: 5, endDate: '2022/12/12', nameProvider: 'Hydrogen', price: 1.0079, status: 'H',action: 'View', columnName: 'yyy'},
  {id: 6, endDate: '2022/12/12', nameProvider: 'Hydrogen', price: 1.0079, status: 'H',action: 'View', columnName: 'yyy'},
  {id: 7, endDate: '2022/12/12', nameProvider: 'Hydrogen', price: 1.0079, status: 'H',action: 'View', columnName: 'yyy'},
  {id: 8, endDate: '2022/12/12', nameProvider: 'Hydrogen', price: 1.0079, status: 'H',action: 'View', columnName: 'yyy'},
  {id: 9, endDate: '2022/12/12', nameProvider: 'Hydrogen', price: 1.0079, status: 'H',action: 'View', columnName: 'yyy'},
  {id: 10, endDate: '2022/12/12', nameProvider: 'Hydrogen', price: 1.0079, status: 'H',action: 'View', columnName: 'yyy'},
  {id: 11, endDate: '2022/12/12', nameProvider: 'Hydrogen', price: 1.0079, status: 'H',action: 'View', columnName: 'yyy'},
];


