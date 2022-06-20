import {Component, OnInit} from '@angular/core';
import {TransactionService} from "../../_service/transaction/transaction.service";
import {AuthenticationService} from "../../_service/auth/authentication.service";
import {MatDialog} from "@angular/material/dialog";
import {TransactionDetailComponent} from "../transaction-detail/transaction-detail.component";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {SidebarService} from "../../_service/side-bar/sidebar.service";


@Component({
    selector: 'app-transaction-history',
    templateUrl: './transaction-history.component.html',
    styleUrls: ['./transaction-history.component.scss'],
})
export class TransactionHistoryComponent implements OnInit {
    listTransaction = [];
    page: number = 1;
    pageSize: number = 5;
    sortByField: string = 'product';
    sortValue: number = 1;
    totalPage: number;
    totalItem: number;
    loading: boolean = false;
    errorMgs: string = "";
    isCheckSort: boolean = true;
    isShow: boolean = false;
    listItemValue = [5,100,200, "All"];
    listItemText = [this.translateService.instant('transaction.5Record'),
                    this.translateService.instant('transaction.100Record'),
                    this.translateService.instant('transaction.200Record'),
                    this.translateService.instant('transaction.allRecord')];
    itemChooseMore = this.translateService.instant('transaction.5Record');

    constructor(private transactionService: TransactionService,
                private authenticationService: AuthenticationService,
                public dialog: MatDialog,
                private router: Router,
                private translateService: TranslateService,
                private sidebarService: SidebarService) {
    }

    ngOnInit(): void {
        setTimeout(()=>{
            this.sidebarService.itemSelectObject$.next("transaction");
        },0)
        this.getListTransaction()
    }

    getListTransaction() {
        this.loading = true;
        let id = this.authenticationService.userCurrentSubject$.getValue()._id;
        this.transactionService.showListTransaction(this.page, this.pageSize, this.sortByField, this.sortValue, id)
            .subscribe(next => {
                if (next.totalItem!==0) {
                    this.listTransaction = next.data;
                    this.totalPage = next.totalPage;
                    this.totalItem = next.totalItem;
                    this.listItemValue = [5,100,200,next.totalItem];
                    this.loading = false;
                } else {
                    this.errorMgs = "Không có dữ liệu";
                    this.loading = false;
                }
            }, error => {
                this.router.navigate(['/error']);
            })
        this.isShow = false;
    }

    previousPage() {
        if (this.page > 1 && this.page <= this.totalPage) {
            this.page = this.page - 1;
            this.getListTransaction();
            console.log(this.listTransaction)
        }
    }

    nextPage() {
        if (this.page > 0 && this.page < this.totalPage) {
            this.page = this.page + 1;
            this.getListTransaction();
            console.log(this.listTransaction)
        }
    }

    getManyRecord(pageSize: number, e:any) {
        e.stopPropagation();
        this.pageSize = pageSize;
        this.getListTransaction();
        let itemChoose = '';
        let listItemText = ["25 dòng 1 trang","100 dòng 1 trang","200 dòng 1 trang","Tất cả"];
        this.listItemValue.forEach(function (value, index) {
            if (pageSize == value){
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
        this.getListTransaction();
    }


    openDialogDetail(_id: any) {
        const dialogRef = this.dialog.open(TransactionDetailComponent, {
            width: '100%',
            data: _id,
            panelClass: ['animate__animated', 'animate__zoomIn', 'detail-trans-animate']
        });

        dialogRef.afterClosed().subscribe(result => {
        });
        this.isShow = false;
    }
}


