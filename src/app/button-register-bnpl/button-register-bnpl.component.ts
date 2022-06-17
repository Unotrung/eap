import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../_service/auth/authentication.service";
import {Router} from "@angular/router";
import {AccountBnplService} from "../_service/auth/account-bnpl.service";
import {SidebarService} from "../_service/side-bar/sidebar.service";

@Component({
  selector: 'app-button-register-bnpl',
  templateUrl: './button-register-bnpl.component.html',
  styleUrls: ['./button-register-bnpl.component.scss'],
})
export class ButtonRegisterBnplComponent implements OnInit {
  loading = false;
  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private accountBnplService: AccountBnplService,
              private sidebarService: SidebarService) { }

  ngOnInit() {
    setTimeout(()=>{
      this.sidebarService.itemSelectObject$.next("registerBNPL");
    },0)

    this.checkBnplByPhone()
  }

  checkBnplByPhone(){
    this.loading = true;
    let phone = this.authenticationService.userCurrentSubject$.getValue().phone;
    this.accountBnplService.isCheckInformationBnpl({phone: phone}).subscribe(next=>{
      console.log(next);
      this.authenticationService.step$.next(0);
      this.router.navigate(['/infor-bnpl']);
      this.loading = false;
    },error => {
      console.log(error)
      this.authenticationService.step$.next(1);
      this.router.navigate(['/btn-register-bnpl']);
      this.loading = false;
    },() => {this.loading = false})
  }
}
