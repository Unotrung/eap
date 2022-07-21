import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MaterialModule} from './material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
// import {ThemeSwitchComponent} from './theme/theme-switch/theme-switch.component';
import {NavbarComponent} from './navbar/navbar.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {HomeComponent} from './home/home.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FooterComponent} from './footer/footer.component';
import {StoreModule} from '@ngrx/store';
import {themeReducer} from './theme/theme.reducer';
import {RegisterPasswordComponent} from "./auth/register-password/register-password.component";
import {GetOTPComponent} from "./auth/get-otp/get-otp.component";
import {UpdatePasswordComponent} from "./auth/update-password/update-password.component";
import {StatusRegisterComponent} from "./auth/status-register/status-register.component";
import {ForgotPasswordComponent} from "./auth/forgot-password/forgot-password.component";
import {ResetPasswordComponent} from "./auth/reset-password/reset-password.component";
import {OtpResetPasswordComponent} from "./auth/otp-reset-password/otp-reset-password.component";
import {HomeBnplComponent} from "./home-bnpl/home-bnpl.component";
import {TransactionHistoryComponent} from "./transaction/transaction-history/transaction-history.component";
import {InformationAccountComponent} from "./information-account/information-account.component";
import {HomeAfterLoginComponent} from "./home-after-login/home-after-login.component";
import {RepaymentPlanComponent} from "./repayment/repayment-plan/repayment-plan.component";
import {RepaymentFeCreditComponent} from "./repayment/repayment-fe-credit/repayment-fe-credit.component";
import {ButtonRegisterBnplComponent} from "./button-register-bnpl/button-register-bnpl.component";
import {InformationBnplComponent} from "./information-bnpl/information-bnpl.component";
import {ChooseProviderComponent} from "./fast-payment/choose-provider/choose-provider.component";
import {UpdatePincodeBnplComponent} from "./auth/bnpl/update-pincode-bnpl/update-pincode-bnpl.component";
import {GetOtpForgotPinBnplComponent} from "./auth/bnpl/get-otp-forgot-pin-bnpl/get-otp-forgot-pin-bnpl.component";
import {ResetPincodeBnplComponent} from "./auth/bnpl/reset-pincode-bnpl/reset-pincode-bnpl.component";
import {ConfirmNidResetPincodeComponent} from "./auth/bnpl/confirm-nid-reset-pincode/confirm-nid-reset-pincode.component";
import {StatusResetPincodeComponent} from "./auth/bnpl/status-reset-pincode/status-reset-pincode.component";
import {StatusUpdatePincodeComponent} from "./auth/bnpl/status-update-pincode/status-update-pincode.component";
import {StatusResetPasswordComponent} from "./auth/status-reset-password/status-reset-password.component";
import {ChooseProviderRegisterBnplComponent} from "./auth/bnpl/choose-provider-register-bnpl/choose-provider-register-bnpl.component";
import {SelfiePhotoComponent} from "./auth/bnpl/selfie-photo/selfie-photo.component";
import {TakePhotoNidComponent} from "./auth/bnpl/take-photo-nid/take-photo-nid.component";
import {RegisterInforComponent} from "./auth/bnpl/register-infor/register-infor.component";
import {ConfirmInformationBnplComponent} from "./auth/bnpl/confirm-information-bnpl/confirm-information-bnpl.component";
import {SetPinCodeComponent} from "./auth/bnpl/set-pin-code/set-pin-code.component";
import {SignContractComponent} from "./auth/bnpl/sign-contract/sign-contract.component";
import {InputOtpConfirmContractComponent} from "./auth/bnpl/input-otp-confirm-contract/input-otp-confirm-contract.component";
import {ProcessConfirmComponent} from "./auth/bnpl/process-confirm/process-confirm.component";
import {RegisterFailComponent} from "./auth/bnpl/register-fail/register-fail.component";
import {ConnectFailComponent} from "./auth/bnpl/connect-fail/connect-fail.component";
import {InputNidPayFastComponent} from "./fast-payment/input-nid-pay-fast/input-nid-pay-fast.component";
import {PaymentPlanFastComponent} from "./fast-payment/payment-plan-fast/payment-plan-fast.component";
import {PaymentDetailComponent} from "./fast-payment/payment-detail/payment-detail.component";
import {StatusFinalPaymentComponent} from "./fast-payment/status-final-payment/status-final-payment.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {LoadingComponent} from "./common-item/loading/loading.component";
import {JwtInterceptor} from "./_helpers/auth.interceptor";
import {MessageComponent} from "./message/message.component";
import {WaitingConfirmComponent} from "./auth/bnpl/waiting-confirm/waiting-confirm.component";
import {CodeInputModule} from "angular-code-input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {StatusUpdatePasswordComponent} from "./auth/status-update-password/status-update-password.component";
import {TransactionDetailComponent} from "./transaction/transaction-detail/transaction-detail.component";
import {RepaymentDetailComponent} from "./repayment/repayment-detail/repayment-detail.component";
import {RepaymentStatusComponent} from "./repayment/repayment-status/repayment-status.component";
import {GetContractComponent} from "./auth/bnpl/get-contract/get-contract.component";
import {InputOtpEditEapComponent} from "./input-otp-edit-eap/input-otp-edit-eap.component";
import {ConfirmAcctionComponent} from "./confirm-acction/confirm-acction.component";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {GetProvidersComponent} from "./auth/bnpl/get-providers/get-providers.component";
import {ErrorComponent} from "./error/error.component";
import {MethodPayOnlineComponent} from "./fast-payment/method-pay-online/method-pay-online.component";
import {HomePayooComponent} from "./fast-payment/home-payoo/home-payoo.component";
import {BarProcessBnplComponent} from "./bar-process-bnpl/bar-process-bnpl.component";
import {SidebarHeaderComponent} from "./sidebar-header/sidebar-header.component";
import {FecPipesModule} from "./pipes/fec-pipe.module";
import {ButtonDialogComponent} from "./common-item/button-dialog/button-dialog.component";
import {ItemCloseDialogComponent} from "./common-item/item-close-dialog/item-close-dialog.component";
import {NotificationTableComponent} from "./notification/notification-table/notification-table.component";
import {NotificationDropdownComponent} from "./notification/notification-dropdown/notification-dropdown.component";
import {ChangePincodeComponent} from "./auth/bnpl/change-pincode/change-pincode.component";
import {StatusComponent} from "./common-item/status/status.component";
import {StatusRegisterBnplComponent} from "./auth/bnpl/status-register-bnpl/status-register-bnpl.component";
import {WaitingConfirmPhoneComponent} from "./auth/bnpl/waiting-confirm-phone/waiting-confirm.component-phone";
import {DialogStatusUpdateComponent} from "./common-item/dialog-status-update/dialog-status-update.component";
import {SwiperModule} from "swiper/angular";
import {BnNgIdleService} from "bn-ng-idle";
import {MAT_AUTOCOMPLETE_SCROLL_STRATEGY} from "@angular/material/autocomplete";
import {CloseScrollStrategy, Overlay, RepositionScrollStrategy} from "@angular/cdk/overlay";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {SidebarMobileComponent} from "./sidebar-mobile/sidebar-mobile.component";
import {HomePayooNoNidComponent} from "./fast-payment/home-payoo-no-nid/home-payoo-no-nid.component";
import {WaitingConfirmSignContractComponent} from "./auth/bnpl/waiting-confirm-sign-contract/waiting-confirm-sign-contract.component";
import {StatusCompleteComponent} from "./auth/bnpl/status-complete/status-complete.component";
import {NotificationMobileComponent} from "./notification/notification-mobile/notification-mobile.component";

