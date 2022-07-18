import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UpdateEapService} from "../../_service/auth/update-eap.service";
import {StatusUpdatePasswordComponent} from "../status-update-password/status-update-password.component";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {DialogStatusUpdateComponent} from "../../common-item/dialog-status-update/dialog-status-update.component";

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
})
export class UpdatePasswordComponent implements OnInit {
  passwordForm: FormGroup= new FormGroup({
    currentPassword: new FormControl("",[Validators.required]),
    newPassword: new FormControl("",[Validators.required,
      Validators.pattern('^(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d@$!%*#?&~^\\-+_\\(\\)]{6,}$')
    ]),
    verifyPassword: new FormControl("",[Validators.required,
      Validators.pattern('^(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d@$!%*#?&~^\\-+_\\(\\)]{6,}$')])
  });
  validateMessage = {
    'currentPassword' : [
      {type: "required",message: this.translateService.instant('updatePassword.requiredOldPass')},
    ],
    'newPassword' : [
      {type: "required",message: this.translateService.instant('updatePassword.requiredNewPass')},
      {type: "pattern",message: this.translateService.instant('updatePassword.patternNewPass')},
    ],
    'verifyPassword' : [
      {type: "required",message: this.translateService.instant('updatePassword.requiredVerifyPass')},
      {type: "pattern",message: this.translateService.instant('updatePassword.patternNewPass')},
    ]
  };

  errConfirmPassword:string = '';
  errWrongPassword:string = '';
  errOldNewPassword:string = '';
  isChangeOld = false;
  isChangeNew = false;
  isChangeConfirm = false;
  constructor(public dialogRef: MatDialogRef<UpdatePasswordComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialog: MatDialog,
              private updateEapService: UpdateEapService,
              private router: Router,
              private translateService: TranslateService) { }

  ngOnInit() {
    console.log(this.data);
  }

  closePopup() {
    document.getElementsByClassName("change-pass-animate")[0].classList.remove("animate__zoomIn")
    document.getElementsByClassName("change-pass-animate")[0].classList.add("animate__zoomOut");
    this.dialog.closeAll();
  }

  submit() {
    if (this.passwordForm.invalid) return;
    let oldPassword = this.passwordForm.value.currentPassword;
    let p1 = this.passwordForm.value.newPassword;
    let p2 = this.passwordForm.value.verifyPassword;
    if (p1!==p2){
      this.errConfirmPassword = this.translateService.instant('updatePassword.errConfirmPass');
      return;
    }
    if (p1 === oldPassword) {
      this.errOldNewPassword = this.translateService.instant('updatePassword.errONPass');
      return;
    }
    console.log(oldPassword);
    console.log(p1);
    this.updateEapService.updatePassword(this.data,{password:oldPassword,new_password:p1}).subscribe(next=>{
      console.log(next);
      if (next.status) {
        this.resetMsg();
        this.dialogRef.close();
        this.openDialogStatus();
      }
    },error => {
      console.log(error);
      this.resetMsg();
      if (error.error.statusCode == 1003) {
        this.errWrongPassword = this.translateService.instant('updatePassword.errWrongPass');
      }
    })
  }

  openDialogStatus() {
    const dialogRef = this.dialog.open(DialogStatusUpdateComponent, {
      width: '100%',
      data : {isStatus: true,
        messageStatus: this.translateService.instant("updatePassword.status"),
        messageStatusMobile: this.translateService.instant("updatePassword.statusMobile")},
      panelClass: ['animate__animated','animate__zoomIn','animate__faster', 'stt__update']
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }


  resetMsg(){
    this.errWrongPassword = '';
    this.errConfirmPassword = '';
    this.errOldNewPassword = '';
  }
}
