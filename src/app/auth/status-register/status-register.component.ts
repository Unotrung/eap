import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AuthenticationService} from "../../_service/auth/authentication.service";
import {Router} from "@angular/router";
import {User} from "../../_model/user";

@Component({
    selector: 'app-status-register',
    templateUrl: './status-register.component.html',
    styleUrls: ['./status-register.component.scss'],
})
export class StatusRegisterComponent implements OnInit {
    userLogin = {
        phone_email: "",
        password: ""
    }
    loading: boolean = false;
    countDown: number = 5;
    isErrorRegister: boolean = false;
    isClose = false;
    user: User = null;

    constructor(public dialogRef: MatDialogRef<StatusRegisterComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                public dialog: MatDialog,
                private authenticationService: AuthenticationService,
                public router: Router) {
    }

    ngOnInit() {
        if (this.data === false) {
            this.isErrorRegister = true;
        } else {
            this.userLogin = {phone_email: this.data.phone, password: this.data.password}
        }
        this.callLogin(5, this.userLogin);
    }

    onNoClick() {
        this.isClose = true;
        document.getElementsByClassName("animate__finish")[0].classList.remove("animate__slideInDown")
        document.getElementsByClassName("animate__finish")[0].classList.add("animate__zoomOut");
        setTimeout(() => {
            this.dialogRef.close();
        }, 100);
    }

    autoLoginAfterRegister(userLogin: any) {
        this.loading = true;
        this.authenticationService.loginUser(userLogin).subscribe(res => {
            if (res.status) {
                let user = {
                    ...this.user,
                    _id: res.data._id,
                    username: res.data.username,
                    email: res.data.email,
                    phone: res.data.phone}
                localStorage.setItem('accessToken', JSON.stringify(res.token));
                localStorage.setItem('refreshToken', JSON.stringify(res.data.refreshToken));
                localStorage.setItem('userCurrent', JSON.stringify(user));
                this.authenticationService.accessTokenSubject$.next(res.token);
                this.authenticationService.userCurrentSubject$.next(user);
                this.authenticationService.refreshTokenSubject$.next(res.data.refreshToken);
                this.dialog.closeAll();
                this.router.navigateByUrl('/');
                this.loading = false;
            }
        }, error => {
            this.router.navigate(['/'])
        })
    }

    callLogin(second: number, user: any) {
        let currentSecond = second;
        const counter = setInterval(() => {
            currentSecond = currentSecond - 1;
            if (this.isClose) return;
            this.countDown = currentSecond;
            if (currentSecond <= 0) {
                this.autoLoginAfterRegister(user);
                clearInterval(counter)
            }
        }, 1000);
    }

}
