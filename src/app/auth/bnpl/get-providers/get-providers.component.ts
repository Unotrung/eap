import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ContractService} from "../../../_service/information-bnpl/contract.service";
import {AuthenticationService} from "../../../_service/auth/authentication.service";
import {Router} from "@angular/router";
import {ProviderService} from "../../../_service/information-bnpl/provider.service";
import {AccountBnplService} from "../../../_service/auth/account-bnpl.service";
import {UpdatePincodeBnplComponent} from "../update-pincode-bnpl/update-pincode-bnpl.component";
import {ConfirmAcctionComponent} from "../../../confirm-acction/confirm-acction.component";

@Component({
  selector: 'app-get-providers',
  templateUrl: './get-providers.component.html',
  styleUrls: ['./get-providers.component.scss'],
})
export class GetProvidersComponent implements OnInit {
  isShowChoose: boolean = false;
  listChoose = [];
  loading: boolean = false;
  providerChoose: string = '';
  checkChoose: boolean = false;
  constructor(public dialogRef: MatDialogRef<GetProvidersComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialog: MatDialog,
              private contractService: ContractService,
              private authenticationService: AuthenticationService,
              private router: Router,
              private providerService: ProviderService,
              private accountBnplService: AccountBnplService) { }

  ngOnInit() {
    console.log(this.data);
    this.showListProviderChoose();
  }

  addProvider() {
    this.isShowChoose = true;
  }

  showListProviderChoose(){
    this.loading = true;
    this.providerService.getProvider().subscribe(next=>{
      if (next.status){
        this.listChoose = [...next.data];
        this.loading = false;
      }
    },error => {
      this.router.navigate(['/error']);
      this.loading = false;
    })
  }

  onChooseProvider(e: any) {
    this.providerChoose = e;
    this.checkChoose = true;
  }

  submit() {
    if (!this.checkChoose) return;
    const dialogRef = this.dialog.open(ConfirmAcctionComponent, {
      width: '100%',
      panelClass: ['animate__animated', 'animate__zoomIn', 'change-pin-animate']
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        let nid = this.data.nid;
        this.accountBnplService.registerProvider({nid: nid, provider: this.providerChoose}).subscribe(next=>{
          if (next.status){
            console.log(next);
            this.dialog.closeAll();
            window.location.reload();
          }
        })
      }
    });

  }

  onNoClick() {
    this.dialogRef.close();
  }
}
