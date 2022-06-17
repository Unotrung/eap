import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-table',
  templateUrl: './notification-table.component.html',
  styleUrls: ['./notification-table.component.scss'],
})
export class NotificationTableComponent implements OnInit {
  page: number = 1;
  totalPage: number = 5;
  isCheckSort: boolean = true;
  sortByField: string = 'time';
  loading: boolean =  false;
  isPin = false;
  id:number;
  listNote = [
    {
      id: 1,
      content: "Mã thanh toán #1243555 đã đến hạn thanh toán",
      type: "Thanh toán",
      time: "10:45 AM"
    },
    {
      id: 2,
      content: "LUCY được nhận voucher chạy grab - 20/2/2022",
      type: "Giao dịch",
      time: "10:45 AM"
    },
    {
      id: 3,
      content: "LUCY được nhận voucher chạy grab - 20/2/2022",
      type: "Mã giảm giá",
      time: "10:45 AM"
    },
    {
      id: 4,
      content: "LUCY được nhận voucher chạy grab - 20/2/2022",
      type: "Tin tức",
      time: "10:45 AM"
    },
    {
      id: 5,
      content: "LUCY được nhận voucher chạy grab - 20/2/2022",
      type: "khác",
      time: "10:45 AM"
    }
  ]
  errorMgs: string = '';
  constructor() { }

  ngOnInit() {}

  previousPage() {

  }

  nextPage() {

  }

  sort(name: string) {

  }

  openDialogDetail(_id: any) {
    
  }

  pinNote(i: number) {
    this.id = i;
    this.isPin = !this.isPin;
  }
  // onSwipe(evt) {
  //   const x = Math.abs(evt.deltaX) > 40 ? (evt.deltaX > 0 ? 'right' : 'left'):'';
  //   const y = Math.abs(evt.deltaY) > 40 ? (evt.deltaY > 0 ? 'down' : 'up') : '';
  // }
}
