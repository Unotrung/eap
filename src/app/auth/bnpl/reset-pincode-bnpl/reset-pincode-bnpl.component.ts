import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../_service/auth/authentication.service";
import {AccountBnplService} from "../../../_service/auth/account-bnpl.service";
import {StatusResetPincodeComponent} from "../status-reset-pincode/status-reset-pincode.component";
import {CodeInputComponent} from "angular-code-input";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-reset-pincode-bnpl',
    templateUrl: './reset-pincode-bnpl.component.html',
    styleUrls: ['./reset-pincode-bnpl.component.scss'],
})
export class ResetPincodeBnplComponent implements OnInit {
    pinCode = '';
    verifyPinCode = '';
    isCheckPin: boolean = false;
    messageError = "";
    msgVerifyError = '';
    msgStt : string = '';
    changeBorderTop = false;
    changeBorderBottom = false;
    @ViewChild('codeInput') codeInput !: CodeInputComponent;

    constructor(
        public router: Router,
        public authenticationService: AuthenticationService,
        private accountBnplService: AccountBnplService,
        private translateService: TranslateService) {
    }

    ngOnInit() {

    }

    onCodeChanged(code: string) {
        this.pinCode = code;
        this.resetMsg();
    }

    onCodeCompleted(code: string) {
        this.pinCode = code;
        this.resetMsg();
    }

    onCodeChangedVerify(code: string) {
        this.verifyPinCode = code;
        this.resetMsg();
        this.resetMsg();
    }

    onCodeCompletedVerify(code: string) {
        this.verifyPinCode = code;
    }

    checkPin() {
        return this.isCheckPin = (this.verifyPinCode === this.pinCode) ? true : false;
    }

    submit() {
        this.checkPin();
        if (this.isCheckPin == true) {
            let token = this.authenticationService.tokenOtp$.getValue();
            let phone = this.authenticationService.userCurrentSubject$.getValue().phone;
            this.accountBnplService.resetPin({phone: phone, new_pin: this.pinCode}, token).subscribe(next => {
                this.msgStt = 'success';
                this.resetMsg();
            }, error => {
                this.resetMsg();
                this.msgStt = 'fail';
            })
        } else {
            this.verifyPinCode = '';
            this.codeInput.reset();
            this.msgVerifyError = this.translateService.instant('forgotPin.ErrVerifyPin')
        }
    }

    resetMsg(){
        this.msgVerifyError = '';
        this.messageError = '';
    }

    changePinAgain() {
        this.router.navigate(['/change-pin']);
        window.location.reload();
    }

    focusAll(num:number) {
        if (num ===1) {
            this.changeBorderTop = true;
            this.changeBorderBottom = false;
        } else if(num ===2) {
            this.changeBorderTop = false;
            this.changeBorderBottom = false;
        }
    }
}


//
// import {Component, Inject, OnInit} from '@angular/core';
// import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
// import {Router} from "@angular/router";
// import {AuthenticationService} from "../../../_service/auth/authentication.service";
// import {AccountBnplService} from "../../../_service/auth/account-bnpl.service";
// import {StatusResetPincodeComponent} from "../status-reset-pincode/status-reset-pincode.component";
//
// @Component({
//     selector: 'app-reset-pincode-bnpl',
//     templateUrl: './reset-pincode-bnpl.component.html',
//     styleUrls: ['./reset-pincode-bnpl.component.scss'],
// })
// export class ResetPincodeBnplComponent implements OnInit {
//     newPin:string = '';
//     verifyPin:string = '';
//     messageCompare:string = '';
//     messageError: string = '';
//     constructor(public dialogRef: MatDialogRef<ResetPincodeBnplComponent>,
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
//     onNewPinChanged(pin: string) {
//         this.newPin = pin;
//     }
//
//     onNewPinComplete(pin: string) {
//         this.newPin = pin;
//     }
//
//     onVerifyPinChanged(pin: string) {
//         this.verifyPin = pin;
//     }
//
//     onVerifyPinComplete(pin: string) {
//         this.verifyPin = pin;
//     }
//
//     submit() {
//         let p1 = this.newPin;
//         let p2 = this.verifyPin;
//         if (p1!==p2){
//             this.messageCompare = "Mã xác nhận không đúng"
//             return;
//         }
//         let token = this.data;
//         let phone = this.authenticationService.userCurrentSubject$.getValue().phone;
//         this.accountBnplService.resetPin({phone:phone,new_pin:p1},token).subscribe(next=>{
//             console.log(next);
//             this.openDialogSttReset();
//         },error => {
//             this.messageError = "Lỗi hệ thống không đổi được mã PIN"
//         })
//     }
//
//     closePopup() {
//         document.getElementsByClassName("reset-pinCode")[0].classList.remove("animate__zoomIn")
//         document.getElementsByClassName("reset-pinCode")[0].classList.add("animate__zoomOut");
//         setTimeout(()=>{this.dialogRef.close();}, 500);
//     }
//
//     openDialogSttReset(){
//         const dialogRef = this.dialog.open(StatusResetPincodeComponent, {
//             width: '100%',
//             panelClass: ['animate__animated','animate__zoomIn','reset-stt']
//         });
//
//         dialogRef.afterClosed().subscribe(result => {
//         });
//     }
// }
