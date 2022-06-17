import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ContractService} from "../../../_service/information-bnpl/contract.service";
import {AuthenticationService} from "../../../_service/auth/authentication.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-get-contract',
    templateUrl: './get-contract.component.html',
    styleUrls: ['./get-contract.component.scss'],
})
export class GetContractComponent implements OnInit {
    contentContract = {
        title1: '',
        title2: '',
        content: ''
    }
    loading: boolean = false;
    messageError: string = '';

    constructor(public dialogRef: MatDialogRef<GetContractComponent>,
                @Inject(MAT_DIALOG_DATA) public data,
                private contractService: ContractService,
                private authenticationService: AuthenticationService,
                private router: Router) {
    }

    ngOnInit() {
        // if (this.authenticationService.step$.getValue() === 0) {
        //     this.router.navigate(['/infor-bnpl']);
        // }
        this.getContract()
    }

    getContract() {
        this.loading = true;
        this.contractService.getContract().subscribe(next => {
            this.contentContract = {
                ...this.contentContract,
                title1: next.title1,
                title2: next.title2,
                content: next.content
            }
            this.loading = false;
        }, error => {
            this.messageError = "Không tải được hợp đồng!"
            this.loading = false;
        })
    }

    onNoClick() {
        this.dialogRef.close()
    }
}
