import {Component, OnInit, ViewChild} from '@angular/core';
import {AccountBnplService} from "../../../_service/auth/account-bnpl.service";
import {AuthenticationService} from "../../../_service/auth/authentication.service";
import {Router} from "@angular/router";
import {CodeInputComponent} from "angular-code-input";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-change-pincode',
  templateUrl: './change-pincode.component.html',
  styleUrls: ['./change-pincode.component.scss'],
})
export class ChangePincodeComponent implements OnInit {
  currentPin: string='';
  changeBorderTop = false;
  changeBorderMiddle = false;
  changeBorderBottom = false;
  newPin: string='';
  verifyPin: string='';
  phone: String;
  msgWrongPassword: string = '';
  msgVerifyError:string = '';
  msgStt: string = "";
  msgNewPinError: string = '';
  @ViewChild('codeInput') codeInput !: CodeInputComponent;
  @ViewChild('codeInput2') codeInput2 !: CodeInputComponent;
  @ViewChild('codeInput3') codeInput3 !: CodeInputComponent;

  constructor(private accountBnplService: AccountBnplService,
              private authenticationService: AuthenticationService,
              private router: Router,
              private translateService: TranslateService) { }

  ngOnInit() {}


  onCurrentCodeChanged(code: string) {
    this.currentPin = code;
    this.msgVerifyError = '';
    this.msgWrongPassword ='';
  }

  onCurrentCodeComplete(code: string) {
    this.currentPin = code;
  }

  onNewCodeChanged(code: string) {
    this.newPin = code;
    this.resetMsg();
  }

  onNewCodeCompleted(code: string) {
    this.newPin = code;
  }

  onCodeChangedVerify(code: string) {
    this.verifyPin = code;
    this.resetMsg();
  }

  onCodeCompletedVerify(code: string) {
    this.verifyPin = code;
  }

  submitUpdatePin() {
    if (this.newPin !== this.verifyPin) {
      this.msgVerifyError = this.translateService.instant('changePin.validWrong');
      this.verifyPin = '';
      this.codeInput.reset();
      return
    }
    if (this.currentPin === this.newPin) {
      this.codeInput2.reset();
      this.msgNewPinError = this.translateService.instant('changePin.validOverlap');
      return
    }
    this.phone = this.authenticationService.userCurrentSubject$.getValue().phone;
    this.accountBnplService.updatePinCode({phone: this.phone, pin: this.currentPin, new_pin: this.newPin})
        .subscribe(next => {
          if (next.status) {
            this.resetMsg();
            this.msgStt = 'success';
          }
        },error => {
          console.log("error", error)
          this.resetMsg();
          if (error.error.statusCode == 1001) {
            this.msgWrongPassword = this.translateService.instant('changePin.validWrong');
            this.codeInput3.reset();
          } else if (error.error.statusCode == 1006) {
            this.msgNewPinError = this.translateService.instant('changePin.validOverlap');
          } else {
            this.msgStt = 'fail';
          }
        })
  }

  resetPinCode() {
    this.router.navigate(['/nid-reset-pin'])
  }

  resetMsg(){
    this.msgVerifyError = '';
    this.msgWrongPassword ='';
    this.msgNewPinError = '';
  }

  changePinAgain() {
    this.router.navigate(['/change-pin']);
    window.location.reload();
  }

    focusAll(num:number) {
    if (num ===1) {
      this.changeBorderTop = true;
      this.changeBorderBottom = false;
      this.changeBorderMiddle = false;
    } else if(num ===2) {
      this.changeBorderMiddle = true;
      this.changeBorderTop = false;
      this.changeBorderBottom = false;
    } else if (num === 3) {
      this.changeBorderBottom = true;
      this.changeBorderMiddle = false;
      this.changeBorderTop = false;
    }
    }
}
