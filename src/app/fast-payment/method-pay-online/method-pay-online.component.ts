import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
    selector: 'app-method-pay-online',
    templateUrl: './method-pay-online.component.html',
    styleUrls: ['./method-pay-online.component.scss'],
})
export class MethodPayOnlineComponent implements OnInit {
    choose: boolean = false;
    payooConfirm:boolean = false;
    isPayoo = false;
    isMomo = false;

    constructor(public dialogRef: MatDialogRef<MethodPayOnlineComponent>,
                @Inject(MAT_DIALOG_DATA) public data,
                public dialog: MatDialog,
                public router: Router) {
    }

    ngOnInit() {
    }

    onChooseMethodPayPayoo() {
        this.choose = true;
        this.payooConfirm = true;
        console.log(this.payooConfirm)
    }
    onChooseMethodPayMomo() {
        this.choose = true;
        this.payooConfirm = false;
    }

    closeDialog() {
        document.getElementsByClassName("fast_method")[0].classList.remove("animate__zoomIn")
        document.getElementsByClassName("fast_method")[0].classList.add("animate__zoomOut");
        setTimeout(() => {
            this.dialogRef.close();
        }, 100);
    }

    goPaYooHome() {
        if (!this.isPayoo) return;
        document.getElementsByClassName("fast_method")[0].classList.remove("animate__zoomIn")
        document.getElementsByClassName("fast_method")[0].classList.add("animate__zoomOut");
        setTimeout(() => {
            this.dialogRef.close();
            this.router.navigate(['/home-payoo-no-nid']).then();
        }, 100);

    }

    choosePay(pay:string) {
        if (pay === 'payoo') {
            this.isPayoo = !this.isPayoo;
            this.isMomo = false;
        }
        if (pay ==='momo') {
            this.isMomo = !this.isMomo;
            this.isPayoo = false;
        }

    }
}
