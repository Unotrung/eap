import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-status-reset-picode',
  templateUrl: './status-reset-pincode.component.html',
  styleUrls: ['./status-reset-pincode.component.scss'],
})
export class StatusResetPincodeComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<StatusResetPincodeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialog: MatDialog,) { }

  ngOnInit() {
    setTimeout(()=>{this.closeStatus()},3000);
  }

  closeStatus(){
    document.getElementsByClassName("reset-stt")[0].classList.remove("animate__zoomIn")
    document.getElementsByClassName("reset-stt")[0].classList.add("animate__zoomOut");
    this.dialog.closeAll();
  }

  closePopup() {

  }
}
