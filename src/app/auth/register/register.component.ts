import {Component, Inject, OnInit} from '@angular/core';
import {
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {GetOTPComponent} from "../get-otp/get-otp.component";
import {RegisterService} from "../../_service/auth/register.service";
import {LoginComponent} from "../login/login.component";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
    linkValid: string = "../../../assets/images/Warning.png";
    registerForm: FormGroup = new FormGroup({
        username: new FormControl("", [Validators.required,
            Validators.pattern("[^(!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?0-9)]{2,64}")
        ]),
        phone: new FormControl("", [Validators.required,
            Validators.pattern("0[0-9]{9}")
        ]),
        email: new FormControl("", [Validators.required,
            Validators.pattern("^(\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+)$")
        ]),
    });
    validateMessage = {
        'username': [
            {type: "required", message: this.translateService.instant('register.requiredName')},
            {type: "minlength", message: this.translateService.instant('register.minlengthName')},
            {type: "maxlength", message: this.translateService.instant('register.maxlengthName')},
            {type: "pattern", message: this.translateService.instant('register.patternName')}
        ],
        'phone': [
            {type: "required", message: this.translateService.instant('register.requiredPhone')},
            {type: "pattern", message: this.translateService.instant('register.patternPhone')}
        ],
        'email': [
            {type: "required", message: this.translateService.instant('register.requiredEmail')},
            {type: "pattern", message: this.translateService.instant('register.patternEmail')},
        ]
    };

    isExistAccount: boolean = false;
    loading: boolean = false;
    errorMsgPhone = '';
    errorMsgEmail = '';

    constructor(
        public dialogRef: MatDialogRef<RegisterComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        private router: Router,
        public dialog: MatDialog,
        private registerService: RegisterService,
        public translateService: TranslateService
    ) {
    }

    ngOnInit() {
        if (this.data !== null) {
            this.registerForm.setValue({
                username: this.data.nameBnpl,
                phone: this.data.phoneBnpl,
                email: ""
            })
        }
    }


    close() {
        document.getElementsByClassName("animate__register")[0].classList.remove("animate__zoomIn")
        document.getElementsByClassName("animate__register")[0].classList.add("animate__zoomOut");
        setTimeout(() => {
            this.dialogRef.close();
        }, 100);
    }

    openDialogGetOtp(data: any) {
        const dialogRef = this.dialog.open(GetOTPComponent, {
            width: '100%',
            data: data,
            panelClass: ['animate__animated', 'animate__zoomIn', 'animate__faster', 'get-otp-animate']
        });

        dialogRef.afterClosed().subscribe(result => {
        });
    }

    submit() {
        if (this.registerForm.invalid) return;
        this.loading = true;
        this.registerService.registerUser(this.registerForm.value).subscribe(next => {
            if (next.status) {
                console.log(next);
                this.openDialogGetOtp(next.data);
                this.isExistAccount = false;
                this.resetMsg();
                this.loading = false;
                this.dialogRef.close();
            }
        }, error => {
            console.log(error)
            this.resetMsg();
            if (error.error.statusCode === 2010) {
                this.errorMsgPhone = this.translateService.instant('register.errorPhone');
            } else if (error.error.statusCode == 2011) {
                this.errorMsgEmail = this.translateService.instant('register.errorEmail');
            } else if (error.error.statusCode == 1004) {
                this.errorMsgEmail = this.translateService.instant('register.BlockEmail');
            }
            this.isExistAccount = true;
            this.loading = false;
        })
    }

    openDialogLogin() {
        this.dialogRef.close();
        const dialogRef = this.dialog.open(LoginComponent, {
            width: '100%',
            panelClass: ['animate__animated', 'animate__zoomIn', 'animate__faster', 'animate__login']
        });

        dialogRef.afterClosed().subscribe(result => {
        });
    }

    resetMsg() {
        this.errorMsgPhone = '';
        this.errorMsgEmail = '';
    }

    keyPress(e: any) {
        const pattern = /[0-9]/;
        let inputChar = String.fromCharCode(e.charCode);
        if (!pattern.test(inputChar)) {
            e.preventDefault();
        }
    }
}
