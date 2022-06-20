import {Component, OnInit} from '@angular/core';
import {RepaymentService} from "../../_service/repayment/repayment.service";
import {AuthenticationService} from "../../_service/auth/authentication.service";
import {Router} from "@angular/router";
import {MethodPayOnlineComponent} from "../../fast-payment/method-pay-online/method-pay-online.component";
import {MatDialog} from "@angular/material/dialog";
import {TranslateService} from "@ngx-translate/core";
import {SidebarService} from "../../_service/side-bar/sidebar.service";

@Component({
    selector: 'app-repayment-plan',
    templateUrl: './repayment-plan.component.html',
    styleUrls: ['./repayment-plan.component.scss'],
})
export class RepaymentPlanComponent implements OnInit {

    listRepayment = [];
    page: number = 1;
    pageSize: number = 5;
    sortByField: string = 'status';
    sortValue: number = 1;
    totalPage: number;
    totalItem: number;
    loading: boolean = false;
    errorMgs: string = "";
    isCheckSort: boolean = true;
    isShow: boolean = false;
    listItemValue = [5, 100, 200, "All"];
    listItemText = [this.translateService.instant('repayment.5Record'),
        this.translateService.instant('repayment.100Record'),
        this.translateService.instant('repayment.200Record'),
        this.translateService.instant('repayment.allRecord')];
    itemChooseMore = this.translateService.instant('repayment.5Record');

    constructor(private repaymentService: RepaymentService,
                private authenticationService: AuthenticationService,
                private router: Router,
                public dialog: MatDialog,
                private translateService: TranslateService,
                private sidebarService: SidebarService) {
    }

    ngOnInit(): void {
        setTimeout(()=>{
            this.sidebarService.itemSelectObject$.next('repayment')
        },0)
        this.getListRepayment();
    }

    getListRepayment() {
        this.loading = true;
        let id = this.authenticationService.userCurrentSubject$.getValue()._id;
        this.repaymentService.showListRepayment(this.page, this.pageSize, this.sortByField, this.sortValue, id)
            .subscribe(next => {
                if (next.totalItem !== 0) {
                    this.listRepayment = next.data;
                    console.log(next.data)
                    this.totalPage = next.totalPage;
                    this.totalItem = next.totalItem;
                    this.listItemValue = [5, 100, 200, next.totalItem];
                    this.loading = false;

                } else {
                    this.errorMgs = "Không có dữ liệu";
                    this.loading = false;
                }
            }, error => {
                this.router.navigate(['/error'])
                this.loading = false;
            })
        this.isShow = false;
    }

    previousPage() {
        if (this.page > 1 && this.page <= this.totalPage) {
            this.page = this.page - 1;
            this.getListRepayment();
        }
    }

    nextPage() {
        if (this.page > 0 && this.page < this.totalPage) {
            this.page = this.page + 1;
            this.getListRepayment();
        }
    }

    getManyRecord(pageSize: number, e: any) {
        e.stopPropagation();
        this.pageSize = pageSize;
        this.getListRepayment();
        let itemChoose = '';
        let listItemText = ["5 giao dịch", "100 giao dịch", "200 giao dịch", "Tất cả giao dịch"];
        this.listItemValue.forEach(function (value, index) {
            if (pageSize == value) {
                itemChoose = listItemText[index]
            }
        })
        this.itemChooseMore = itemChoose;
    }

    sort(nameField: string) {
        this.isCheckSort = !this.isCheckSort;
        if (this.sortValue == 1) {
            this.sortValue = -1;
        } else {
            this.sortValue = 1;
        }
        this.sortByField = nameField;
        this.getListRepayment();
    }

    closeMore() {
        this.isShow = !this.isShow;
    }

    pay() {
        this.router.navigate(["/home-payoo"]).then();
    }
}
