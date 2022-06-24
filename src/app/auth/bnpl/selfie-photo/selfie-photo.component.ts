import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../_service/auth/authentication.service";
import {PictureService, NCardSide} from "../../../_service/kyc/picture.service";
import {AccountBnplService} from "../../../_service/auth/account-bnpl.service";
import {WaitingConfirmPhoneComponent} from "../waiting-confirm-phone/waiting-confirm.component-phone";

@Component({
    selector: 'app-selfie-photo',
    templateUrl: './selfie-photo.component.html',
    styleUrls: ['./selfie-photo.component.scss'],
})
export class SelfiePhotoComponent implements OnInit {

    selfieImage = '';
    citizenIdFrontImage = '';
    citizenIdBackImage = '';
    citizenId!: FormControl;
    isExistNid: boolean = false;
    isShowGuide = false;
    // formGroup!: FormGroup;
    apiResults: any

    constructor(
        private dialog: MatDialog,
        public pictureService: PictureService,
        private http: HttpClient,
        private authService: AuthenticationService,
        private router: Router,
        private accountBnplService: AccountBnplService
    ) {
    }

    ngOnInit(): void {
        this.pictureService.clearData();
        // if (this.authService.step$.getValue() === 0) {
        //     this.router.navigate(['/infor-bnpl']);
        // }
        this.citizenId = new FormControl('', [Validators.pattern('^[0-9]{9}|[0-9]{12}$'), Validators.required])
    }

    onFileChanged(event: any) {
        console.log(event);
    }

    onDeleteImage() {
        this.pictureService.deleteImage(NCardSide.selfie);
    }

    startCaptureImage() {
        this.isShowGuide = false;
        if (this.pictureService.selfieImageComplete$.getValue()) {
            this.onDeleteImage()
        }
        this.pictureService.selfieScreenShot();
    }

    onSelfieContinue() {
        if (this.citizenId.invalid) return;
        this.accountBnplService.isCheckNidBnpl({nid: this.citizenId.value}).subscribe(next => {
            console.log(next);
            if (next.status) {
                this.isExistNid = true;
                console.log(this.isExistNid);
                return
            }
        }, error => {
            if (error.error.statusCode == 900) {
                this.isExistNid = false;
                this.authService.user$.next({...this.authService.user$.getValue(), citizenId: this.citizenId.value});
                let data = this.createDataBody();
                const dialogRef = this.dialog.open(WaitingConfirmPhoneComponent, {
                    width: '100%',
                    data: data
                });
                dialogRef.afterClosed().subscribe(result => {
                });
            }
        })

    }

    keyPress(e: any) {
        const pattern = /[0-9]/;
        let inputChar = String.fromCharCode(e.charCode);
        if (!pattern.test(inputChar)) {
            e.preventDefault();
        }
    }

    handleNid(e: any) {
        this.isExistNid = false;
    }

    handleBase64FileContent(base64: string): string {
        let fileContent = '';
        let index1 = base64.indexOf(":");
        let index2 = base64.indexOf(";");
        fileContent = base64.substring(index1 + 1, index2);
        return fileContent;
    }

    handlePhone(phone: string): string {
        let phoneNumber = '';
        phoneNumber = phone.slice(1);
        phoneNumber = '84' + phoneNumber;
        return phoneNumber
    }

    // createDataBody(): any {
    //     let phone = this.handlePhone(this.authService.userCurrentSubject$.getValue().phone);
    //     let fileContent = this.handleBase64FileContent(this.pictureService.base64Selfie$.getValue());
    //     let suffixFile = fileContent.split('/')[1];
    //     let fileName = this.authService.userCurrentSubject$.getValue().phone + "." + suffixFile;
    //     let data = {
    //         nid: this.citizenId.value,
    //         phone: phone,
    //         filename: fileName,
    //         filebody: this.pictureService.base64Selfie$.getValue()
    //     }
    //     return data;
    // }

    createDataBody(): any {
      let phone = this.handlePhone(this.authService.userCurrentSubject$.getValue().phone);
      let fileContent = this.handleBase64FileContent(this.pictureService.base64Selfie$.getValue());
      let suffixFile = fileContent.split('/')[1];
      let fileName = this.authService.userCurrentSubject$.getValue().phone+"."+suffixFile;
      let data =  {
        TransactionID: "40f8e4f1-31ee-4406-a6ca-0b27ee1157y6",
        NationalID: this.citizenId.value,
        PhoneNumber: phone,
        DocumentInfo: [
          {
            FileKey: "Selfie",
            FileContent: fileContent,
            FileName: fileName,
            FileBody: this.pictureService.base64Selfie$.getValue()
          }
        ]
      }
      return data;
    }

    showGuideShot() {
        this.isShowGuide = true;
    }
}
