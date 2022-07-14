import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {ShowProfileService} from "../_service/show-profile/show-profile.service";
import {SidebarService} from "../_service/side-bar/sidebar.service";
import {AuthenticationService} from "../_service/auth/authentication.service";
import {UpdatePasswordComponent} from "../auth/update-password/update-password.component";
import {MatDialog} from "@angular/material/dialog";
import {InputOtpEditEapComponent} from "../input-otp-edit-eap/input-otp-edit-eap.component";
import {UpdateEapService} from "../_service/auth/update-eap.service";
import {Router} from "@angular/router";
import {ConfirmAcctionComponent} from "../confirm-acction/confirm-acction.component";
import {TranslateService} from "@ngx-translate/core";
import {DialogStatusUpdateComponent} from "../common-item/dialog-status-update/dialog-status-update.component";

@Component({
    selector: 'app-information-bnpl',
    templateUrl: './information-account.component.html',
    styleUrls: ['./information-account.component.scss'],
})

export class InformationAccountComponent implements OnInit {
    @ViewChild('usernameInput') usernameElement!: ElementRef;
    @ViewChild('emailInput') emailElement!: ElementRef;
    linkImgEdit = '../../assets/images/edit.png';
    linkImgComplete = '../../assets/images/completeEdit.png';
    linkImgCancel = '../../assets/images/cancel.png';
    user?: any;
    phone: String;
    loading: boolean = false;
    mgsError: string = "";
    idUser: string;
    openEditUsername: boolean = false;
    openEditEmail: boolean = false;
    username: string = '';
    email: string = '';
    oldUsername: string = '';
    oldEmail: string = '';
    isFocus: boolean = false;
    msgErrorEmail = '';
    msgErrorName = '';

    constructor(private router: Router,
                public dialog: MatDialog,
                private showProfileService: ShowProfileService,
                private sidebarService: SidebarService,
                private authenticationService: AuthenticationService,
                private updateEapService: UpdateEapService,
                private translateService: TranslateService) {
    }

    ngOnInit() {
        setTimeout(() => {
            this.sidebarService.isShowSidebarSubject$.next(true);
            this.sidebarService.itemSelectObject$.next("infoEap");
        }, 0);
        this.getInformationUser();
    }

    getInformationUser() {
        this.loading = true;
        this.user = {...this.user, username: ""};
        let id = this.authenticationService.userCurrentSubject$.getValue()._id;
        console.log(id);
        this.showProfileService.showProfileByPhone(id).subscribe(data => {
            if (data.status) {
                this.user = data.data;
                this.authenticationService.user$.next(data.data);
                this.authenticationService.userCurrentSubject$.next(data.data);
                this.idUser = data.data._id;
                this.username = data.data.username;
                this.oldUsername = data.data.username;
                this.email = data.data.email;
                this.oldEmail = data.data.email;
                this.loading = false;
            }
        }, error => {
            this.mgsError = "Lấy thông tin thất bại";
            this.loading = false;
        })
    }

    openDialogChangePassword(id: string) {
        const dialogRef = this.dialog.open(UpdatePasswordComponent, {
            width: '100%',
            data: id,
            panelClass: ['animate__animated', 'animate__faster', 'animate__zoomIn', 'change-pass-animate']
        });

        dialogRef.afterClosed().subscribe(result => {
        });
    }

    openInputEditEmail(e: any) {
        e.stopPropagation();
        this.openEditEmail = true;
        if (this.openEditUsername) {
            this.openEditUsername = false;
            this.username = this.authenticationService.userCurrentSubject$.getValue().username;
        }
        setTimeout(() => {
            this.emailElement.nativeElement.focus();
        }, 0)
    }

    openInputEditUserName(e: any) {
        e.stopPropagation();
        this.openEditUsername = true;
        if (this.openEditEmail) {
            this.openEditEmail = false
            this.email = this.authenticationService.userCurrentSubject$.getValue().email;
        }
        setTimeout(() => {
            this.usernameElement.nativeElement.focus();
        }, 0)
    }

