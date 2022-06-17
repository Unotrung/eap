import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-payment-plan-fast',
  templateUrl: './payment-plan-fast.component.html',
  styleUrls: ['./payment-plan-fast.component.scss'],
})
export class PaymentPlanFastComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'endDate', 'nameProvider', 'price','status', 'action','detail'];
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
  detail: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, endDate: '2020/12/12', nameProvider: 'Hydrogen', price: 1.0079, status: 'H',action: 'Thanh toán', detail: 'yyy'},
  {id: 2, endDate: '2020/12/12', nameProvider: 'Hydrogen', price: 1.0079, status: 'H',action: 'Thanh toán', detail: 'yyy'},
  {id: 3, endDate: '2020/12/12', nameProvider: 'Hydrogen', price: 1.0079, status: 'H',action: 'Thanh toán', detail: 'yyy'},
  {id: 4, endDate: '2020/12/12', nameProvider: 'Hydrogen', price: 1.0079, status: 'H',action: 'Thanh toán', detail: 'yyy'},
  {id: 5, endDate: '2020/12/12', nameProvider: 'Hydrogen', price: 1.0079, status: 'H',action: 'Thanh toán', detail: 'yyy'},
  {id: 6, endDate: '2020/12/12', nameProvider: 'Hydrogen', price: 1.0079, status: 'H',action: 'Thanh toán', detail: 'yyy'},
  {id: 7, endDate: '2020/12/12', nameProvider: 'Hydrogen', price: 1.0079, status: 'H',action: 'Thanh toán', detail: 'yyy'},
  {id: 8, endDate: '2020/12/12', nameProvider: 'Hydrogen', price: 1.0079, status: 'H',action: 'Thanh toán', detail: 'yyy'},
  {id: 9, endDate: '2020/12/12', nameProvider: 'Hydrogen', price: 1.0079, status: 'H',action: 'Thanh toán', detail: 'yyy'},
  {id: 10, endDate: '2020/12/12', nameProvider: 'Hydrogen', price: 1.0079, status: 'H',action: 'Thanh toán', detail: 'yyy'},
  {id: 11, endDate: '2020/12/12', nameProvider: 'Hydrogen', price: 1.0079, status: 'H',action: 'Thanh toán', detail: 'yyy'},
];

