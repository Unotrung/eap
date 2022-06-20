import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {SidebarService} from "../_service/side-bar/sidebar.service";
import {AuthenticationService} from "../_service/auth/authentication.service";
import {AccountBnplService} from "../_service/auth/account-bnpl.service";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    showRepayment = false;
    username: string = '';
    phone: string = '';
    itemChoose:string = '';

    constructor(
        public sidebar: SidebarService,
        private route: Router,
        private authenticationService: AuthenticationService,
        private accountBnplService: AccountBnplService
    ) {
    }

    ngOnInit(): void {
        this.authenticationService.userCurrent$.subscribe(x => this.username = x.username);
        this.authenticationService.userCurrent$.subscribe(x => this.phone = x.phone);
        this.sidebar.itemSelect$.subscribe(x=> this.itemChoose = x);
    }

    getListTransaction() {
        this.route.navigateByUrl('/list-transaction')
    }

    getRepaymentPlan() {
        this.showRepayment = !this.showRepayment;
        this.route.navigateByUrl('/repayment-plan')
    }

    getListRepaymentFec() {
        // this.route.navigateByUrl('/repayment-fec')
    }

    getAllNote() {
        this.route.navigateByUrl('/all-note')
    }

    getInformationAccountBnpl() {
        this.accountBnplService.getInformationBnpl(this.phone).subscribe(next => {
            if (next.status) {
                this.route.navigateByUrl('/infor-bnpl');
                this.authenticationService.step$.next(0);
            }
        }, error => {
            console.log(error);
            if (error.error.statusCode == 900) {
                this.route.navigateByUrl('/btn-register-bnpl')
                this.authenticationService.step$.next(1);
            } else {
                this.route.navigateByUrl('/error')
            }
        })
    }

    logout() {
        this.sidebar.isShowSidebarSubject$.next(false);
        this.authenticationService.logout();
        this.route.navigateByUrl("/")
    }

    getInformationAccountEap() {
        this.route.navigateByUrl('/infor-account')
    }
}
