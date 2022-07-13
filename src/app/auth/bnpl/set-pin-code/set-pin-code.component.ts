import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {CustomerInformationService} from "../../../_service/information-bnpl/customer-information.service";
import {AuthenticationService} from "../../../_service/auth/authentication.service";
import {AccountBnplService} from "../../../_service/auth/account-bnpl.service";
import {CodeInputComponent} from "angular-code-input";
import {TranslateService} from "@ngx-translate/core";
import {CustomerInformation} from "../../../_model/customer_infomation";

@Component({
    selector: 'app-set-pin-code',
    templateUrl: './set-pin-code.component.html',
    styleUrls: ['./set-pin-code.component.scss'],
})
export class SetPinCodeComponent implements OnInit {

    pinCode = '';
    verifyPinCode = '';
    isCheckPin: boolean = false;
    userBnplEncode: CustomerInformation;
    messageError = "";
    msgVerifyError = '';
    changeBorderTop = false;
    changeBorderBottom = false;
    codeCity = '';
    codeDistrict = '';
    codeWard = '';
    codeCityTemp = '';
    codeDistrictTemp = '';
    codeWardTemp = '';
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
        this.enCodePlace();
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
        this.handleCodePlaceForCustomer();
        console.log(this.userBnplEncode);
        if (this.isCheckPin == true) {
            this.userBnplEncode = {...this.userBnplEncode, pin: this.pinCode};
            this.accountBnplService.registerUserBnpl(this.userBnplEncode).subscribe(next => {
                console.log(next);
                if (next.status) {
                    this.router.navigate(['/choose-provider']).then();
                }
            }, error => {
                if (error.error.statusCode == 4000) {
                    this.messageError = "Số điện thoại tham chiếu trùng số điện thoại người dùng";
                    this.isCheckPin = false;
                } else if (error.error.statusCode == 1000) {
                    this.messageError = "Người dùng đã tồn tại";
                    this.isCheckPin = false;
                } else {
                    this.router.navigate(['/error'])
                }
            })
        } else {
            this.codeInput.reset();
            this.msgVerifyError = this.translateService.instant('setPin.errPinMsg')
        }
    }

    focusAll(num: number) {
        if (num === 1) {
            this.changeBorderTop = true;
            this.changeBorderBottom = false;
        } else if (num === 2) {
            this.changeBorderTop = false;
            this.changeBorderBottom = true;
        }
    }

    async getAllCities(): Promise<any> {
        let res = await this.customerInformationService.getAllCities().toPromise();
        console.log(1)
        let listCities = [];
        let valueCity = '';
        let valueCityTemp = '';
        listCities = [...res.data];
        let cityName = this.customerInformationService.customerInfo$.getValue().city;
        let cityTempName = this.customerInformationService.customerInfo$.getValue().temporaryCity;
        listCities.forEach(function (city, index) {
            if (city.UI_Show.includes(cityName)) {
                valueCity = city.Value;
            }
            if (city.UI_Show.includes(cityTempName)) {
                valueCityTemp = city.Value;
            }
        })
        this.codeCity = valueCity;
        this.codeCityTemp = valueCityTemp;
        console.log(this.codeCityTemp)
        console.log(this.codeCity);
        return res
    }

    async getAllDistricts(): Promise<any> {
        let res = await this.customerInformationService.getAllDistricts({idParent: this.codeCity}).toPromise();
        console.log(2)
        let listDistricts = [];
        let valueDistrict = '';
        let districtName = this.customerInformationService.customerInfo$.getValue().district;
        listDistricts = [...res.data];
        console.log(listDistricts)
        listDistricts.forEach(function (district, index) {
            if (district.UI_Show.includes(districtName)) {
                valueDistrict = district.Value;
                return;
            }
        })
        this.codeDistrict = valueDistrict;
        console.log(this.codeDistrict);
        return res
    }

    async getAllWards(): Promise<any> {
        let res = await this.customerInformationService.getAllWards({idParent: this.codeDistrict}).toPromise();
        console.log(3)
        let listWards = [];
        listWards = [...res.data];
        console.log(listWards)
        let valueWard = '';
        let wardName = this.customerInformationService.customerInfo$.getValue().ward;
        listWards.forEach(function (ward, index) {
            if (ward.UI_Show.includes(wardName)) {
                valueWard = ward.Value;
                return
            }
        })
        this.codeWard = valueWard;
        console.log(this.codeWard);
        return res
    }

    async getAllDistrictsTemp(): Promise<any> {
        let res = await this.customerInformationService
            .getAllDistricts({idParent: this.codeCityTemp}).toPromise();
        console.log(4)
        let listDistrictsTemp = [];
        let valueDistrict = '';
        let districtNameTemp = this.customerInformationService.customerInfo$.getValue().temporaryDistrict
        listDistrictsTemp = [...res.data];
        console.log(listDistrictsTemp)
        listDistrictsTemp.forEach(function (district, index) {
            if (district.UI_Show.includes(districtNameTemp)) {
                valueDistrict = district.Value;
                return;
            }
        })
        this.codeDistrictTemp = valueDistrict;
        console.log(this.codeDistrictTemp);
        return res
    }

    async getAllWardsTemp(): Promise<any> {
        let res = await this.customerInformationService
            .getAllWards({idParent: this.codeDistrictTemp}).toPromise();
        console.log(5)
        let listWardsTemp = [];
        listWardsTemp = [...res.data];
        console.log(listWardsTemp)
        let valueWard = '';
        let wardNameTemp = this.customerInformationService.customerInfo$.getValue().temporaryWard;
        listWardsTemp.forEach(function (ward, index) {
            if (ward.UI_Show.includes(wardNameTemp)) {
                valueWard = ward.Value;
                return
            }
        })
        this.codeWardTemp = valueWard;
        console.log(this.codeWardTemp);
        return res
    }

    async enCodePlace() {
        let res1 = await this.getAllCities();
        let res2 = await this.getAllDistricts();
        let res3 = await this.getAllWards();
        let res4 = await  this.getAllDistrictsTemp();
        let res5 = await  this.getAllWardsTemp();
    }

    handleCodePlaceForCustomer() {
        this.userBnplEncode = {...this.customerInformationService.customerInfo$.getValue(),
            city: this.codeCity,
            district: this.codeDistrict,
            ward: this.codeWard,
            temporaryCity: this.codeCityTemp,
            temporaryDistrict: this.codeDistrictTemp,
            temporaryWard: this.codeWardTemp
        }
        this.customerInformationService.customerInfo$.next(this.userBnplEncode);
    }

}
