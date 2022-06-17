import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../_service/auth/authentication.service";
import {Router} from "@angular/router";
import {AccountBnplService} from "../_service/auth/account-bnpl.service";
import {SidebarService} from "../_service/side-bar/sidebar.service";

@Component({
  selector: 'app-sidebar-mobile',
  templateUrl: './sidebar-mobile.component.html',
  styleUrls: ['./sidebar-mobile.component.scss'],
})
export class SidebarMobileComponent implements OnInit {
  showRepayment: boolean = false;
  phone: string = '';

  constructor( private authenticationService: AuthenticationService,
               private router: Router,
               private accountBnplService: AccountBnplService,
               public sidebar: SidebarService,) {  }

  ngOnInit() {}

  getListRepaymentFec() {

  }

  showMoreRepayment(e: any) {
    e.stopPropagation();
    this.showRepayment = !this.showRepayment
  }

  logout() {
    this.authenticationService.logout();
  }

  showInfomationEap() {
    this.router.navigateByUrl('/infor-account')
  }
  getRepaymentPlan() {
    this.router.navigateByUrl('/repayment-plan')
  }

  getInformationAccountBnpl() {
    this.phone = this.authenticationService.userCurrentSubject$.getValue().phone;
    this.accountBnplService.getInformationBnpl(this.phone).subscribe(next => {
      if (next.status) {
        this.router.navigateByUrl('/infor-bnpl');
        this.authenticationService.step$.next(0);
      }
    }, error => {
      console.log("err mobile:",error);
      if (error.error.statusCode == 900) {
        this.router.navigateByUrl('/btn-register-bnpl')
        this.authenticationService.step$.next(1);
      } else {
        this.router.navigateByUrl('/error')
      }
    })
  }
}