    openDialogInputOtp(email: string) {
        let pattern = /^(\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+)$/;
        if (email === ''){
            this.msgErrorEmail = this.translateService.instant('accountEap.invalidEmptyEmail');
            this.isFocus = true;
            return;
        }else if (!pattern.test(email)) {
            this.msgErrorEmail = this.translateService.instant('accountEap.invalidEmail');
            this.isFocus = true;
            return;
        } else if (email === this.oldEmail){
            this.openEditEmail  = false;
            return;
        }
        let currentEmail = this.authenticationService.userCurrentSubject$.getValue().email;
        let phone = this.authenticationService.userCurrentSubject$.getValue().phone;
        this.updateEapService.getOtp({email: currentEmail, new_email: email, phone: phone})
            .subscribe(next => {
                this.isFocus = true;
                this.msgErrorEmail = '';
                if (next.status) {
                    const dialogRef = this.dialog.open(InputOtpEditEapComponent, {
                        width: '100%',
                        data: {email: currentEmail, new_email: email},
                        panelClass: ['animate__animated', 'animate__faster', 'animate__zoomIn', 'otp-email-animate']
                    });
                    dialogRef.afterClosed().subscribe(result => {
                        if (result !== null) {
                            let data = {
                                email: currentEmail,
                                new_email: email,
                                phone: phone,
                                token: result
                            }
                            this.updateEapService.updateEmail(data).subscribe(next => {
                                this.openDialogStatusUpdate(true,
                                    this.translateService.instant('accountEap.statusSuccess'));
                            },error => {
                                this.email = this.oldEmail;
                                this.openDialogStatusUpdate(false,
                                    this.translateService.instant('accountEap.statusFail'));
                            })
                        }
                    });
                }
            }, error => {
                if (error.error.statusCode == 1000){
                    this.msgErrorEmail = this.translateService.instant('accountEap.existEmail');
                    this.isFocus = true;
                }
            });
    }

    editUsername(name:string) {
        let pattern = /^[^(!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9)]{2,64}$/;
        if (name === '') {
            this.msgErrorName = this.translateService.instant('accountEap.invalidEmptyName');
            this.isFocus = true;
            return;
        } else if (!pattern.test(name)) {
            this.msgErrorName = this.translateService.instant('accountEap.invalidFullName');
            this.isFocus = true;
            return;
        } else if (name === this.oldUsername) {
            this.openEditUsername = false;
            return;
        }
        let id = this.authenticationService.userCurrentSubject$.getValue()._id;
        this.updateEapService.updatePassword(id, {username: this.username}).subscribe(next=>{
            this.openDialogStatusUpdate(true,
                this.translateService.instant('accountEap.statusSuccessName'));
        },error => {
            this.openDialogStatusUpdate(true,
                this.translateService.instant('accountEap.statusFailName'));
        })
    }

    reloadLocal() {
        let id = this.authenticationService.userCurrentSubject$.getValue()._id;
        this.showProfileService.showProfileByPhone(id).subscribe(data => {
            console.log(data)
            let newUser = {
                _id: data.data._id,
                username: data.data.username,
                email:data.data.email,
                phone: data.data.phone
            }
            localStorage.setItem('userCurrent', JSON.stringify(newUser));
            this.authenticationService.userCurrentSubject$.next(newUser);
        })
    }

    // @HostListener('click', ['$event']) onClick(event) {
    //     console.log(event.target.id)
    //     if (this.isFocus && event.target.id !== "editUsername" && event.target.id !== "editEmail") {
    //         if (event.target.id === "confirm-edit-name") {
    //             this.isFocus = false;
    //             this.editUsername();
    //         } else if (event.target.id === "confirm-edit-email") {
    //             this.isFocus = false;
    //             this.openDialogInputOtp(this.email);
    //         } else {
    //             this.openEditUsername = false;
    //             this.openEditEmail = false;
    //             this.username = this.oldUsername;
    //             this.email = this.oldEmail;
    //             this.msgErrorEmail = '';
    //         }
    //     }
    // }

    cancelEditUserName(){
        this.openEditUsername = false;
        this.username = this.oldUsername;
        this.msgErrorName = '';
    }

    cancelEditEmail(){
        this.openEditEmail = false;
        this.msgErrorEmail = '';
        this.email = this.oldEmail;
    }

    openDialogStatusUpdate(status:boolean,msg:string){
        const dialogRef = this.dialog.open(DialogStatusUpdateComponent, {
            width: '100%',
            data: {isStatus: status, messageStatus: msg},
            panelClass: ['animate__animated', 'animate__faster', 'animate__zoomIn', 'stt__update']
        });
        dialogRef.afterClosed().subscribe(result => {
            this.reloadLocal();
            this.openEditEmail = false;
            this.openEditUsername = false;
        });
    }

}
