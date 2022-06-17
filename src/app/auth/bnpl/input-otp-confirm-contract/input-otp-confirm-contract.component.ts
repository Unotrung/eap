import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";

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

    constructor(public dialogRef: MatDialogRef<InputOtpConfirmContractComponent>,
                @Inject(MAT_DIALOG_DATA) public data,
                private route: Router,
                public translateService: TranslateService) {
    }

    ngOnInit() {
        if (this.checkCount) {
            this.countEffectiveTimeOtp(this.countDown);
        }
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
        this.route.navigateByUrl('/process-confirm');
        this.dialogRef.close();
    }

    closeDialog() {
        this.dialogRef.close();
    }
}
