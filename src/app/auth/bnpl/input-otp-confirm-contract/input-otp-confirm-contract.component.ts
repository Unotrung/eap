import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {AuthenticationService} from "../../../_service/auth/authentication.service";
import {WaitingConfirmPhoneComponent} from "../waiting-confirm-phone/waiting-confirm.component-phone";
import {WaitingConfirmSignContractComponent} from "../waiting-confirm-sign-contract/waiting-confirm-sign-contract.component";
import {StatusCompleteComponent} from "../status-complete/status-complete.component";
import {AccountBnplService} from "../../../_service/auth/account-bnpl.service";

@Component({
    selector: 'app-input-otp-confirm-contract',
    templateUrl: './input-otp-confirm-contract.component.html',
    styleUrls: ['./input-otp-confirm-contract.component.scss'],
})
export class InputOtpConfirmContractComponent implements OnInit {
    isCheckOtp: boolean = true;
    loading: boolean = false;
    countDown: number = 60;
    checkCount: boolean = true;
    messageErr: string = '';
    otp: string = '';
    phone = '';
    messageErrExp: string = '';
    countFail: number = 0;


    constructor(public dialogRef: MatDialogRef<InputOtpConfirmContractComponent>,
                @Inject(MAT_DIALOG_DATA) public data,
                private dialog: MatDialog,
                private route: Router,
                public translateService: TranslateService,
                private authenticationService: AuthenticationService,
                private accountBnplService: AccountBnplService) {
    }

    ngOnInit() {
        if (this.checkCount) {
            this.countEffectiveTimeOtp(this.countDown);
        }
        this.phone = this.authenticationService.userCurrentSubject$.getValue().phone;
    }

    getOtpAgain() {
        this.checkCount = false;
        this.countDown = 60;
        setTimeout(() => {
            this.countEffectiveTimeOtp(60);
            this.checkCount = true;
        }, 1000)
    }

    countEffectiveTimeOtp(second: number) {
        let count = second;
        const counter = setInterval(() => {
            count = count - 1;
            if (this.checkCount) {
                this.countDown = count;
            }
            if (count === 0 || !this.checkCount) {
                this.checkCount = true;
                clearInterval(counter)
                return;
            }
        }, 1000);
    }

    onCodeChanged(pin: string) {
        this.otp = pin;
        this.messageErr = '';
    }

    onCodeCompleted(pin: string) {
        this.otp = pin;
    }

    submit() {
        if (this.otp === '111111') {
            this.accountBnplService.stepRegister$.next({widthLine: 75,numberStep:3});
            this.dialogRef.close();
            const dialogRef = this.dialog.open(WaitingConfirmSignContractComponent, {
                width: '100%',
            });
            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    this.openDialogStatus(result);
                }
            });
            this.countFail = 0;
        } else {
            this.countFail = this.countFail + 1;
            this.messageErr = this.translateService.instant('forgotPass.wrongOtp');
            if (this.countFail === 5) {
                this.messageErr = this.messageErr = this.translateService.instant('forgotPass.blockOtp');
            }
            if (this.countFail > 5) {
                this.dialogRef.close()
            }
        }

    }

    closeDialog() {
        this.dialogRef.close();
    }

    openDialogStatus(isComplete: boolean) {
        const dialogRef = this.dialog.open(StatusCompleteComponent, {
            width: '100%',
            data: isComplete
        });
        dialogRef.afterClosed().subscribe(result => {

        });
    }
}
