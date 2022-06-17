import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-input-nid-pay-fast',
  templateUrl: './input-nid-pay-fast.component.html',
  styleUrls: ['./input-nid-pay-fast.component.scss'],
})
export class InputNidPayFastComponent implements OnInit {
    formNid: FormGroup = new FormGroup({
        nid: new FormControl("",[Validators.required,Validators.pattern("^(\\d{9}|\\d{12})$")]),
    });
    validateMessage = {
        'nid' : [
            {type: "required",message: "Vui lòng nhập thông tin"},
            {type: "pattern",message: "Số CCCD/CMND gồm 9 hoặc 12 kí tự"}
        ]}
  constructor(public dialogRef: MatDialogRef<InputNidPayFastComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private router: Router) { }

  ngOnInit() {}

    closeDialog() {
        this.dialogRef.close()
    }

    submit() {
        if (this.formNid.invalid) return;
        this.router.navigate(['/fast-payment-detail']).then();
        this.dialogRef.close();
    }

    keyPress(e: any) {
        const pattern = /[0-9]/;
        let inputChar = String.fromCharCode(e.charCode);
        if (!pattern.test(inputChar)) {
            e.preventDefault();
        }
    }
}
