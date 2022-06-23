import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AuthenticationService} from "../../_service/auth/authentication.service";
import {ProgressSpinnerMode} from "@angular/material/progress-spinner/progress-spinner";
import {ThemePalette} from "@angular/material/core/common-behaviors/color";
import {RegisterComponent} from "../register/register.component";
import {ForgotPasswordComponent} from "../forgot-password/forgot-password.component";
import {User} from "../../_model/user";
import {TranslateService} from "@ngx-translate/core";
import {SidebarService} from "../../_service/side-bar/sidebar.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    linkImg = "../../../assets/images/Warning.png";
    userForm: FormGroup = new FormGroup({
        phone_email: new FormControl("", [Validators.required,
            Validators.pattern('^(0[0-9]{9})$|^(\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+)$')]),
        password: new FormControl("", [Validators.required])
    });
    validateMessage = {
        'phone_email': [
            {type: "required", message: this.translateService.instant('login.msgEmptyPhone')},
            {type: "pattern", message: this.translateService.instant('login.pattern')}
        ],
        'password': [
            {type: "required", message: this.translateService.instant('login.msgEmptyPassword')}
        ]
    };

    isLoggedIn = false;
    countFail = 0;
    errorMessageAccount = '';
    errorMessagePass = '';
    loading: boolean = false;
    color: ThemePalette = "primary";
    mode: ProgressSpinnerMode = 'indeterminate';
    value = 50;
    phoneAfterReset: string = '';
    user:User = null;
    isShowButtonExit = false;

    constructor(public dialogRef: MatDialogRef<LoginComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                public dialog: MatDialog,
                public router: Router,
                public authenticationService: AuthenticationService,
                public translateService: TranslateService,
                public sidebarService: SidebarService
    ) {
    }

    ngOnInit(): void {
        if (this.authenticationService.currentAccessTokenValue) {

            this.router.navigate(['/auth']);
        }
        this.phoneAfterReset = this.data;
        this.userForm.setValue({phone_email: this.phoneAfterReset, password: ""})
    };

    submit() {
        if (this.userForm.invalid) return;
        this.loading = true;
        this.authenticationService.loginUser(this.userForm.value).subscribe({
            next: res => {
                if (res.status) {
                    let user = {...this.user,
                        _id: res.data._id,
                        username: res.data.username,
                        email:res.data.email,
                        phone: res.data.phone}
                    localStorage.setItem('accessToken', JSON.stringify(res.token));
                    localStorage.setItem('refreshToken', JSON.stringify(res.data.refreshToken));
                    localStorage.setItem('userCurrent', JSON.stringify(user));
                    this.authenticationService.accessTokenSubject$.next(res.token);
                    this.authenticationService.userCurrentSubject$.next(<User>user);
                    this.authenticationService.refreshTokenSubject$.next(res.data.refreshToken);
                    this.sidebarService.isShowMenu$.next(false);
                    this.router.navigate(['/auth']).then();
                    this.dialogRef.close();
                    this.loading = false;
                }
            },
            error: err => {
                console.log(err);
                this.errorMessagePass = '';
                this.errorMessageAccount = '';
                this.isLoggedIn = false;
                if (err.error.statusCode == 1002) {
                    this.errorMessageAccount = this.translateService.instant('login.account');
                    this.loading = false;
                } else if (err.error.statusCode == 1001) {
                    this.errorMessageAccount = this.translateService.instant('login.block');
                    this.isShowButtonExit = true;
                    console.log("isbtn", this.isShowButtonExit)
                    this.loading = false;
                }else if (err.error.statusCode == 1003) {
                    this.errorMessagePass = this.translateService.instant('login.wrongPass');
                    this.countFail = err.error.countFail;
                    this.loading = false;
                } else if (err.error.statusCode == 1004) {
                    this.errorMessageAccount = this.translateService.instant('login.fail5');
                    this.isShowButtonExit = true;
                    console.log("isbtn", this.isShowButtonExit)
                    this.loading = false;
                }
            }
        })
    }

    openDialogRegister() {
        this.dialogRef.close();
        const dialogRef = this.dialog.open(RegisterComponent, {
            width: '100%',
            panelClass: ['animate__animated', 'animate__zoomIn', 'animate__faster', 'animate__register']
        });

        dialogRef.afterClosed().subscribe(result => {
        });
    }

    close() {
        document.getElementsByClassName("animate__login")[0].classList.remove("animate__zoomIn")
        document.getElementsByClassName("animate__login")[0].classList.add("animate__zoomOut");
        setTimeout(() => {
            this.dialogRef.close();
        }, 100);
        this.isShowButtonExit = false;
    }

    openDialogForgetPassword() {
        this.dialogRef.close();
        const dialogRef = this.dialog.open(ForgotPasswordComponent, {
            width: '100%',
            panelClass: ['animate__animated', 'animate__zoomIn', 'animate__faster']
        });

        dialogRef.afterClosed().subscribe(result => {
        });
    }

    resetMsg() {
        this.errorMessageAccount = '';
        this.errorMessagePass = ''
    }
}

