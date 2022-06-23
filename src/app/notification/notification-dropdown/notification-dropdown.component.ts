import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-notification-dropdown',
  templateUrl: './notification-dropdown.component.html',
  styleUrls: ['./notification-dropdown.component.scss'],
})
export class NotificationDropdownComponent implements OnInit {
  listNote = [
    {
      id: 1,
      content: "Mã thanh toán #1243555 đã đến hạn thanh toán",
      type: "Thanh toán",
      time: "10:45 AM"
    },
    {
      id: 2,
      content: "Mã thanh toán #1243555 đã đến hạn thanh toán",
      type: "Giao dịch",
      time: "10:45 AM"
    },
    {
      id: 3,
      content: "Mã thanh toán #1243555 đã đến hạn thanh toán",
      type: "Mã giảm giá",
      time: "10:45 AM"
    },
    {
      id: 4,
      content: "Mã thanh toán #1243555 đã đến hạn thanh toán",
      type: "Tin tức",
      time: "10:45 AM"
    },
    {
      id: 5,
      content: "Mã thanh toán #1243555 đã đến hạn thanh toán",
      type: "khác",
      time: "10:45 AM"
    }
  ]
  constructor(private router: Router) { }

  ngOnInit() {}

  openTableNote() {
    this.router.navigate(['/all-note'])
  }

  alert() {
    alert("ppp")
  }
}
