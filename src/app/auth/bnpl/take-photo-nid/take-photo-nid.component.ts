import {Component, OnInit} from '@angular/core';
import {NCardSide, PictureService} from "../../../_service/kyc/picture.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../_service/auth/authentication.service";

@Component({
    selector: 'app-take-photo-nid',
    templateUrl: './take-photo-nid.component.html',
    styleUrls: ['./take-photo-nid.component.scss'],
})
export class TakePhotoNidComponent implements OnInit {

    side = NCardSide.front
    instruction: boolean = false
    NCardSide = NCardSide

    constructor(public pictureService: PictureService,
                private authService: AuthenticationService,
                private router: Router) {
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
    }

    onDeleteImage(side: NCardSide) {
        this.pictureService.deleteImage(side)
    }

    onCitizenCardContinue() {
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
}
