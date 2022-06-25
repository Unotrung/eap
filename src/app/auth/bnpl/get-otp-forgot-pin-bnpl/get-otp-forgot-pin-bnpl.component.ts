import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../_service/auth/authentication.service";
import {AccountBnplService} from "../../../_service/auth/account-bnpl.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ResetPincodeBnplComponent} from "../reset-pincode-bnpl/reset-pincode-bnpl.component";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-get-otp-forgot-pin-bnpl',
    templateUrl: './get-otp-forgot-pin-bnpl.component.html',
    styleUrls: ['./get-otp-forgot-pin-bnpl.component.scss'],
})
export class GetOtpForgotPinBnplComponent implements OnInit {
    isCheckOtp: boolean = true;
    loading: boolean = false;
    countDown: number = 60;
    checkCount: boolean = true;
    messageErr: string = '';
    otp: string = '';
    phone: string = '';
    countFail = 0;
    messageErrExp = '';

    constructor(public router: Router,
                public authenticationService: AuthenticationService,
                private accountBnplService: AccountBnplService,
                private translateService: TranslateService) {
    }

    ngOnInit() {
        if (this.checkCount) {
            this.countEffectiveTimeOtp(this.countDown);
        }
        this.phone= this.authenticationService.userCurrentSubject$.getValue().phone;
    }

    submit() {
        let phone = this.authenticationService.userCurrentSubject$.getValue().phone;
        let nid = this.authenticationService.user$.getValue().citizenId;
        this.accountBnplService.verifyOtp({phone: phone, nid: nid, otp: this.otp}).
        subscribe(next => {
            if (next.status){
                this.resetMessErr();
                this.authenticationService.tokenOtp$.next(next.token);
                this.router.navigate(['/reset-pin'])
            }
        },error => {
            this.resetMessErr();
            console.log("err",error)
            if (error.error.statusCode == 3000){
                this.messageErrExp = this.translateService.instant('forgotPin.errorOtpExp');
            } else if (error.error.statusCode == 4000) {
                if (error.error.countFail<5) {
                    this.countFail = error.error.countFail;
                    this.messageErr = this.translateService.instant('forgotPin.errorOtpWrong');
                } else if (error.error.countFail ===5) {
                    this.countFail = error.error.countFail;
                    this.messageErr = this.translateService.instant('forgotPin.blockOtp');
                }
            }else if (error.error.statusCode == 1004) {
                this.countFail = error.error.countFail;
                this.messageErr = this.translateService.instant('forgotPin.blockOtp');
            } else {
                this.router.navigate(['/error'])
            }

        })
    }

    resetMessErr(){
        this.messageErr = '';
        this.messageErrExp = ''
    }

    onCodeChanged(pin: string) {
        this.otp = pin;
        this.messageErr = '';
    }

    onCodeCompleted(pin: string) {
        this.otp = pin;
    }

    getOtpAgain() {
        let phone = this.authenticationService.userCurrentSubject$.getValue().phone;
        let nid = this.authenticationService.user$.getValue().citizenId;
        this.accountBnplService.getOtp({phone: phone, nid: nid}).subscribe(next => {
            if (next.status) {
                console.log("OTP: " + next.otp)
            }
        }, error => {
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
}


//
// import {Component, Inject, OnInit} from '@angular/core';
// import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
// import {Router} from "@angular/router";
// import {AuthenticationService} from "../../../_service/auth/authentication.service";
// import {AccountBnplService} from "../../../_service/auth/account-bnpl.service";
// import {FormControl, FormGroup, Validators} from "@angular/forms";
// import {ResetPincodeBnplComponent} from "../reset-pincode-bnpl/reset-pincode-bnpl.component";
//
// @Component({
//     selector: 'app-get-otp-forgot-pin-bnpl',
//     templateUrl: './get-otp-forgot-pin-bnpl.component.html',
//     styleUrls: ['./get-otp-forgot-pin-bnpl.component.scss'],
// })
// export class GetOtpForgotPinBnplComponent implements OnInit {
//     formOtp: FormGroup = new FormGroup({
//         otp: new FormControl("",[Validators.required,Validators.pattern("^\\d{6}$")]),
//     });
//
//     validateMessage = {
//         'otp': [
//             {type: "required", message: "Vui lòng nhập thông tin"},
//             {type: "pattern", message: "Mã OTP không đúng định dạng"}
//         ]
//     }
//     messageError: string = "";
//
//     constructor(public dialogRef: MatDialogRef<GetOtpForgotPinBnplComponent>,
//                 @Inject(MAT_DIALOG_DATA) public data: string,
//                 public dialog: MatDialog,
//                 public router: Router,
//                 public authenticationService: AuthenticationService,
//                 private accountBnplService: AccountBnplService) {
//     }
//
//     ngOnInit() {
//     }
//
//     submit() {
//         if (this.formOtp.invalid) return;
//         let phone = this.authenticationService.userCurrentSubject$.getValue().phone;
//         let nid = this.data;
//         let otp = this.formOtp.value.otp;
//         this.accountBnplService.verifyOtp({phone: phone, nid: nid, otp: otp}).subscribe(next => {
//             console.log(next);
//             this.openDialogResetPin(next.token);
//         },error => {
//             this.messageError = "Mã OTP không đúng"
//         })
//     }
//
//     openDialogResetPin(data:string){
//         const dialogRef = this.dialog.open(ResetPincodeBnplComponent, {
//             width: '100%',
//             data: data,
//             panelClass: ['animate__animated','animate__zoomIn','reset-pinCode']
//         });
//
//         dialogRef.afterClosed().subscribe(result => {
//         });
//     }
//
//     closePopup() {
//         document.getElementsByClassName("get-otp-pinCode")[0].classList.remove("animate__zoomIn")
//         document.getElementsByClassName("get-otp-pinCode")[0].classList.add("animate__zoomOut");
//         setTimeout(()=>{this.dialogRef.close();}, 500);
//     }
//
//     getOtpAgain() {
//         let phone = this.authenticationService.userCurrentSubject$.getValue().phone;
//         this.accountBnplService.getOtp({phone: phone, nid: this.data}).subscribe(next=>{
//             if (next.status){
//                 console.log("OTP: "+next.otp)
//             }
//         },error => {
//             this.router.navigate(['/error'])
//         })
//     }
// }
