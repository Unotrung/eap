import {Component, Inject, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../_service/auth/authentication.service";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AccountBnplService} from "../../../_service/auth/account-bnpl.service";

@Component({
  selector: 'app-waiting-confirm',
  templateUrl: './waiting-confirm-phone.component.html',
  styleUrls: ['./waiting-confirm.component-phone.scss'],
})
export class WaitingConfirmPhoneComponent implements OnInit {

  constructor(private authService: AuthenticationService,
              private router: Router,
              private accountBnplService: AccountBnplService,
              public dialogRef: MatDialogRef<WaitingConfirmPhoneComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.checkBnplFec();
    setTimeout(()=>{
      this.dialogRef.close();
    }, 3000)
  }

  checkBnplFec() {
    this.accountBnplService.checkInfomationBnplFec(this.data).subscribe(next =>{
      console.log("check true: ",next);
      this.router.navigate(['/set-pin-code'])
    },error => {
      console.log("check false ",error);
      this.router.navigate(['/take-photoNID'])
    })
  }
}
