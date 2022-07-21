import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ForgotPasswordService} from "../../_service/auth/forgot-password.service";
import {ResetPasswordComponent} from "../reset-password/reset-password.component";
import {AuthenticationService} from "../../_service/auth/authentication.service";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-otp-reset-password',
    templateUrl: './otp-reset-password.component.html',
    styleUrls: ['./otp-reset-password.component.scss'],
})
export class OtpResetPasswordComponent implements OnInit {
    linkValid: string = "../../../assets/images/Warning.png";
    otpForm: FormGroup = new FormGroup({
        otp: new FormControl("", [Validators.required,
            Validators.pattern("[0-9]{6}")
        ])
    });

    msgValidatorOtp = [
        {type: 'required', message: this.translateService.instant('forgotPass.required')},
        {type: 'pattern', message: this.translateService.instant('forgotPass.validOtp')}
    ];

    loading: boolean = false;
    countDown: number = 60;
    checkCount: boolean = true;
    messageErr: string = '';
    messageErrExp: string = '';
    otp: string = '';
    email = '';
    countFail = 0;
    isCancel: boolean = false;

    constructor(public dialogRef: MatDialogRef<OtpResetPasswordComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                public dialog: MatDialog,
                private forgotPasswordService: ForgotPasswordService,
                private authenticationService: AuthenticationService,
                private router: Router,
                public translateService: TranslateService) {
    }

    ngOnInit() {
        this.email = this.data.email;
        if (this.checkCount) {
            this.countEffectiveTimeOtp(this.countDown);
        }
    }

    verifyOtpToResetPassword(data: any) {
        this.loading = true;
        this.forgotPasswordService.verifyOtp(data).subscribe(next => {
            if (next.status) {
                this.loading = false;
                this.resetMsg();
                this.openSetPassword({phone_email: this.data.phone_email, token: next.token});
                this.dialogRef.close()
            }
        }, error => {
            this.resetMsg();
            console.log(error)
            if (error.error.statusCode == 1004){
                if (error.error.countFail<5) {
                    this.countFail = error.error.countFail;
                    this.messageErr = this.translateService.instant('forgotPass.wrongOtp');
                } else if (error.error.countFail===5){
                    this.countFail = error.error.countFail;
                    this.isCancel = true;
                    this.messageErr = this.translateService.instant('forgotPass.blockOtp');
                }
            } else if (error.error.statusCode == 3000) {
                this.messageErrExp = this.translateService.instant('forgotPass.ExpiredOtp');
            }
            this.loading = false;
        })
    }

    submit() {
        this.verifyOtpToResetPassword({phone_email: this.data.phone_email, otp: this.otp});
    }

    openSetPassword(data: any) {
        const dialogRef = this.dialog.open(ResetPasswordComponent, {
            width: '100%',
            data: data,
            panelClass: ['animate__animated', 'animate__zoomIn', 'animate__faster', 'set-pass-animate']
        });

        dialogRef.afterClosed().subscribe(result => {
        });
    }

    closeDialog() {
        this.isCancel = true;
        document.getElementsByClassName("input-otp-animate")[0].classList.remove("animate__zoomIn'")
        document.getElementsByClassName("input-otp-animate")[0].classList.add("animate__zoomOut");
        setTimeout(() => {
            this.dialogRef.close();
        }, 100);
    }

    getOtpAgain() {
        this.forgotPasswordService.getOtpResetPassword({phone_email: this.data.phone_email})
            .subscribe(next => {
            })

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
        this.resetMsg();
    }

    onCodeCompleted(pin: string) {
        this.otp = pin;
    }

    resetMsg(){
        this.messageErr = '';
        this.messageErrExp = '';
    }
}
