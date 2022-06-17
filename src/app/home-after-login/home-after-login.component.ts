import { Component, OnInit} from '@angular/core';
import {SidebarService} from "../_service/side-bar/sidebar.service";

@Component({
  selector: 'app-home-after-login',
  templateUrl: './home-after-login.component.html',
  styleUrls: ['./home-after-login.component.scss'],
})
export class HomeAfterLoginComponent implements OnInit {
  isShowSidebar: boolean;
  constructor(
      private sidebarService: SidebarService,
  ) { }

  ngOnInit() {
    this.sidebarService.isShowSidebar$.subscribe(x=>this.isShowSidebar =x);
    setTimeout(()=>this.sidebarService.showSidebar(false),0)
  }
}
