import {Component, OnInit} from '@angular/core';
import {AccountBnplService} from "../../_service/auth/account-bnpl.service";
import {AuthenticationService} from "../../_service/auth/authentication.service";
import { DomSanitizer } from '@angular/platform-browser';
import {log} from "util";

@Component({
    selector: 'app-home-payoo',
    templateUrl: './home-payoo.component.html',
    styleUrls: ['./home-payoo.component.scss'],
})

export class HomePayooComponent implements OnInit {
    linkSrc: string = '';
    phone: string = '';
    loading: boolean = false;

    constructor(private accountBnplService: AccountBnplService,
                private authenticationService: AuthenticationService,
                private sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        this.loading = true;
        if (this.authenticationService.currentAccessTokenValue) {
            this.phone = this.authenticationService.userCurrentSubject$.getValue().phone;
            this.accountBnplService.getInformationBnpl(this.phone)
                .subscribe(next => {
                    console.log(next);
                    if (next.status) {
                        console.log(next)
                        this.linkSrc = `https://bill-sbb.payoo.vn/embed/mng/20523?cus=${next.data.citizenId}`
                        this.loading = false;
                    }
                })
        } else {
            this.linkSrc = `https://bill-sbb.payoo.vn/embed/mng/20523?cus=`
            this.loading = false;
        }
    }

}
