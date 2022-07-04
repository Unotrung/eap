import {Component, Input, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {LanguageService} from "../_service/language/language.service";

@Component({
  selector: 'app-bar-process-bnpl',
  templateUrl: './bar-process-bnpl.component.html',
  styleUrls: ['./bar-process-bnpl.component.scss'],
})
export class BarProcessBnplComponent implements OnInit {
  listItem = [{id: 1, stepEn: 'Customer Information',stepVi:'Thông tin<br/> khách hàng', status: false},
    {id: 2, stepEn: 'Pin Settings',stepVi:'Cài đặt PIN', status: false},
    {id: 3, stepEn: 'E-Sign',stepVi:'Ký điện tử',  status: false},
    {id: 4, stepEn: 'Verify information',stepVi:'Xác minh<br/> thông tin',  status: false},
    {id: 5, stepEn: 'Done',stepVi:'Hoàn thành',  status: false},
  ];
  listItemMobile = [{id: 1, stepEn: 'Customer Information',stepVi:'Thông tin khách hàng', status: false},
    {id: 2, stepEn: 'Pin Settings',stepVi:'Cài đặt<br/> PIN', status: false},
    {id: 3, stepEn: 'E-Sign',stepVi:'Ký<br/> điện tử',  status: false},
    {id: 4, stepEn: 'Verify information',stepVi:'Xác minh<br/> thông tin',  status: false},
    {id: 5, stepEn: 'Done',stepVi:'Hoàn<br/> thành',  status: false},
  ];
  lang = '';

  @Input() childData = {
    widthLine: 0,
    numberStep: 0
  };
  constructor(private translateService: TranslateService,
              private languageService: LanguageService) { }

  ngOnInit() {
    this.languageService.lang$.subscribe(x=>this.lang = x);
  }

}
