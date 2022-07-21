import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../_service/auth/authentication.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountBnplService} from "../../../_service/auth/account-bnpl.service";
import {GetOTPComponent} from "../../get-otp/get-otp.component";
import {GetOtpForgotPinBnplComponent} from "../get-otp-forgot-pin-bnpl/get-otp-forgot-pin-bnpl.component";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-confirm-nid-reset-pincode',
    templateUrl: './confirm-nid-reset-pincode.component.html',
    styleUrls: ['./confirm-nid-reset-pincode.component.scss'],
})
export class ConfirmNidResetPincodeComponent implements OnInit {
    formNid: FormGroup = new FormGroup({
        nid: new FormControl("", [Validators.required, Validators.pattern("^(\\d{9}|\\d{12})$")]),
    });
    validateMessage = {
        'nid': [
            {type: "required", message: this.translateService.instant('forgotPin.required')},
            {type: "pattern", message: this.translateService.instant('forgotPin.pattern')}
        ]
    }
    messageError: string = "";

    constructor(
        public router: Router,
        public authService: AuthenticationService,
        private accountBnplService: AccountBnplService,
        private translateService: TranslateService) {
    }

    ngOnInit() {
    }


    keyPress(e: any) {
        const pattern = /[0-9]/;
        let inputChar = String.fromCharCode(e.charCode);
        if (!pattern.test(inputChar)) {
            e.preventDefault();
        }
    }

    submit() {
        if (this.formNid.invalid) return;
        let nid = this.formNid.value.nid;
        let phone = this.authService.userCurrentSubject$.getValue().phone;
        this.accountBnplService.checkNidAndPhone({phone: phone, nid: nid}).subscribe(next => {
            if (next.statusCode === 1000) {
                this.accountBnplService.getOtp({phone: phone, nid: nid}).subscribe(res => {
                    if (res.status) {
                        console.log("OTP: ",res);
                        this.authService.user$.next({...this.authService.user$.getValue(), citizenId: nid});
                        this.router.navigate(['/get-otp-reset-pin'])
                    }
                })
            } else if (next.statusCode === 900) {
                this.messageError = this.translateService.instant('forgotPin.nidWrong')
            }
        }, error => {
            this.messageError = this.translateService.instant('forgotPin.PhoneWrong')
        })

    }

    resetMsg() {
        this.messageError = '';
    }
}

//
// import {Component, Inject, OnInit} from '@angular/core';
// import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
// import {Router} from "@angular/router";
// import {AuthenticationService} from "../../../_service/auth/authentication.service";
// import {FormControl, FormGroup, Validators} from "@angular/forms";
// import {AccountBnplService} from "../../../_service/auth/account-bnpl.service";
// import {GetOTPComponent} from "../../get-otp/get-otp.component";
// import {GetOtpForgotPinBnplComponent} from "../get-otp-forgot-pin-bnpl/get-otp-forgot-pin-bnpl.component";
//
// @Component({
//     selector: 'app-confirm-nid-reset-pincode',
//     templateUrl: './confirm-nid-reset-pincode.component.html',
//     styleUrls: ['./confirm-nid-reset-pincode.component.scss'],
// })
// export class ConfirmNidResetPincodeComponent implements OnInit {
//     formNid: FormGroup = new FormGroup({
//         nid: new FormControl("",[Validators.required,Validators.pattern("^(\\d{9}|\\d{12})$")]),
//     });
//     validateMessage = {
//         'nid' : [
//             {type: "required",message: "Vui lòng nhập thông tin"},
//             {type: "pattern",message: "Số CCCD/CMND gồm 9 hoặc 12 kí tự"}
//         ]}
//      messageError: string = "";
//     constructor(public dialogRef: MatDialogRef<ConfirmNidResetPincodeComponent>,
//                 @Inject(MAT_DIALOG_DATA) public data: any,
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
//         if (this.formNid.invalid) return;
//         let nid = this.formNid.getRawValue().nid;
//         let phone = this.authenticationService.userCurrentSubject$.getValue().phone;
//         this.accountBnplService.getOtp({phone: phone, nid: nid}).subscribe(next=>{
//             if (next.status){
//                 this.openDialogVerifyOtp(nid);
//                 console.log("OTP: "+next.otp)
//                 this.messageError = ""
//             } else {
//                 this.messageError = "Số CMND/CCCD không tồn tại"
//             }
//         },error => {
//             this.router.navigate(['/error'])
//         })
//     }
//
//     closePopup() {
//         document.getElementsByClassName("confirm__nid")[0].classList.remove("animate__zoomIn")
//         document.getElementsByClassName("confirm__nid")[0].classList.add("animate__zoomOut");
//         setTimeout(()=>{this.dialogRef.close();}, 500);
//     }
//
//     openDialogVerifyOtp(data: string){
//         const dialogRef = this.dialog.open(GetOtpForgotPinBnplComponent, {
//             width: '100%',
//             data: data,
//             panelClass: ['animate__animated','animate__zoomIn','get-otp-pinCode']
//         });
//
//         dialogRef.afterClosed().subscribe(result => {
//         });
//     }
//
//     keyPress(e: any) {
//         const pattern = /[0-9]/;
//         let inputChar = String.fromCharCode(e.charCode);
//         if (!pattern.test(inputChar)) {
//             e.preventDefault();
//         }
//     }
// }
