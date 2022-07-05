import {Component, Inject, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../_service/auth/authentication.service";
import {Router} from "@angular/router";
import {AccountBnplService} from "../../../_service/auth/account-bnpl.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-waiting-confirm-sign-contract',
  templateUrl: './waiting-confirm-sign-contract.component.html',
  styleUrls: ['./waiting-confirm-sign-contract.component.scss'],
})
export class WaitingConfirmSignContractComponent implements OnInit {

  constructor(private authService: AuthenticationService,
              private router: Router,
              private accountBnplService: AccountBnplService,
              public dialogRef: MatDialogRef<WaitingConfirmSignContractComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    setTimeout(()=>{
      this.confirmAccountBnpl(true);
    },3000)
  }

  confirmAccountBnpl(isComplete:boolean){
    this.dialogRef.close(isComplete);
  }

}
