import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {StatusRegisterComponent} from "../status-register/status-register.component";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {RegisterService} from "../../_service/auth/register.service";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-register-pin-code',
    templateUrl: './register-password.component.html',
    styleUrls: ['./register-password.component.scss'],
})
export class RegisterPasswordComponent implements OnInit {
    linkValid: string = "../../../assets/images/Warning.png";
    registerUSer: {
        username: "",
        phone: "",
        email: "",
        password: ""
    };

    passwordForm: FormGroup = new FormGroup({
        password: new FormGroup({
            passwordFirst: new FormControl("", [Validators.required,
                Validators.pattern('^(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d@$!%*#?&~^\\-+_\\(\\)]{6,255}$')]),
            passwordSecond: new FormControl("", [Validators.required,
                Validators.pattern('^(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d@$!%*#?&~^\\-+_\\(\\)]{6,255}$')])
        })
    });

    messageInvalidPass = [
        {type: "required", message: this.translateService.instant('register.required')},
        {type: "pattern", message: this.translateService.instant('register.patternPass')},
    ];
    msgConfirmErr: string = '';
    loading: boolean = false;

    constructor(public dialogRef: MatDialogRef<RegisterPasswordComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                public dialog: MatDialog,
                private registerService: RegisterService,
                private router: Router,
                public translateService: TranslateService) {
    }

    ngOnInit() {
        console.log(this.data);
        this.registerUSer = {
            username: this.data.username,
            phone: this.data.phone,
            email: this.data.email,
            password: ""
        }
    }

    onNoClick() {
        document.getElementsByClassName("animate_set_pass")[0].classList.remove("animate__slideInDown")
        document.getElementsByClassName("animate_set_pass")[0].classList.add("animate__zoomOut");
        setTimeout(() => {
            this.dialogRef.close();
        }, 100);
    }

    openStatusFinishRegister(data: any) {
        const dialogRef = this.dialog.open(StatusRegisterComponent, {
            width: '100%',
            data: data,
            panelClass: ['animate__animated', 'animate__slideInDown','animate__faster', 'animate__finish']
        });

        dialogRef.afterClosed().subscribe(result => {
        });
    }

    submit() {
        if (this.passwordForm.invalid) return;
        let p1: string = this.passwordForm.value.password.passwordFirst;
        let p2: string = this.passwordForm.value.password.passwordSecond;
        if (!this.validateConfirm(p1, p2)) {
            this.msgConfirmErr = this.translateService.instant('register.wrongPass');
            return;
        } else {
            // @ts-ignore
            this.registerUSer = {...this.registerUSer, password: p1};
            this.msgConfirmErr = ''
        }
        this.loading = true;
        this.registerService.setPassword(this.registerUSer).subscribe(next => {
            if (next.status) {
                this.openStatusFinishRegister({phone: this.registerUSer.phone, password: p1});
                this.loading = false;
                this.dialogRef.close();
            }
        }, error => {
            this.openStatusFinishRegister(false);
            this.loading = false;
        })
    }

    validateConfirm(p1: string, p2: string): boolean {
        if (p1 === p2) {
            return true
        }
        return false
    };

    resetMsg() {
        this.msgConfirmErr = '';
    }
}
