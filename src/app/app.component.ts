import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "./_service/auth/authentication.service";
import {SidebarService} from "./_service/side-bar/sidebar.service";
import {BnNgIdleService} from "bn-ng-idle";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  currentAccessToken : String = null;
  isShowSideBar: boolean;
  showMenu: boolean = false;
  heightMenu: number;
  heightSidebar:number;
  constructor(private bnIdle: BnNgIdleService,
      private authenticationService: AuthenticationService,
      private sidebarService: SidebarService,
  ) {}

  ngOnInit() {

    setTimeout(()=>{
      this.authenticationService.currentAccessToken$.subscribe(x => this.currentAccessToken = x);
      this.sidebarService.isShowSidebar$.subscribe(z=>this.isShowSideBar=z);
      this.sidebarService.heightMenu$.subscribe(k=> this.heightMenu = k);
      this.sidebarService.heightSidebar$.subscribe(y=>{this.heightSidebar = y})
    },0)


    this.bnIdle.startWatching(3600).subscribe((res) => {
      if (res) {
        this.authenticationService.logout();
      }
    });
  }

  onCloseMenu() {
    this.sidebarService.isShowMenu$.next(false);
    this.sidebarService.heightMenu$.next(0);
  }

  onCloseSidebarMobile() {
    this.sidebarService.heightSidebar$.next(0);
  }
}
