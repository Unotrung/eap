import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent implements OnInit {
  @Input() isStatus: boolean;
  @Input() msgStatus: string;
  @Input() msgDescription: string;
  @Input() msgDescriptionSuf: string;

  constructor() { }

  ngOnInit() {}

}
