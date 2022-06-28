import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../_service/auth/authentication.service";
import {CustomerInformationService} from "../../../_service/information-bnpl/customer-information.service";
import {WaitingConfirmComponent} from "../waiting-confirm/waiting-confirm.component";
import {LanguageService} from "../../../_service/language/language.service";

@Component({
    selector: 'app-confirm-information-bnpl',
    templateUrl: './confirm-information-bnpl.component.html',
    styleUrls: ['./confirm-information-bnpl.component.scss'],
})
export class ConfirmInformationBnplComponent implements OnInit {
    address = '';
    userBnpl: any;
    lang = '';
    showGender = '';
    showRelationship = '';
    listRelationshipEn = ["Father", "Mother", "Brother", "Sister", "Son", "Daughter",
        "Spouse", "Other family relationship"];
    listRelationshipVi = ["Bố", "Mẹ", "Anh em trai", "Chị em gái", "Con trai", "Con gái",
        "Vợ chồng", "Mối quan hệ khác"]

    constructor(
        public dialog: MatDialog,
        public customerInformationService: CustomerInformationService,
        private router: Router,
        private authService: AuthenticationService,
        protected languageService: LanguageService
    ) {
    }

    ngOnInit(): void {
        this.languageService.lang$.subscribe(x => {this.lang = x;this.handleDataShowLanguage(this.lang)});

        // if (this.authService.step$.getValue() === 0) {
        //     this.router.navigate(['/infor-bnpl']);
        // }
        this.address = `${this.customerInformationService.customerInfo$.getValue().street}, 
    ${this.customerInformationService.customerInfo$.getValue().ward}, 
    ${this.customerInformationService.customerInfo$.getValue().district}, 
    ${this.customerInformationService.customerInfo$.getValue().city}`;
    }

    onSendConfirm() {
        const dialogRef = this.dialog.open(WaitingConfirmComponent, {
            width: '100%'
        });
        dialogRef.afterClosed().subscribe(result => {
        });
    }

    handleDataShowLanguage(lang: string){
        if (lang=='en') {
            if (this.customerInformationService.customerInfo$.getValue().sex == 'Nam') {
                this.showGender = "Male"
            } else {
                this.showGender = 'Female'
            }
            let relTemp = '';
            let listRelationshipEn = ["Father", "Mother", "Brother", "Sister", "Son", "Daughter",
                "Spouse", "Other family relationship"];
            let relValue = this.customerInformationService.customerInfo$.getValue().personal_title_ref;
            this.listRelationshipVi.forEach(function (rel,index) {
                if (relValue == rel ){
                    relTemp = listRelationshipEn[index];
                    console.log(relTemp);
                }
            })
            this.showRelationship = relTemp;
        } else {
            this.showGender = this.customerInformationService.customerInfo$.getValue().sex;
            this.showRelationship = this.customerInformationService.customerInfo$.getValue().personal_title_ref
        }
    }

    backForm() {
        this.router.navigate(["/register-infor-bnpl"])
    }
}
