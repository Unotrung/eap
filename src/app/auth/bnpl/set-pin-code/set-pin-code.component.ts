import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {CustomerInformationService} from "../../../_service/information-bnpl/customer-information.service";
import {AuthenticationService} from "../../../_service/auth/authentication.service";
import {AccountBnplService} from "../../../_service/auth/account-bnpl.service";
import {CodeInputComponent} from "angular-code-input";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-set-pin-code',
    templateUrl: './set-pin-code.component.html',
    styleUrls: ['./set-pin-code.component.scss'],
})
export class SetPinCodeComponent implements OnInit {

    pinCode = '';
    verifyPinCode = '';
    isCheckPin: boolean = false;
    userBnpl: any;
    messageError = "";
    msgVerifyError = '';
    changeBorderTop = false;
    changeBorderBottom = false;
    @ViewChild('codeInput') codeInput !: CodeInputComponent;

    constructor(private router: Router,
                private  customerInformationService: CustomerInformationService,
                private  authService: AuthenticationService,
                private  accountBnplService: AccountBnplService,
                private translateService: TranslateService) {
    }

    ngOnInit() {
        // if (this.authService.step$.getValue() === 0) {
        //     this.router.navigate(['/infor-bnpl']);
        // }
        this.userBnpl = {};
    }

    onCodeChanged(code: string) {
        this.pinCode = code;
        this.msgVerifyError = '';
        this.messageError = '';
    }

    onCodeCompleted(code: string) {
        this.pinCode = code;
    }

    onCodeChangedVerify(code: string) {
        this.verifyPinCode = code;
        this.msgVerifyError = '';
        this.messageError = '';
    }

    onCodeCompletedVerify(code: string) {
        this.verifyPinCode = code;
    }

    checkPin() {
        return this.isCheckPin = (this.verifyPinCode === this.pinCode) ? true : false;
    }

    submitSetPinCode() {
        this.checkPin();
        if (this.isCheckPin == true) {
            this.router.navigate(['/choose-provider']).then();
            // this.userBnpl = {...this.customerInformationService.customerInfo$.getValue(), pin: this.pinCode};
            // console.log(this.userBnpl);
            // this.accountBnplService.registerUserBnpl(this.userBnpl).subscribe(next => {
            //     console.log(next);
            //     if (next.status) {
            //         this.router.navigate(['/choose-provider']).then();
            //     }
            // }, error => {
            //     if (error.error.statusCode == 4000) {
            //         this.messageError = "Số điện thoại tham chiếu trùng số điện thoại người dùng";
            //         this.isCheckPin = false;
            //     } else if (error.error.statusCode == 1000) {
            //         this.messageError = "Người dùng đã tồn tại";
            //         this.isCheckPin = false;
            //     } else {
            //         this.router.navigate(['/error'])
            //     }
            // })
        } else {
            this.codeInput.reset();
            this.msgVerifyError = this.translateService.instant('setPin.errPinMsg')
        }
    }

    focusAll(num:number) {
        if (num ===1) {
            this.changeBorderTop = true;
            this.changeBorderBottom = false;
        } else if(num ===2) {
            this.changeBorderTop = false;
            this.changeBorderBottom = false;
        }
    }
}
