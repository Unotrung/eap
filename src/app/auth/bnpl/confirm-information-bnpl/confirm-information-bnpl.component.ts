import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../_service/auth/authentication.service";
import {CustomerInformationService} from "../../../_service/information-bnpl/customer-information.service";
import {WaitingConfirmComponent} from "../waiting-confirm/waiting-confirm.component";
import {LanguageService} from "../../../_service/language/language.service";
import {Relationship} from "../../../_model/relationship";

@Component({
    selector: 'app-confirm-information-bnpl',
    templateUrl: './confirm-information-bnpl.component.html',
    styleUrls: ['./confirm-information-bnpl.component.scss'],
})
export class ConfirmInformationBnplComponent implements OnInit {
    address = '';
    addressTemp = '';
    lang = '';
    showGender = '';
    showRelationship = '';
    personalTitleOptions: Relationship[]

    constructor(
        public dialog: MatDialog,
        public customerInformationService: CustomerInformationService,
        private router: Router,
        private authService: AuthenticationService,
        protected languageService: LanguageService
    ) {
    }

    ngOnInit(): void {
        // if (this.authService.step$.getValue() === 0) {
        //     this.router.navigate(['/infor-bnpl']);
        // }
        this.handelDataConfirm();
    }

    async getAllRelationship(): Promise<any> {
        let res = await this.customerInformationService.getAllRelationship().toPromise();
        this.personalTitleOptions = [...res.data];
    }

    async handelDataConfirm() {
        await this.getAllRelationship();
        this.languageService.lang$.subscribe(x => {
            this.lang = x;
            this.handleDataShowLanguage(this.lang)
        });
        console.log("text")
        console.log(this.customerInformationService.customerInfo$.getValue())
        this.address = `${this.customerInformationService.customerInfo$.getValue().street}, 
    ${this.customerInformationService.customerInfo$.getValue().ward}, 
    ${this.customerInformationService.customerInfo$.getValue().district}, 
    ${this.customerInformationService.customerInfo$.getValue().city}`;

        this.addressTemp = `${this.customerInformationService.customerInfo$.getValue().temporaryStreet}, 
    ${this.customerInformationService.customerInfo$.getValue().temporaryWard}, 
    ${this.customerInformationService.customerInfo$.getValue().temporaryDistrict}, 
    ${this.customerInformationService.customerInfo$.getValue().temporaryCity}`;
    }

    onSendConfirm() {
        const dialogRef = this.dialog.open(WaitingConfirmComponent, {
            width: '100%'
        });
        dialogRef.afterClosed().subscribe(result => {
        });
    }

    handleDataShowLanguage(lang: string) {
        if (lang == 'en') {
            if (this.customerInformationService.customerInfo$.getValue().sex == 'Nam') {
                this.showGender = "Male"
            } else {
                this.showGender = 'Female'
            }
            let relTemp = '';
            let listRelationshipEn = ["Brother", "Father", "Sister", "Daughter", "Son", "Mother",
                "Other family relationship", "Spouse"];
            let relValue = this.customerInformationService.customerInfo$.getValue().personal_title_ref;
            this.personalTitleOptions.forEach(function (rel, index) {
                if (relValue == rel.Text) {
                    relTemp = listRelationshipEn[index];
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
