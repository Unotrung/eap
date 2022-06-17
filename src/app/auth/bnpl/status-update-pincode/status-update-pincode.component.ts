import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import set = Reflect.set;

@Component({
  selector: 'app-status-update-pincode',
  templateUrl: './status-update-pincode.component.html',
  styleUrls: ['./status-update-pincode.component.scss'],
})
export class StatusUpdatePincodeComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<StatusUpdatePincodeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialog: MatDialog,) { }

  ngOnInit() {
    setTimeout(()=>{this.closeStatus()},3000);
  }

  closeStatus(){
    document.getElementsByClassName("stt__edit__pin")[0].classList.remove("animate__zoomIn")
    document.getElementsByClassName("stt__edit__pin")[0].classList.add("animate__zoomOut");
    this.dialog.closeAll();
  }
}
