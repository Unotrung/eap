import {Component, OnInit, Renderer2} from '@angular/core';
import {SidebarService} from "../_service/side-bar/sidebar.service";
import {MethodPayOnlineComponent} from "../fast-payment/method-pay-online/method-pay-online.component";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AuthenticationService} from "../_service/auth/authentication.service";
import {TranslateService} from "@ngx-translate/core";
import {LoginComponent} from "../auth/login/login.component";
import {RegisterComponent} from "../auth/register/register.component";

@Component({
  selector: 'app-sidebar-header',
  templateUrl: './sidebar-header.component.html',
  styleUrls: ['./sidebar-header.component.scss'],
})
export class SidebarHeaderComponent implements OnInit {
  constructor(private sidebarService: SidebarService,
              private router: Router,
              public dialog: MatDialog,
              private authenticationService: AuthenticationService,
              public translateService: TranslateService) { }

  ngOnInit() {}

  onCloseMenu() {
    this.sidebarService.isShowMenu$.next(false);
    this.sidebarService.heightMenu$.next(0);
  }

  openDialogPayFast() {
    const dialogRef = this.dialog.open(MethodPayOnlineComponent, {
      width: '100%',
      panelClass: ['animate__animated', 'animate__zoomIn', 'animate__faster','fast_method']
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  backHomePage() {
    this.router.navigate(['/'])
  }

  openDialogLogin() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '100%',
      panelClass: ['animate__animated', 'animate__zoomIn', 'animate__faster', 'animate__login']
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openDialogRegister() {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '100%',
      panelClass: ['animate__animated', 'animate__zoomIn', 'animate__faster', 'animate__register']
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
