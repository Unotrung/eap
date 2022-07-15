import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {NCardSide, PictureService} from "../../../_service/kyc/picture.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../_service/auth/authentication.service";
import SwiperCore, {Navigation, Pagination} from "swiper";
import {SwiperComponent} from "swiper/angular";
import {CustomerInformationService} from "../../../_service/information-bnpl/customer-information.service";

SwiperCore.use([Pagination, Navigation]);
@Component({
    selector: 'app-take-photo-nid',
    templateUrl: './take-photo-nid.component.html',
    styleUrls: ['./take-photo-nid.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class TakePhotoNidComponent implements OnInit {

    side = NCardSide.front
    instruction: boolean = false
    NCardSide = NCardSide
    isShowGuide: boolean = false;
    isShowStatusFront: boolean = false;
    countStepGuide: number =0;

    constructor(public pictureService: PictureService,
                private authService: AuthenticationService,
                private router: Router,
                private customerInformationService: CustomerInformationService) {
    }

    ngOnInit() {
        this.pictureService.clearDataNid();
        if (this.authService.step$.getValue() === 0) {
            this.router.navigate(['/infor-bnpl']);
        }
    }

    onCaptureCitizenCard() {
        if (!this.pictureService.citizenFrontImageComplete$.getValue()) {
            this.pictureService.citizenCardShot(NCardSide.front);
        } else {
            this.pictureService.citizenCardShot(NCardSide.back);
        }
        this.isShowGuide = false;
    }

    onDeleteImage(side: NCardSide) {
        this.pictureService.deleteImage(side)
    }

    onCitizenCardContinue() {
        this.customerInformationService.customerInfo$.next({
            ...this.customerInformationService.customerInfo$.getValue(),
            nid_front_image: this.pictureService.base64citizenFrontImage$.getValue(),
            nid_back_image: this.pictureService.base64citizenBackImage$.getValue()
        })
        this.router.navigate(['/register-infor-bnpl']).then()
    }

    getTextSideLocalize(side: NCardSide): string {
        if (side === NCardSide.front) {
            if (this.pictureService.citizenFrontImageComplete$.getValue()){
                return ''
            }
            else {
                return  `"mặt trước"${this.pictureService.citizenBackImageComplete$.getValue()? '':'/'}`
            }
        }

        if (this.pictureService.citizenBackImageComplete$.getValue()) {
            return ''
        }
        else {
            return 'Mặt sau'
        }
    }
    @ViewChild('swiper3', {static: false}) swiper3?: SwiperComponent;

    slideNext() {
        this.countStepGuide = 1;
        this.swiper3.swiperRef.slideTo(1);
    }

    slidePrev() {
        this.swiper3.swiperRef.slidePrev(100);
    }

}
