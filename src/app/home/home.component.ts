import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ChooseProviderComponent} from "../fast-payment/choose-provider/choose-provider.component";
import {AuthenticationService} from "../_service/auth/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MethodPayOnlineComponent} from "../fast-payment/method-pay-online/method-pay-online.component";
import {TranslateService} from "@ngx-translate/core";
import {SidebarService} from "../_service/side-bar/sidebar.service";
import SwiperCore, {Navigation, Pagination} from "swiper";
import {SwiperComponent} from "swiper/angular";
import {RegisterComponent} from "../auth/register/register.component";
import {ForgotPasswordComponent} from "../auth/forgot-password/forgot-password.component";


SwiperCore.use([Pagination, Navigation]);

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
    lisItemLayer2 = [
        {
            src: "",
            // src: "../../assets/images/icon1-layer2.png",
            lable: this.translateService.instant("home.lable-2-1"),
            content: this.translateService.instant("home.content-2-1")
        },
        {
            src: "",
            // src: "../../assets/images/icon2-layer2.png",
            lable: this.translateService.instant("home.lable-2-2"),
            content: this.translateService.instant("home.content-2-2")
        },
        {
            src: "",
            // src: "../../assets/images/icon3-layer2.png",
            lable: this.translateService.instant("home.lable-2-3"),
            content: this.translateService.instant("home.content-2-3")
        },
        {
            src: "",
            // src: "../../assets/images/icon5-layer2.png",
            lable: this.translateService.instant("home.lable-2-4"),
            content: this.translateService.instant("home.content-2-4")
        },
    ];
    listItemLayer3 = [
        {
            src: "../../assets/images/icon3-layer3.jpg",
            title: this.translateService.instant('home.title-3-1')
        },
        {
            src: "../../assets/images/icon2-layer3.png",
            title: this.translateService.instant('home.title-3-2')
        },
        {
            src: "../../assets/images/icon1-layer3.png",
            title: this.translateService.instant('home.title-3-3')
        },
        {
            src: "../../assets/images/icon4-layer3.png",
            title: this.translateService.instant('home.title-3-4')
        },
    ];
    listItemLayer4 = [
        {src: "../../assets/images/LAZADA_Logo1.png"},
        {src: "../../assets/images/Shopee.png"},
        {src: "../../assets/images/TIKI.png"},
        {src: "../../assets/images/Sendo.png"},
        {src: "../../assets/images/TGDD.png"},
        {src: "../../assets/images/fpt.png"},
    ];

    listPeopleComment = [
        {
            avatar: "../../assets/images/avatarComment.png",
            nameUser: this.translateService.instant("home.customerName"),
            place: this.translateService.instant("home.placeComment"),
            content: this.translateService.instant("home.contentComment"),
            finalContent: this.translateService.instant("home.finalComment"),
        },
        {
            avatar: "../../assets/images/avatar-1.jpg",
            nameUser: this.translateService.instant("home.customerName"),
            place: this.translateService.instant("home.placeComment"),
            content: this.translateService.instant("home.contentComment"),
            finalContent: this.translateService.instant("home.finalComment"),
        },
        {
            avatar: "../../assets/images/avatar-2.jpg",
            nameUser: this.translateService.instant("home.customerName"),
            place: this.translateService.instant("home.placeComment"),
            content: this.translateService.instant("home.contentComment"),
            finalContent: this.translateService.instant("home.finalComment"),
        },
        {
            avatar: "../../assets/images/avatar-3.jpg",
            nameUser: this.translateService.instant("home.customerName"),
            place: this.translateService.instant("home.placeComment"),
            content: this.translateService.instant("home.contentComment"),
            finalContent: this.translateService.instant("home.finalComment"),
        },
        {
            avatar: "../../assets/images/avatar-4.jpg",
            nameUser: this.translateService.instant("home.customerName"),
            place: this.translateService.instant("home.placeComment"),
            content: this.translateService.instant("home.contentComment"),
            finalContent: this.translateService.instant("home.finalComment"),
        }
    ];
    listItemLayer6 = [
        {
            id: 1,
            src: '../../assets/images/flower.png',
            title: this.translateService.instant("home.titleNews1"),
            date: this.translateService.instant("home.dateNews1"),
            content: this.translateService.instant("home.contentNews1")
        },
        {
            id: 2,
            src: '../../assets/images/new_2.png',
            title: this.translateService.instant("home.titleNews2"),
            date: this.translateService.instant("home.dateNews2"),
            content: this.translateService.instant("home.contentNews2")
        },
        {
            id: 3,
            src: '../../assets/images/phone-card.png',
            title: this.translateService.instant("home.titleNews3"),
            date: this.translateService.instant("home.dateNews3"),
            content: this.translateService.instant("home.contentNews3")
        },
    ]
    slidesPerView = 4;
    space = 30;
    spaceNew = -22;
    isPageSwip = false;


    constructor(public dialog: MatDialog,
                private authenticationService: AuthenticationService,
                private router: Router,
                public translateService: TranslateService,
                public sidebarService: SidebarService,
                private route: ActivatedRoute,) {
    }

    ngOnInit() {
        const phoneBnpl = this.route.snapshot.params['phone'];
        const nameBnpl = this.route.snapshot.params['name'];
        const phoneAdmin = this.route.snapshot.params['phoneAdmin'];
        if (phoneBnpl !== undefined && nameBnpl !== undefined) {
            const dialogRef = this.dialog.open(RegisterComponent, {
                width: '100%',
                data: {phoneBnpl: phoneBnpl, nameBnpl: nameBnpl},
                panelClass: ['animate__animated', 'animate__zoomIn', 'animate__faster', 'animate__register']
            });

            dialogRef.afterClosed().subscribe(result => {

            });
        }
        if (phoneAdmin !== undefined) {
            const dialogRef = this.dialog.open(ForgotPasswordComponent, {
                width: '100%',
                data: {phoneAdmin: phoneAdmin},
                panelClass: ['animate__animated', 'animate__zoomIn', 'animate__faster']
            });

            dialogRef.afterClosed().subscribe(result => {
            });
        }
        setTimeout(() => {
            this.sidebarService.isShowSidebarSubject$.next(false);
        }, 0)

        if (this.authenticationService.currentAccessTokenValue) {

            this.router.navigate(['/auth']);
        }
        if (window.innerWidth > 960) {
            this.slidesPerView = 4;
            this.space = 30;
            this.isPageSwip = false;
        } else if (window.innerWidth <= 960 && window.innerWidth > 480) {
            this.slidesPerView = 2;
            this.space = -32;
            this.spaceNew = -96;
            this.isPageSwip = false;
        } else if (window.innerWidth <= 480) {
            this.slidesPerView = 3;
            this.space = 12;
            this.spaceNew = -22;
            this.isPageSwip = true;
        }
    }

    openDialogPayFast() {
        const dialogRef = this.dialog.open(MethodPayOnlineComponent, {
            width: '100%',
            panelClass: ['animate__animated', 'animate__zoomIn', 'animate__faster', 'fast_method']
        });

        dialogRef.afterClosed().subscribe(result => {
        });
    }

    onResize(event) {
        try {
            if (event.target.innerWidth > 960) {
                this.slidesPerView = 4;
                this.space = 30;
                this.isPageSwip = false;
            } else if (event.target.innerWidth <= 960 && event.target.innerWidth > 480) {
                this.slidesPerView = 2;
                this.space = -32;
                this.spaceNew = -96;
                this.isPageSwip = false;
            }
            if (event.target.innerWidth <= 480) {
                this.slidesPerView = 3;
                this.space = 12;
                this.spaceNew = -22;
                this.isPageSwip = true;
            }
        } catch (e) {

        }

    }

    @ViewChild('swiper', {static: false}) swiper?: SwiperComponent;

    slideNext() {
        console.log("next")
        this.swiper.swiperRef.slideNext(100);
    }

    slidePrev() {
        console.log("prev")
        this.swiper.swiperRef.slidePrev(100);
    }

    scroll(el: HTMLElement) {
        el.scrollIntoView({behavior: 'smooth'});
    }

    registerVoolo() {
        const dialogRef = this.dialog.open(RegisterComponent, {
            width: '100%',
            panelClass: ['animate__animated', 'animate__zoomIn', 'animate__faster', 'animate__register']
        });

        dialogRef.afterClosed().subscribe(result => {
        });
    }
}
