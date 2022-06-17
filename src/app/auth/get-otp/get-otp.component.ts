import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {RegisterPasswordComponent} from "../register-password/register-password.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RegisterService} from "../../_service/auth/register.service";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-get-otp',
    templateUrl: './get-otp.component.html',
    styleUrls: ['./get-otp.component.scss'],
})
export class GetOTPComponent implements OnInit {
    linkValid: string = "../../../assets/images/Warning.png";
    registerUSer: {
        username: "",
        phone: "",
        email: "",
        otp: ""
    };
    otp:string = '';
    countFail = 0;

    otpForm: FormGroup = new FormGroup({
        otp: new FormControl("", [Validators.required,
            Validators.pattern("[0-9]{6}")
        ])
    });

    msgValidatorOtp = [
        {type: 'required', message: this.translateService.instant('register.required')},
        {type: 'pattern', message: this.translateService.instant('register.patternOtp')}
    ];

    messageErr: string = '';
    messageErrExp: string = '';
    loading: boolean = false;
    countDown: number = 60;
    checkCount: boolean = true;

    constructor(public dialogRef: MatDialogRef<GetOTPComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                public dialog: MatDialog,
                private registerService: RegisterService,
                private router: Router,
                public translateService: TranslateService) {
    }

    ngOnInit() {
        this.registerUSer = {
            username: this.data.username,
            phone: this.data.phone,
            email: this.data.email,
            otp: ""
        }

        if (this.checkCount) {
            this.countEffectiveTimeOtp(60);
        }
    }

    onNoClick() {
        document.getElementsByClassName("get-otp-animate")[0].classList.remove("animate__zoomIn")
        document.getElementsByClassName("get-otp-animate")[0].classList.add("animate__zoomOut");
        setTimeout(() => {
            this.dialogRef.close();
        }, 100);
    }

    openDialogSetPassword(data: any) {
        const dialogRef = this.dialog.open(RegisterPasswordComponent, {
            width: '100%',
            data: data,
            panelClass: ['animate__animated', 'animate__slideInDown', 'animate__faster', 'animate_set_pass']
        });

        dialogRef.afterClosed().subscribe(result => {
        });
    }

    submit() {
        this.loading = true;
        // @ts-ignore
        this.registerUSer = {...this.registerUSer, otp: this.otp}
        this.registerService.verifyOtp(this.registerUSer).subscribe(next => {
            if (next.status) {
                this.openDialogSetPassword(next.user)
                this.loading = false;
                this.resetMessage();
                this.dialogRef.close();
            }
        }, error => {
            this.resetMessage();
            console.log(error)
            if (error.error.statusCode == 4000){
                if (error.error.countFail<5) {
                    this.countFail = error.error.countFail;
                    this.messageErr = this.translateService.instant('forgotPass.wrongOtp');
                } else if (error.error.countFail===5){
                    this.countFail = error.error.countFail;
                    this.messageErr = this.translateService.instant('forgotPass.blockOtp');
                }
            } else if (error.error.statusCode == 3000) {
                this.messageErrExp = this.translateService.instant('forgotPass.ExpiredOtp');
            } else if (error.error.statusCode == 1004) {
                this.countFail = error.error.countFail;
                this.messageErr = this.translateService.instant('forgotPass.blockOtp');
            }
            this.loading = false;
        })
    }

    resetMessage() {
        this.messageErr = '';
        this.messageErrExp = '';
    }

    getOtpAgain() {
        this.registerService.registerUser(this.data).subscribe(next => {
        }, error => {
            this.router.navigate(['/error']);
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
}
