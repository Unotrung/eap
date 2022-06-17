import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../_service/auth/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-fail',
  templateUrl: './register-fail.component.html',
  styleUrls: ['./register-fail.component.scss'],
})
export class RegisterFailComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
    if (this.authenticationService.step$.getValue() === 0) {
      this.router.navigate(['/infor-bnpl']);
    }
  }

}
