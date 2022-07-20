import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-mobile',
  templateUrl: './notification-mobile.component.html',
  styleUrls: ['./notification-mobile.component.scss'],
})
export class NotificationMobileComponent implements OnInit {
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
  constructor() { }

  ngOnInit() {}

}
