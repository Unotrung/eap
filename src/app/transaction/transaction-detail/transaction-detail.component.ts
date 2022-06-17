import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UpdatePasswordComponent} from "../../auth/update-password/update-password.component";
import {TransactionService} from "../../_service/transaction/transaction.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../_service/auth/authentication.service";

@Component({
    selector: 'app-transaction-detail',
    templateUrl: './transaction-detail.component.html',
    styleUrls: ['./transaction-detail.component.scss'],
})
export class TransactionDetailComponent implements OnInit {
    transaction = {
        product: '',
        price: 0,
        ship: 0,
        conversionFee: 0,
        paymentTime: 0,
        type: ''
    }
    errorMessage: string = '';
    loading: boolean = false;

    constructor(private transactionService: TransactionService,
                public dialogRef: MatDialogRef<TransactionDetailComponent>,
                @Inject(MAT_DIALOG_DATA) public data,
                private router: Router,
                public dialog: MatDialog,
                public authenticationService: AuthenticationService) {
    }

    ngOnInit() {
        this.showDetailTransaction()
    }

    showDetailTransaction() {
        let idUser = this.authenticationService.userCurrentSubject$.getValue()._id;
        let id = this.data;
        this.loading = true;
        this.transactionService.showDetailTransaction(id, idUser).subscribe(next => {
            if (next.status) {
                this.transaction = {
                    ...this.transaction,
                    product: next.data[0].product,
                    price: next.data[0].price,
                    ship: next.data[0].ship,
                    conversionFee: next.data[0].conversionFee,
                    paymentTime: next.data[0].paymentTime,
                    type: next.data[0].type
                };
                this.loading = false;
            } else {
                this.errorMessage = "Không tìm thấy chi tiết giao dịch";
                this.loading = false;
            }

        }, error => {
            this.router.navigate(['/error'])
        })
    }

    close() {
        this.dialogRef.close()
    }
}
