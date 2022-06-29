import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ForgotPasswordService} from "../../_service/auth/forgot-password.service";
import {GetOTPComponent} from "../get-otp/get-otp.component";
import {OtpResetPasswordComponent} from "../otp-reset-password/otp-reset-password.component";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  linkValid:string = "../../../assets/images/Warning.png";
  loading = false;
  isBlock = false;
  formPhone:FormGroup= new FormGroup({
    phone_email: new FormControl("",[Validators.required,
      Validators.pattern("^(0[0-9]{9})$|^(\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+)$")
    ])
  });

  validateMessage=[
      {type: 'required', message: this.translateService.instant('forgotPass.required')},
      {type: 'pattern', message: this.translateService.instant('forgotPass.pattern')}];

  isExist:boolean = true;
  constructor(public dialogRef: MatDialogRef<ForgotPasswordComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialog: MatDialog,
              private forgotPasswordService: ForgotPasswordService,
              private router: Router,
              public translateService: TranslateService) { }

  ngOnInit() {
    if (this.data !== null) {
      this.formPhone.setValue({
        phone_email: this.data.phoneAdmin,
      })
    }
  }

  getOtpToResetPassword(){
    this.loading = true;
    this.forgotPasswordService.getOtpResetPassword(this.formPhone.value).subscribe(next=>{
      if (next.status){
        this.isExist = true;
        this.loading = false;
        this.openDialogGetOtp({phone_email:this.formPhone.value.phone_email,email:next.email});
        this.dialogRef.close();
      }
    },error => {
      console.log("err", error)
      if (error.error.statusCode === 900){
        this.loading = false;
        this.isExist = false;
      } else if (error.error.statusCode === 1004) {
        this.isBlock = true;
      }
      else {
        this.router.navigate(['/error'])
      }
    })
  }

  closeDialog() {
    this.isBlock = false;
    document.getElementsByClassName("animate__animated")[0].classList.remove("animate__zoomIn")
    document.getElementsByClassName("animate__animated")[0].classList.add("animate__zoomOut");
    setTimeout(()=>{this.dialogRef.close();}, 500);
    }

  openDialogGetOtp(data:any) {
    const dialogRef = this.dialog.open(OtpResetPasswordComponent, {
      width: '100%',
      data: data,
      panelClass: ['animate__animated','animate__zoomIn','animate__faster','input-otp-animate']
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  submit() {
    if (this.formPhone.invalid) return;
    this.getOtpToResetPassword();
  }

  resetMsg() {
    this.isExist = true;
  }
}