// @ts-ignore
@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        // ThemeSwitchComponent,
        SidebarComponent,
        LoginComponent,
        RegisterComponent,
        HomeComponent,
        FooterComponent,
        RegisterPasswordComponent,
        GetOTPComponent,
        UpdatePasswordComponent,
        StatusRegisterComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
        OtpResetPasswordComponent,
        HomeBnplComponent,
        TransactionHistoryComponent,
        InformationAccountComponent,
        HomeAfterLoginComponent,
        RepaymentPlanComponent,
        RepaymentFeCreditComponent,
        NotificationTableComponent,
        ButtonRegisterBnplComponent,
        InformationBnplComponent,
        ChooseProviderComponent,
        UpdatePincodeBnplComponent,
        GetOtpForgotPinBnplComponent,
        ResetPincodeBnplComponent,
        ConfirmNidResetPincodeComponent,
        StatusResetPincodeComponent,
        StatusUpdatePincodeComponent,
        StatusResetPasswordComponent,
        ChooseProviderRegisterBnplComponent,
        SelfiePhotoComponent,
        TakePhotoNidComponent,
        RegisterInforComponent,
        ConfirmInformationBnplComponent,
        SetPinCodeComponent,
        SignContractComponent,
        InputOtpConfirmContractComponent,
        ProcessConfirmComponent,
        RegisterFailComponent,
        ConnectFailComponent,
        ChooseProviderComponent,
        InputNidPayFastComponent,
        PaymentPlanFastComponent,
        PaymentDetailComponent,
        StatusFinalPaymentComponent,
        LoadingComponent,
        MessageComponent,
        WaitingConfirmComponent,
        StatusUpdatePasswordComponent,
        TransactionDetailComponent,
        RepaymentDetailComponent,
        RepaymentStatusComponent,
        GetContractComponent,
        InputOtpEditEapComponent,
        ConfirmAcctionComponent,
        GetProvidersComponent,
        ErrorComponent,
        MethodPayOnlineComponent,
        HomePayooComponent,
        BarProcessBnplComponent,
        SidebarHeaderComponent,
        ButtonDialogComponent,
        ItemCloseDialogComponent,
        NotificationDropdownComponent,
        ChangePincodeComponent,
        StatusComponent,
        StatusRegisterBnplComponent,
        WaitingConfirmPhoneComponent,
        ConfirmNidResetPincodeComponent,
        DialogStatusUpdateComponent,
        SidebarMobileComponent,
        HomePayooNoNidComponent,
        WaitingConfirmSignContractComponent,
        StatusCompleteComponent,
        NotificationMobileComponent
    ],
    entryComponents: [],
    imports: [
        MaterialModule,
        BrowserModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatProgressSpinnerModule,
        CodeInputModule,
        FecPipesModule,
        MatCheckboxModule,
        SwiperModule,
        ScrollingModule,
        TranslateModule.forRoot(
            {
                loader: {
                    provide: TranslateLoader,
                    useFactory: (http: HttpClient) => {
                        return new TranslateHttpLoader(http, './assets/i18n/', '.json');
                    },
                    deps: [HttpClient]
                }
            }
        )

    ],
    providers: [
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        { provide: MAT_AUTOCOMPLETE_SCROLL_STRATEGY, useFactory: scrollFactory, deps: [Overlay] },
        BnNgIdleService
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
export function scrollFactory(overlay: Overlay): () => RepositionScrollStrategy {
    return () => overlay.scrollStrategies.reposition();
}
