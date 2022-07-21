import {Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from "@angular/material/dialog";
import {LoginComponent} from "../auth/login/login.component";
import {RegisterComponent} from "../auth/register/register.component";
import {AuthenticationService} from "../_service/auth/authentication.service";
import {SidebarService} from "../_service/side-bar/sidebar.service";
import {User} from "../_model/user";
import {ChooseProviderComponent} from "../fast-payment/choose-provider/choose-provider.component";
import {TranslateService} from "@ngx-translate/core";
import {MethodPayOnlineComponent} from "../fast-payment/method-pay-online/method-pay-online.component";


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    currentAccessToken: String = null;
    showBtnProfile = false;
    user: User;
    numberNotes: number = 5;
    showNote = false;
    listItemMenu = [
        {
            id: 1,
            name: 'homePage',
            text: 'header.homePage',
            router: '/'
        },
        {
            id: 2,
            name: 'customer',
            text: 'header.customer',
            router: 'customer'
        },
        {
            id: 3,
            name: 'partner',
            text: 'header.partner',
            router: 'partner'
        },
        {
            id: 4,
            name: 'fastPay',
            text: 'header.fastPay',
            router: '/fastPay'
        },
        // {
        //     id: 5,
        //     name: 'help',
        //     text: 'header.help',
        //     router: 'help'
        // }
    ]
    @ViewChild('noteButton') noteButton: ElementRef;
    @ViewChild('menuNote') menuNote: ElementRef;
    @ViewChild('profileButton') profileButton: ElementRef;
    @ViewChild('menuProfile') menuProfile: ElementRef;
    currentItem: number = 1;
    isShowSidebar = true;
    isShowNoteMobile: boolean = false;

    constructor(
        private router: Router,
        public dialog: MatDialog,
        private authenticationService: AuthenticationService,
        private sidebarService: SidebarService,
        private renderer: Renderer2,
        public translateService: TranslateService
    ) {
        this.renderer.listen('window', 'click', (e: Event) => {
            if (this.noteButton.nativeElement !== undefined) {
                if (e.target !== this.noteButton.nativeElement && e.target !== this.menuNote.nativeElement
                    && !(this.noteButton.nativeElement).contains(e.target)) {
                    this.showNote = false;
                }
            }

        });
        this.renderer.listen('window', 'click', (e: Event) => {
            if (e.target !== this.profileButton.nativeElement && e.target !== this.menuProfile.nativeElement
                && !(this.profileButton.nativeElement).contains(e.target)) {
                this.showBtnProfile = false;
            }
        });
    }

    ngOnInit(): void {
        setTimeout(()=>{
            this.authenticationService.userCurrent$.subscribe(x => this.user = x);
            this.authenticationService.currentAccessToken$.subscribe(x => {
                this.currentAccessToken = x;});
            this.sidebarService.isShowSidebar$.subscribe(x=>{this.isShowSidebar =x});
            this.authenticationService.currentItemMenu$.subscribe(x=>this.currentItem = x);
        },0)
    }

    openDialogLogin() {
        const dialogRef = this.dialog.open(LoginComponent, {
            width: '100%',
            panelClass: ['animate__animated', 'animate__zoomIn', 'animate__faster', 'animate__login']
        });

        dialogRef.afterClosed().subscribe(result => {
        });
    }

    showProfileUser() {
        setTimeout(() => {
            this.showBtnProfile = false;
            this.isShowNoteMobile = false
        }, 0)
        this.sidebarService.itemSelectObject$.next('');
        this.router.navigate(["/infor-account"]).then();
    }

    logoutUser() {
        this.sidebarService.isShowSidebarSubject$.next(false);
        setTimeout(() => {
            this.showBtnProfile = false;
        }, 0)
        this.authenticationService.logout();
    }

    openDialogRegister() {
        const dialogRef = this.dialog.open(RegisterComponent, {
            width: '100%',
            panelClass: ['animate__animated', 'animate__zoomIn', 'animate__faster', 'animate__register']
        });

        dialogRef.afterClosed().subscribe(result => {

        });
    }

    openDialogPayFast() {
        const dialogRef = this.dialog.open(MethodPayOnlineComponent, {
            width: '100%',
            panelClass: ['animate__animated', 'animate__zoomIn', 'animate__faster', 'fast_method']
        });

        dialogRef.afterClosed().subscribe(result => {
            this.currentItem = 1;
        });
    }

    onShowMenu(e: any) {
        e.stopPropagation();
        this.isShowNoteMobile = false;
        this.sidebarService.isShowMenu$.next(true);
        this.sidebarService.heightMenu$.next(100)
    }

    showNotifications() {
        this.showNote = !this.showNote;
    }

    openOtherPage(router: string, id: number, e: any) {
        this.currentItem = id;
        if (router === '/fastPay') {
            e.preventDefault();
            this.openDialogPayFast()
        } else {
        }
    }

    onShowMenuAfterAuth(e: any) {
        this.isShowNoteMobile = false
        e.stopPropagation();
        if (this.sidebarService.heightSidebar$.getValue()==100){
            this.sidebarService.heightSidebar$.next(0)
        } else {
            this.sidebarService.heightSidebar$.next(100)
        }
    }

    showAllNotification() {
        this.isShowNoteMobile = !this.isShowNoteMobile
        // this.router.navigate(['/all-note'])
    }
}
