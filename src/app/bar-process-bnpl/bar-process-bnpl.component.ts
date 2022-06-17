import {Component, Input, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {LanguageService} from "../_service/language/language.service";

@Component({
  selector: 'app-bar-process-bnpl',
  templateUrl: './bar-process-bnpl.component.html',
  styleUrls: ['./bar-process-bnpl.component.scss'],
})
export class BarProcessBnplComponent implements OnInit {
  // listItem = [{id: 1, step: this.translateService.instant('barProcess.step1'), status: false},
  //   {id: 2, step: this.translateService.instant('barProcess.step2'), status: false},
  //   {id: 3, step: this.translateService.instant('barProcess.step3'), status: false},
  //   {id: 4, step: this.translateService.instant('barProcess.step4'), status: false},
  //   {id: 5, step: this.translateService.instant('barProcess.step5'), status: false},
  // ];
  listItem = [{id: 1, stepEn: 'Customer Information',stepVi:'Thông tin khách hàng', status: false},
    {id: 2, stepEn: 'Pin Settings',stepVi:'Cài đặt Pin', status: false},
    {id: 3, stepEn: 'E-Sign',stepVi:'Ký điện tử',  status: false},
    {id: 4, stepEn: 'Verify information',stepVi:'Xác minh thông tin',  status: false},
    {id: 5, stepEn: 'Done',stepVi:'Hoàn thành',  status: false},
  ];
  lang = '';

  // widthLine: number = 25;
  // numberStep: number = 3;
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
