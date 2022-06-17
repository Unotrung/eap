import {Component, OnInit} from '@angular/core';
import {RepaymentService} from "../../_service/repayment/repayment.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../_service/auth/authentication.service";

@Component({
    selector: 'app-repayment-detail',
    templateUrl: './repayment-detail.component.html',
    styleUrls: ['./repayment-detail.component.scss'],
})
export class RepaymentDetailComponent implements OnInit {
    repayment: {
        _id: '',
        paidMoney: 0,
        serviceCharge: 0
    };

    listImgBank = ['../../../assets/images/bank1.png',
        '../../../assets/images/bank2.png',
        '../../../assets/images/bank3.png',
        '../../../assets/images/bank4.png',
        '../../../assets/images/bank5.png',
        '../../../assets/images/bank6.png',
        '../../../assets/images/bank7.png',
        '../../../assets/images/bank8.png',
        '../../../assets/images/bank9.png']

    choose: boolean = false;
    payooConfirm: boolean = false;

    constructor(private repaymentService: RepaymentService,
                private route: ActivatedRoute,
                private router: Router,
                private authenticationService: AuthenticationService) {
    }

    ngOnInit() {
        const repaymentId = this.route.snapshot.params['repaymentId'];
        const idUser = this.authenticationService.userCurrentSubject$.getValue()._id;
        this.repayment = {...this.repayment,_id: ""};
        this.repaymentService.showDetailRepayment(repaymentId, idUser).subscribe(next => {
            if (next.status) {
                this.repayment = {
                    ...this.repayment,
                    _id: next.data[0]._id,
                    paidMoney: next.data[0].paidMoney,
                    serviceCharge: next.data[0].serviceCharge
                }
            }
        }, error => {
            this.router.navigate(['/error'])
        })
    }

    pay() {
        if (this.payooConfirm) {
            this.router.navigate(["/home-payoo"]).then();
        }
    }

    onChooseMethodPay(value: any) {
        this.choose = true;
        if (value == 'payoo') {
            this.payooConfirm = true;
        } else {
            this.payooConfirm = false;
        }
    }

    back() {
        this.router.navigate(['/repayment-plan'])
    }
}
