import { Component, OnInit } from '@angular/core';
import {SidebarService} from "../../_service/side-bar/sidebar.service";
import {TranslateService} from "@ngx-translate/core";
import set = Reflect.set;

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
  id:number = 0;
  isShow: boolean = false;
  itemChooseMore = this.translateService.instant('transaction.5Record');
  listItemValue = [5,100,200, "All"];
  listItemText = [this.translateService.instant('transaction.5Record'),
    this.translateService.instant('transaction.100Record'),
    this.translateService.instant('transaction.200Record'),
    this.translateService.instant('transaction.allRecord')];
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
  constructor(private sidebarService: SidebarService,
              private translateService: TranslateService) { }

  ngOnInit() {
    setTimeout(()=>{
      this.sidebarService.itemSelectObject$.next('');
    },0)
  }

  previousPage() {

  }

  nextPage() {

  }

  sort(name: string) {

  }

  openDialogDetail(_id: any) {
    
  }

  pinNote(i: number) {
    if (this.id === 0) {
      this.id = i;
      this.isShowStar = true;
    } else if (this.id === i) {
      this.id = 0;
      this.isShowStar = false;
    } else if (this.id !== i) {
      this.id = i;
      this.isShowStar = true;
    }
  }
  // onSwipe(evt) {
  //   const x = Math.abs(evt.deltaX) > 40 ? (evt.deltaX > 0 ? 'right' : 'left'):'';
  //   const y = Math.abs(evt.deltaY) > 40 ? (evt.deltaY > 0 ? 'down' : 'up') : '';
  // }
  isShowStar: boolean = false;

  getManyRecord(pageSize: number, e:any) {
    e.stopPropagation();
    // this.pageSize = pageSize;
    // this.getListTransaction();
    let itemChoose = '';
    let listItemText = ["25 dòng 1 trang","100 dòng 1 trang","200 dòng 1 trang","Tất cả"];
    this.listItemValue.forEach(function (value, index) {
      if (pageSize == value){
        itemChoose = listItemText[index]
      }
    })
    this.itemChooseMore = itemChoose;
    this.isShow = false;
  }
}
