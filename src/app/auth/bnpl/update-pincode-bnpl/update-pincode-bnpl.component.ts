import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AccountBnplService} from "../../../_service/auth/account-bnpl.service";
import {AuthenticationService} from "../../../_service/auth/authentication.service";
import {StatusUpdatePasswordComponent} from "../../status-update-password/status-update-password.component";
import {StatusUpdatePincodeComponent} from "../status-update-pincode/status-update-pincode.component";
import {ConfirmNidResetPincodeComponent} from "../confirm-nid-reset-pincode/confirm-nid-reset-pincode.component";
import {Router} from "@angular/router";

@Component({
    selector: 'app-update-pincode-bnpl',
    templateUrl: './update-pincode-bnpl.component.html',
    styleUrls: ['./update-pincode-bnpl.component.scss'],
})
export class UpdatePincodeBnplComponent implements OnInit {
    currentPin: string='';
    newPin: string='';
    verifyPin: string='';
    phone: String;
    msgWrongPassword: string = '';
    msgVerifyError:string = '';
    constructor(public dialogRef: MatDialogRef<UpdatePincodeBnplComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                public dialog: MatDialog,
                private accountBnplService: AccountBnplService,
                private authenticationService: AuthenticationService,
                private router: Router) {
    }

    ngOnInit() {
    }

    onCurrentCodeChanged(code: string) {
        this.currentPin = code;
    }

    onCurrentCodeComplete(code: string) {
        this.currentPin = code;
    }

    onNewCodeChanged(code: string) {
        this.newPin = code;
    }

    onNewCodeCompleted(code: string) {
        this.newPin = code;
    }

    onCodeChangedVerify(code: string) {
        this.verifyPin = code;
    }

    onCodeCompletedVerify(code: string) {
        this.verifyPin = code;
    }

    closePopup() {
        document.getElementsByClassName("change-pin-animate")[0].classList.remove("animate__zoomIn")
        document.getElementsByClassName("change-pin-animate")[0].classList.add("animate__zoomOut");
        setTimeout(() => this.dialogRef.close(), 400)
    }

    submitUpdatePin() {
        if (this.newPin !== this.verifyPin) {
            this.msgVerifyError = "Xác nhận mật khẩu mới không đúng";
            return
        }
        this.phone = this.authenticationService.userCurrentSubject$.getValue().phone;
        this.accountBnplService.updatePinCode({phone: this.phone, pin: this.currentPin, new_pin: this.newPin})
            .subscribe(next => {
                if (next.status) {
                    this.msgVerifyError = '';
                    this.msgWrongPassword ='';
                    this.dialogRef.close();
                    this.openDialogStatus();
                } else {
                    this.msgWrongPassword = "Mã PIN cũ không hợp lệ"
                }
            },error => {
                this.router.navigate(['/error'])
            })
    }

    openDialogStatus() {
        const dialogRef = this.dialog.open(StatusUpdatePincodeComponent, {
            width: '100%',
            panelClass: ['animate__animated','animate__zoomIn','animate__faster','stt__edit__pin']
        });

        dialogRef.afterClosed().subscribe(result => {

        });
    }

    openDialogConfirmNid() {
        this.dialogRef.close();
        const dialogRef = this.dialog.open(ConfirmNidResetPincodeComponent, {
            width: '100%',
            panelClass: ['animate__animated','animate__zoomIn','animate__faster','confirm__nid']
        });

        dialogRef.afterClosed().subscribe(result => {

        });
    }
}
