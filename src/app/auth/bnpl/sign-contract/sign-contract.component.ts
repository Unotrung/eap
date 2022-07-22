import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {InputOtpConfirmContractComponent} from "../input-otp-confirm-contract/input-otp-confirm-contract.component";
import {AuthenticationService} from "../../../_service/auth/authentication.service";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {AccountBnplService} from "../../../_service/auth/account-bnpl.service";

@Component({
    selector: 'app-sign-contract',
    templateUrl: './sign-contract.component.html',
    styleUrls: ['./sign-contract.component.scss'],
})
export class SignContractComponent implements OnInit {
    isAgree: boolean = false;
    isGetOtp: boolean = false;
    isShow = false;
    stepRegister = {
        widthLine: 50,
        numberStep:2
    }

    constructor(public dialog: MatDialog,
                private authService: AuthenticationService,
                private router: Router,
                private translateService: TranslateService,
                private accountBnplService: AccountBnplService) {
    }

    ngOnInit() {
        this.accountBnplService.currentStepRegister$.subscribe(x=>this.stepRegister = {...x})
        if (this.authService.step$.getValue() === 0) {
            this.router.navigate(['/infor-bnpl']);
        }
    }

    submitToSignContract() {
        const dialogRef = this.dialog.open(InputOtpConfirmContractComponent, {
            width: '100%',
        });

        dialogRef.afterClosed().subscribe(result => {
        });
    }

    handleCheckboxAgree(num: number) {
        if (num === 1) {
            this.isAgree = !this.isAgree;
        } else if (num === 2) {
            this.isGetOtp = !this.isGetOtp;
        }
    }


    showAllPageContract() {
        this.isShow =!this.isShow
    }
}
