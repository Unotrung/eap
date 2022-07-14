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
      type: "THANH TOÁN",
      time: "10:45 AM",
      isPin: false,
      isCheck: false
    },
    {
      id: 2,
      content: "Mã thanh toán #1243555 đã đến hạn thanh toán",
      type: "GIAO DỊCH",
      time: "10:45 AM",
      isPin: false,
      isCheck: false
    },
    {
      id: 3,
      content: "Mã thanh toán #1243555 đã đến hạn thanh toán",
      type: "MÃ GIẢM GIÁ",
      time: "10:45 AM",
      isPin: false,
      isCheck: false
    },
    {
      id: 4,
      content: "Mã thanh toán #1243555 đã đến hạn thanh toán",
      type: "TIN TỨC",
      time: "10:45 AM",
      isPin: false,
      isCheck: false
    },
    {
      id: 5,
      content: "Mã thanh toán #1243555 đã đến hạn thanh toán",
      type: "KHÁC",
      time: "10:45 AM",
      isPin: false,
      isCheck: false
    },
    {
      id: 6,
      content: "Mã thanh toán #1243555 đã đến hạn thanh toán",
      type: "THANH TOÁN",
      time: "10:45 AM",
      isPin: false,
      isCheck: false
    },
    {
      id: 7,
      content: "Mã thanh toán #1243555 đã đến hạn thanh toán",
      type: "GIAO DỊCH",
      time: "10:45 AM",
      isPin: false,
      isCheck: false
    },
    {
      id: 8,
      content: "Mã thanh toán #1243555 đã đến hạn thanh toán",
      type: "MÃ GIẢM GIÁ",
      time: "10:45 AM",
      isPin: false,
      isCheck: false
    }
  ]

  errorMgs: string = '';
  constructor(private sidebarService: SidebarService,
              private translateService: TranslateService) { }

  ngOnInit() {
    setTimeout(()=>{
      this.sidebarService.itemSelectObject$.next('');
      this.sidebarService.showSidebar(true);
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

  pinNote(note: any) {
    if (note.isPin) {
      this.updateNote(false,note);
    } else {
      this.updateNote(true,note);
    }
  }
  updateNote(isPin:boolean, note: any) {
    let newNote = {...note,isPin: isPin};
    let newListNote = [...this.listNote];
    newListNote.splice(note.id-1,1,newNote);
    this.listNote = [...newListNote];
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

  checkTick(note: any) {
    if (note.isCheck) {
      this.updateCheck(false,note);
    } else {
      this.updateCheck(true,note);
    }
  }

  updateCheck(isCheck:boolean, note: any) {
    let newNote = {...note,isCheck: isCheck};
    let newListNote = [...this.listNote];
    newListNote.splice(note.id-1,1,newNote);
    this.listNote = [...newListNote];
  }
}
