import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-status-update-password',
  templateUrl: './status-update-password.component.html',
  styleUrls: ['./status-update-password.component.scss'],
})
export class StatusUpdatePasswordComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<StatusUpdatePasswordComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialog: MatDialog,) { }

  ngOnInit() {
    setTimeout(()=>{
      this.dialog.closeAll();
    },3000)
  }

    closePopup() {
      document.getElementsByClassName("stt__edit")[0].classList.remove("animate__zoomIn")
      document.getElementsByClassName("stt__edit")[0].classList.add("animate__zoomOut");
      this.dialog.closeAll();
    }
}
