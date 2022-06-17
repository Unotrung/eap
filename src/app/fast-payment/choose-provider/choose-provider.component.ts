import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {InputNidPayFastComponent} from "../input-nid-pay-fast/input-nid-pay-fast.component";

@Component({
  selector: 'app-choose-provider',
  templateUrl: './choose-provider.component.html',
  styleUrls: ['./choose-provider.component.scss'],
})
export class ChooseProviderComponent implements OnInit {
  choose:boolean = false;
  constructor(public dialogRef: MatDialogRef<ChooseProviderComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              public dialog: MatDialog) { }

  ngOnInit() {}

    closeDialog() {
        this.dialogRef.close()
    }

  openDialogInputNid() {
    this.dialogRef.close();
    const dialogRef = this.dialog.open(InputNidPayFastComponent, {
      width: '100%',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onChooseProvider() {
    this.choose = true;
  }
}
