import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../_service/auth/authentication.service";

@Component({
    selector: 'app-process-confirm',
    templateUrl: './process-confirm.component.html',
    styleUrls: ['./process-confirm.component.scss'],
})
export class ProcessConfirmComponent implements OnInit {

    percentDown: number = 100;

    constructor(private authenticationService: AuthenticationService,
                private router: Router
    ) {}

    ngOnInit() {
        if (this.authenticationService.step$.getValue() === 0) {
            this.router.navigate(['/infor-bnpl']);
        }
        this.confirmProcess(100);
    }

    confirmProcess(second: number) {
        let currentSecond = second;
        const counter = setInterval(() => {
            currentSecond = currentSecond - 10;
            this.percentDown = currentSecond;
            const bar = document.getElementById("bar");
            bar.style.width = (100 - this.percentDown) + "%";
            if (currentSecond <= 0) {
                this.router.navigate(['/status-register-bnpl']);
                clearInterval(counter)
            }
        }, 500);
    }
}
