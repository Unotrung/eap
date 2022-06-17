import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-button-dialog',
  templateUrl: './button-dialog.component.html',
  styleUrls: ['./button-dialog.component.scss'],
})
export class ButtonDialogComponent implements OnInit {
  @Input() contentBtn: string = '';
  @Input() isEnable: boolean = true;
  @Input() width = 300;
  @Input() height= 45;
  constructor() { }

  ngOnInit() {}

}
