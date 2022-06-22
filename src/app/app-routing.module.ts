import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './auth/register/register.component';
import {SelectivePreloadingStrategyService} from './selective-preloading-strategy.service';
import {HomeComponent} from './home/home.component';
import {InformationAccountComponent} from "./information-account/information-account.component";
import {TransactionHistoryComponent} from "./transaction/transaction-history/transaction-history.component";
import {RepaymentPlanComponent} from "./repayment/repayment-plan/repayment-plan.component";
import {RepaymentFeCreditComponent} from "./repayment/repayment-fe-credit/repayment-fe-credit.component";
import {ButtonRegisterBnplComponent} from "./button-register-bnpl/button-register-bnpl.component";
import {InformationBnplComponent} from "./information-bnpl/information-bnpl.component";
import {UpdatePincodeBnplComponent} from "./auth/bnpl/update-pincode-bnpl/update-pincode-bnpl.component";
import {GetOtpForgotPinBnplComponent} from "./auth/bnpl/get-otp-forgot-pin-bnpl/get-otp-forgot-pin-bnpl.component";
import {ResetPincodeBnplComponent} from "./auth/bnpl/reset-pincode-bnpl/reset-pincode-bnpl.component";
import {ConfirmNidResetPincodeComponent} from "./auth/bnpl/confirm-nid-reset-pincode/confirm-nid-reset-pincode.component";
import {StatusResetPincodeComponent} from "./auth/bnpl/status-reset-pincode/status-reset-pincode.component";
import {StatusUpdatePincodeComponent} from "./auth/bnpl/status-update-pincode/status-update-pincode.component";
import {HomeAfterLoginComponent} from "./home-after-login/home-after-login.component";
import {ChooseProviderRegisterBnplComponent} from "./auth/bnpl/choose-provider-register-bnpl/choose-provider-register-bnpl.component";
import {SelfiePhotoComponent} from "./auth/bnpl/selfie-photo/selfie-photo.component";
import {TakePhotoNidComponent} from "./auth/bnpl/take-photo-nid/take-photo-nid.component";
import {RegisterInforComponent} from "./auth/bnpl/register-infor/register-infor.component";
import {ConfirmInformationBnplComponent} from "./auth/bnpl/confirm-information-bnpl/confirm-information-bnpl.component";
import {WaitingConfirmComponent} from "./auth/bnpl/waiting-confirm/waiting-confirm.component";
import {SetPinCodeComponent} from "./auth/bnpl/set-pin-code/set-pin-code.component";
import {SignContractComponent} from "./auth/bnpl/sign-contract/sign-contract.component";
import {ProcessConfirmComponent} from "./auth/bnpl/process-confirm/process-confirm.component";
import {RegisterFailComponent} from "./auth/bnpl/register-fail/register-fail.component";
import {ConnectFailComponent} from "./auth/bnpl/connect-fail/connect-fail.component";
import {PaymentPlanFastComponent} from "./fast-payment/payment-plan-fast/payment-plan-fast.component";
import {PaymentDetailComponent} from "./fast-payment/payment-detail/payment-detail.component";
import {StatusFinalPaymentComponent} from "./fast-payment/status-final-payment/status-final-payment.component";
import {RepaymentDetailComponent} from "./repayment/repayment-detail/repayment-detail.component";
import {RepaymentStatusComponent} from "./repayment/repayment-status/repayment-status.component";
import {AuthGuard} from "./auth/auth.guard";
import {ErrorComponent} from "./error/error.component";
import {HomePayooComponent} from "./fast-payment/home-payoo/home-payoo.component";
import {RegisterPasswordComponent} from "./auth/register-password/register-password.component";
import {NotificationTableComponent} from "./notification/notification-table/notification-table.component";
import {ChangePincodeComponent} from "./auth/bnpl/change-pincode/change-pincode.component";
import {ForgotPasswordComponent} from "./auth/forgot-password/forgot-password.component";
import {StatusRegisterBnplComponent} from "./auth/bnpl/status-register-bnpl/status-register-bnpl.component";
import {HomePayooNoNidComponent} from "./fast-payment/home-payoo-no-nid/home-payoo-no-nid.component";

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'register-from-bnpl/:name/:phone', component: HomeComponent},
    {path: 'reset-password-from-admin/:phoneAdmin', component: HomeComponent},
    {path: 'auth', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'login', component: HomeAfterLoginComponent, canActivate: [AuthGuard]},
    {path: 'home-after-auth', component: HomeAfterLoginComponent, canActivate: [AuthGuard]},
    {path: 'choose-provider', component: ChooseProviderRegisterBnplComponent, canActivate: [AuthGuard]},
    {path: 'selfie', component: SelfiePhotoComponent, canActivate: [AuthGuard]},
    {path: 'take-photoNID', component: TakePhotoNidComponent, canActivate: [AuthGuard]},
    {path: 'register-infor-bnpl', component: RegisterInforComponent, canActivate: [AuthGuard]},
    {path: 'confirm-infor-bnpl', component: ConfirmInformationBnplComponent, canActivate: [AuthGuard]},
    {path: 'waiting-confirm', component: WaitingConfirmComponent, canActivate: [AuthGuard]},
    {path: 'set-pin-code', component: SetPinCodeComponent, canActivate: [AuthGuard]},
    {path: 'sign-contract', component: SignContractComponent, canActivate: [AuthGuard]},
    {path: 'process-confirm', component: ProcessConfirmComponent, canActivate: [AuthGuard]},
    {path: 'register-fail', component: RegisterFailComponent, canActivate: [AuthGuard]},
    {path: 'disconnect', component: ConnectFailComponent, canActivate: [AuthGuard]},
    {path: 'infor-bnpl', component: InformationBnplComponent, canActivate: [AuthGuard]},
    {path: 'update-pin-bnpl', component: UpdatePincodeBnplComponent, canActivate: [AuthGuard]},
    {path: 'status-update-pin-bnpl', component: StatusUpdatePincodeComponent, canActivate: [AuthGuard]},
    {path: 'otp-forget-pin-bnpl', component: GetOtpForgotPinBnplComponent, canActivate: [AuthGuard]},
    {path: 'reset-pin-bnpl', component: ResetPincodeBnplComponent, canActivate: [AuthGuard]},
    {path: 'confirm-nid', component: ConfirmNidResetPincodeComponent, canActivate: [AuthGuard]},
    {path: 'status-reset-pincode', component: StatusResetPincodeComponent, canActivate: [AuthGuard]},
    {path: 'infor-account', component: InformationAccountComponent, canActivate: [AuthGuard]},
    {path: 'btn-register-bnpl', component: ButtonRegisterBnplComponent, canActivate: [AuthGuard]},
    {path: 'list-transaction', component: TransactionHistoryComponent, canActivate: [AuthGuard]},
    {path: 'repayment-plan', component: RepaymentPlanComponent, canActivate: [AuthGuard]},
    {path: 'repayment-fec', component: RepaymentFeCreditComponent, canActivate: [AuthGuard]},
    {path: 'all-note', component: NotificationTableComponent, canActivate: [AuthGuard]},
    {path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
    {path: 'list-fast-payment', component: PaymentPlanFastComponent},
    {path: 'fast-payment-detail', component: PaymentDetailComponent},
    {path: 'stt-final-pay', component: StatusFinalPaymentComponent},
    {path: 'repayment-detail/:repaymentId', component: RepaymentDetailComponent, canActivate: [AuthGuard]},
    {path: 'repayment-stt', component: RepaymentStatusComponent},
    {path: 'home-payoo', component: HomePayooComponent},
    {path: 'change-pin', component: ChangePincodeComponent},
    {path: 'status-register-bnpl', component: StatusRegisterBnplComponent},
    {path: 'nid-reset-pin', component: ConfirmNidResetPincodeComponent},
    {path: 'get-otp-reset-pin', component: GetOtpForgotPinBnplComponent},
    {path: 'reset-pin', component: ResetPincodeBnplComponent},
    {path: 'home-payoo-no-nid', component: HomePayooNoNidComponent},
    {path: 'customer', component: HomeComponent},
    {path: 'partner', component: HomeComponent},
    {path: 'help', component: HomeComponent},
    {path: 'error', component: ErrorComponent},
    {path: '**', component: ErrorComponent},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: SelectivePreloadingStrategyService})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
