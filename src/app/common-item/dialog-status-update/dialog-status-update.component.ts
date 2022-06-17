import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dialog-status-update',
  templateUrl: './dialog-status-update.component.html',
  styleUrls: ['./dialog-status-update.component.scss'],
})
export class DialogStatusUpdateComponent implements OnInit {
  isStatus = false;
  messageStatus = '';

  constructor(public dialogRef: MatDialogRef<DialogStatusUpdateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialog: MatDialog,
              private router: Router) { }

  ngOnInit() {
    this.isStatus = this.data.isStatus;
    this.messageStatus = this.data.messageStatus;
  }

  closePopup() {
    document.getElementsByClassName("stt__update")[0].classList.remove("animate__zoomIn")
    document.getElementsByClassName("stt__update")[0].classList.add("animate__zoomOut");
    this.dialogRef.close();
  }
}
