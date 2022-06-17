import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ForgotPasswordService} from "../../_service/auth/forgot-password.service";
import {StatusResetPasswordComponent} from "../status-reset-password/status-reset-password.component";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
    linkValid:string = "../../../assets/images/Warning.png";
    passwordForm: FormGroup = new FormGroup({
        password: new FormGroup({
            passwordFirst: new FormControl("", [Validators.required,
                Validators.pattern('^(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d@$!%*#?&~^\\-+_\\(\\)]{6,255}$')]),
            passwordSecond: new FormControl("", [Validators.required,
                Validators.pattern('^(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d@$!%*#?&~^\\-+_\\(\\)]{6,255}$')])
        })
    });

    messageInvalidPass = [
        {type: "required", message: this.translateService.instant('forgotPass.required')},
        {type: "pattern", message: this.translateService.instant('register.patternPass')},
    ];
    msgConfirmErr: string = '';
    loading = false;

    constructor(public dialogRef: MatDialogRef<ResetPasswordComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                public dialog: MatDialog,
                private forgotPasswordService: ForgotPasswordService,
                private router: Router,
                public translateService: TranslateService) {
    }

    ngOnInit() {
    }

    resetPassword(data: any, token: string) {
        this.loading = true;
        this.forgotPasswordService.resetPassword(data, token).subscribe(
            next => {
                if (next.status) {
                    this.loading  = false;
                    this.openStatusResetPassword(this.data.phone_email);
                    this.dialogRef.close();
                }
            }, error => {
                this.loading  = false;
                this.router.navigate(['/error'])
            }
        )
    }

    submit() {
        if (this.passwordForm.invalid) return;
        let p1: string = this.passwordForm.value.password.passwordFirst;
        let p2: string = this.passwordForm.value.password.passwordSecond;
        if (p1 !== p2) {
            this.msgConfirmErr = this.translateService.instant('forgotPass.wrongPass');
            return;
        }
        let newData = {
            phone_email: this.data.phone_email,
            password: this.passwordForm.value.password.passwordFirst
        }
        this.resetPassword(newData, this.data.token);
    }

    closePopup() {
        document.getElementsByClassName("set-pass-animate")[0].classList.remove("animate__zoomIn")
        document.getElementsByClassName("set-pass-animate")[0].classList.add("animate__zoomOut");
        setTimeout(() => {
            this.dialogRef.close();
        }, 100);
    }

    openStatusResetPassword(phone: string) {
        const dialogRef = this.dialog.open(StatusResetPasswordComponent, {
            width: '100%',
            data: phone,
            panelClass: ['animate__animated', 'animate__zoomIn', 'animate__faster', 'stt-reset-animate']
        });

        dialogRef.afterClosed().subscribe(result => {
        });
    }

    resetMsg() {
        this.msgConfirmErr = '';
    }
}
