import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AuthenticationService} from "../../../_service/auth/authentication.service";
import {Router} from "@angular/router";
import {AccountBnplService} from "../../../_service/auth/account-bnpl.service";

@Component({
  selector: 'app-status-complete',
  templateUrl: './status-complete.component.html',
  styleUrls: ['./status-complete.component.scss'],
})
export class StatusCompleteComponent implements OnInit {
  loading: boolean = false;
  countDown: number = 5;
  isError: boolean = false;
  isClose = false;
  constructor(public dialogRef: MatDialogRef<StatusCompleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialog: MatDialog,
              private authenticationService: AuthenticationService,
              private accountBnplService: AccountBnplService,
              public router: Router) { }

  ngOnInit() {
    this.isError = !this.data;
    if (!this.isError) {
      this.accountBnplService.stepRegister$.next({widthLine: 100,numberStep:4});
    }
    this.callLogin(5);
  }
  onNoClick() {
    // this.isClose = true;
    // document.getElementsByClassName("animate__finish")[0].classList.remove("animate__slideInDown")
    // document.getElementsByClassName("animate__finish")[0].classList.add("animate__zoomOut");
    // setTimeout(() => {
    //   this.dialogRef.close();
    // }, 100);
    this.dialogRef.close();
    this.router.navigate(['/infor-bnpl']);
  }

  autoLoginAfterRegister() {
    this.dialogRef.close();
    this.router.navigate(['/infor-bnpl']);
  }

  callLogin(second: number) {
    let currentSecond = second;
    const counter = setInterval(() => {
      currentSecond = currentSecond - 1;
      if (this.isClose) return;
      this.countDown = currentSecond;
      if (currentSecond <= 0) {
        this.autoLoginAfterRegister();
        clearInterval(counter)
      }
    }, 1000);
  }

  back() {
    this.dialogRef.close();
  }
}
