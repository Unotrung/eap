import {Component, OnInit} from '@angular/core';
import {ProviderService} from "../../../_service/information-bnpl/provider.service";
import {AuthenticationService} from "../../../_service/auth/authentication.service";
import {Router} from "@angular/router";
import {AccountBnplService} from "../../../_service/auth/account-bnpl.service";
import {CustomerInformationService} from "../../../_service/information-bnpl/customer-information.service";

@Component({
    selector: 'app-choose-provider-register-bnpl',
    templateUrl: './choose-provider-register-bnpl.component.html',
    styleUrls: ['./choose-provider-register-bnpl.component.scss'],
})
export class ChooseProviderRegisterBnplComponent implements OnInit {
    listProvider = [];
    loading: boolean = false;
    messageError: string = '';
    checkChoose: boolean = false;
    providerChoose: string = '';

    constructor(private providerService: ProviderService,
                private authenticationService: AuthenticationService,
                private router: Router,
                private accountBnplService: AccountBnplService,
                private  customerInformationService: CustomerInformationService) {
    }

    ngOnInit() {
        if (this.authenticationService.step$.getValue()===0){
            this.router.navigate(['/infor-bnpl']);
        }
        this.getProvider();
        let phone = this.authenticationService.userCurrentSubject$.getValue().phone;
        this.getInformationBnpl(phone);
    }

    getProvider() {
        this.loading = true;
        this.providerService.getProvider().subscribe(next => {
            console.log(next);
            if (next.status) {
                this.listProvider = [...next.data]
                this.loading = false;
            } else {
                this.messageError = "Không tìm thấy nhà cung cấp"
                this.loading = false;
            }
        }, error => {
            this.loading = false;
        })
    }

    onChooseProvider(e: any) {
        console.log(e);
        this.providerChoose = e;
        this.checkChoose = true;
    }

    submit() {
        if (this.providerChoose === '') return;
        this.router.navigate(['/sign-contract'])
        // let nid = this.customerInformationService.customerInfo$.getValue().citizenId;
        // console.log(nid)
        // console.log(this.providerChoose);
        // this.accountBnplService.registerProvider({nid: nid, provider: this.providerChoose}).subscribe(next => {
        //     console.log(next);
        //     if (next.status) {
        //         this.router.navigate(['/sign-contract'])
        //     }
        // }, error => {
        //     if (error.error.statusCode == 900) {
        //         this.router.navigate(['/error']);
        //     } else if (error.error.statusCode == 1005) {
        //         this.router.navigate(['/error']);
        //     }
        // })
    }

    getInformationBnpl(phone: string) {
        this.accountBnplService.getInformationBnpl(phone).subscribe(next => {
            console.log(next);
        })
    }

    chooseProvider(provider: string) {
        if (this.providerChoose === '') {
            this.checkChoose = true;
        } else {
            if (this.providerChoose !== provider){
                this.checkChoose = true;
            } else if (this.providerChoose === provider) {
                this.checkChoose =!this.checkChoose
            }
        }
        this.providerChoose = provider;
    }
}
