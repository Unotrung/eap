import {Component, Inject, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../_service/auth/authentication.service";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-waiting-confirm',
  templateUrl: './waiting-confirm.component.html',
  styleUrls: ['./waiting-confirm.component.scss'],
})
export class WaitingConfirmComponent implements OnInit {

  constructor(private authService: AuthenticationService,
              private router: Router,
              public dialogRef: MatDialogRef<WaitingConfirmComponent>,
              @Inject(MAT_DIALOG_DATA) public data,) { }

  ngOnInit() {
    // if (this.authService.step$.getValue() === 0) {
    //   this.router.navigate(['/infor-bnpl']);
    // }
    setTimeout(()=>{
      this.dialogRef.close();
      this.router.navigate(['/set-pin-code']).then()
    }, 3000)
  }
}
