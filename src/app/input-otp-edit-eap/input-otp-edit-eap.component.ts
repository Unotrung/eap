import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UpdateEapService} from "../_service/auth/update-eap.service";
import {dashCaseToCamelCase} from "@angular/compiler/src/util";
import {Router} from "@angular/router";
import {AuthenticationService} from "../_service/auth/authentication.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-input-otp-edit-eap',
    templateUrl: './input-otp-edit-eap.component.html',
    styleUrls: ['./input-otp-edit-eap.component.scss'],
})
export class InputOtpEditEapComponent implements OnInit {
    messageErr: string = '';
    loading: boolean = false;
    countDown: number = 60;
    checkCount: boolean = true;
    otp = '';

    constructor(public dialogRef: MatDialogRef<InputOtpEditEapComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private updateEapService: UpdateEapService,
                private router: Router,
                private authenticationService: AuthenticationService,
                private translateService: TranslateService) {
    }

    ngOnInit() {
        if (this.checkCount) {
            this.countEffectiveTimeOtp(this.countDown);
        }
    }

    resetMessage() {
        this.messageErr = '';
    }

    getOtpAgain() {
        let currentEmail = this.authenticationService.userCurrentSubject$.getValue().email;
        this.updateEapService.getOtp({email: currentEmail, new_email: this.data.new_email}).subscribe(next => {
            if (next.status) {
            }
        }, error => {
            this.router.navigate(['/error'])
        });

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
            if (this.countDown === 0 || !this.checkCount) {
                this.checkCount = true;
                clearInterval(counter)
                return;
            }
        }, 1000);
    }

    onCodeChanged(pin: string) {
        this.otp = pin;
        this.resetMessage();
    }

    onCodeCompleted(pin: string) {
        this.otp = pin;
    }

    submit() {
        this.loading = true;
        let phone = this.authenticationService.userCurrentSubject$.getValue().phone;
        if (this.otp.length === 6) {
            this.updateEapService.verifyOtp({...this.data, otp: this.otp, phone: phone})
                .subscribe(next => {
                        console.log(next);
                        if (next.status) {
                            this.dialogRef.close(next.token);
                            this.loading = false;
                        }
                    }, error => {
                        if (error.error.statusCode == 4000) {
                            this.messageErr = this.translateService.instant('forgotPass.wrongOtp');
                        } else if (error.error.statusCode == 3000) {
                            this.messageErr = this.translateService.instant('forgotPass.ExpiredOtp');
                        }
                        this.loading = false;
                    }
                )
        }

    }

    onNoClick() {
        document.getElementsByClassName("otp-email-animate")[0].classList.remove("animate__zoomIn")
        document.getElementsByClassName("otp-email-animate")[0].classList.add("animate__zoomOut");
        setTimeout(() => {
            this.dialogRef.close();
        }, 200);
    }
}
