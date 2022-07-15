import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../_service/auth/authentication.service";
import {ShowProfileService} from "../_service/show-profile/show-profile.service";
import {MatDialog} from "@angular/material/dialog";
import {UpdatePincodeBnplComponent} from "../auth/bnpl/update-pincode-bnpl/update-pincode-bnpl.component";
import {GetContractComponent} from "../auth/bnpl/get-contract/get-contract.component";
import {AccountBnplService} from "../_service/auth/account-bnpl.service";
import {Router} from "@angular/router";
import {GetProvidersComponent} from "../auth/bnpl/get-providers/get-providers.component";
import {SidebarService} from "../_service/side-bar/sidebar.service";

@Component({
    selector: 'app-information-bnpl',
    templateUrl: './information-bnpl.component.html',
    styleUrls: ['./information-bnpl.component.scss'],
})
export class InformationBnplComponent implements OnInit {
    linkImgEdit = '../../assets/images/edit.png';
    userBnpl = {
        name: '',
        sex: '',
        birthday: '',
        citizenId:'',
        phone:'',
        expirationDate:'',
        issueDate:'',
        cityData:{},
        districtData:{},
        wardData:{},
        street:'',
        personalTitleRef:{},
        name_ref:'',
        phone_ref:''
    };
    loading:boolean = false;
    listProvider = [];
    nid: string = '';

    constructor(
        private authenticationService: AuthenticationService,
        private showProfileService: ShowProfileService,
        public dialog: MatDialog,
        private accountBnplService: AccountBnplService,
        private router: Router,
        private sidebarService: SidebarService
    ) {
    }

    ngOnInit() {
        setTimeout(()=>{
            this.sidebarService.itemSelectObject$.next('registerBNPL');
        },0)
        this.getInformationBnpl();
    }

    getInformationBnpl() {
        this.loading = true;
        let email = this.authenticationService.userCurrentSubject$.getValue().email;
        let phone = this.authenticationService.userCurrentSubject$.getValue().phone;
        this.accountBnplService.getInformationBnpl(phone).subscribe(next=>{
            if (next.status){
                console.log("bnpl info: ", next.data)
                this.authenticationService.step$.next(0);
                this.userBnpl = {...next.data};
                this.listProvider = next.data.providers;
                this.nid = next.data.citizenId;
                this.loading = false;
            }
        },error => {
            if (error.error.statusCode == 900) {
                this.authenticationService.step$.next(1);
                this.router.navigate(['/btn-register-bnpl']);
                this.loading = false;
            } else {
                this.router.navigate(['/error']);
                this.loading = false;
            }
        })
    }

    openDialogUpdatePin() {
        const dialogRef = this.dialog.open(UpdatePincodeBnplComponent, {
            width: '100%',
            panelClass: ['animate__animated', 'animate__zoomIn','animate__faster', 'change-pin-animate']
        });

        dialogRef.afterClosed().subscribe(result => {
        });
    }

    getContentContract() {
        const dialogRef = this.dialog.open(GetContractComponent, {
            width: '100%',
            panelClass: ['animate__animated', 'animate__zoomIn','animate__faster', 'get-contract-animate']
        });

        dialogRef.afterClosed().subscribe(result => {
        });
    }

    getListProvider() {
        console.log(this.listProvider);
        const dialogRef = this.dialog.open(GetProvidersComponent, {
            width: '100%',
            data: {listProviders: this.listProvider,nid: this.nid},
            panelClass: ['animate__animated', 'animate__zoomIn','animate__faster', 'get-provider-animate']
        });

        dialogRef.afterClosed().subscribe(result => {
        });
    }

    changePin() {
        this.router.navigate(['/change-pin'])
    }
}
