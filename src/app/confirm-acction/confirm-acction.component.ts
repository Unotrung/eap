import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirm-acction',
  templateUrl: './confirm-acction.component.html',
  styleUrls: ['./confirm-acction.component.scss'],
})
export class ConfirmAcctionComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmAcctionComponent>,
              @Inject(MAT_DIALOG_DATA) public data,) { }

  ngOnInit() {}

}
