import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {LoginComponent} from "../login/login.component";

@Component({
    selector: 'app-status-reset-password',
    templateUrl: './status-reset-password.component.html',
    styleUrls: ['./status-reset-password.component.scss'],
})
export class StatusResetPasswordComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<StatusResetPasswordComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                public dialog: MatDialog,
                private router: Router) {
    }

    ngOnInit() {

    }

    goDialogLogin() {
        this.dialog.closeAll();
        this.openDialogLogin(this.data);
    }

    openDialogLogin(phone_email: string) {
        const dialogRef = this.dialog.open(LoginComponent, {
            width: '100%',
            data: phone_email,
            panelClass: ['animate__animated', 'animate__slideInDown', 'animate__faster', 'login-animate']
        });

        dialogRef.afterClosed().subscribe(result => {
        });
    }

    closePopup() {
        document.getElementsByClassName("stt-reset-animate")[0].classList.remove("animate__zoomIn")
        document.getElementsByClassName("stt-reset-animate")[0].classList.add("animate__zoomOut");
        this.dialogRef.close();
        this.dialog.closeAll();
    }
}
