import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../_service/auth/authentication.service";

@Component({
    selector: 'app-connect-fail',
    templateUrl: './connect-fail.component.html',
    styleUrls: ['./connect-fail.component.scss'],
})
export class ConnectFailComponent implements OnInit {

    constructor(public router: Router,
                public authenticationService: AuthenticationService,) {
    }

    ngOnInit() {
        if (this.authenticationService.step$.getValue() === 0) {
            this.router.navigate(['/infor-bnpl']);
        }
    }

}
