import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {LanguageService} from "../_service/language/language.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  supportLanguage = ["vi","en"];
  listShowLanguage = ['Tiếng Việt','English'];
  isShowLang: boolean =  false;
  langChoose: string = "Tiếng Việt";
  langChooseValue = 'vi'
  isChanged = false;
  @ViewChild('langButton') langButton: ElementRef;
  @ViewChild('menuLang') menuLang: ElementRef;
  constructor(private translateService: TranslateService,
              private renderer: Renderer2,
              private languageService: LanguageService) { }

  ngOnInit() {
    this.translateService.addLangs(this.supportLanguage);
    this.translateService.setDefaultLang("vi");
    this.renderer.listen('window', 'click', (e: Event) => {
      if (this.langButton.nativeElement!==undefined) {
        if (e.target !== this.langButton.nativeElement && e.target !== this.menuLang.nativeElement
            && !(this.langButton.nativeElement).contains(e.target)) {
          this.isShowLang = false;
        }
      }
    });
  }

  selectLanguage(lang: string,e:any) {
    e.stopPropagation();
    this.isShowLang = false;
    this.languageService.langSubject$.next(lang);
    this.translateService.use(lang);
    this.langChooseValue = lang;
    let showLanguage = '';
    let listShowLanguage = ['Tiếng Việt','English']
    this.supportLanguage.forEach(function (nameLanguage,index) {
      if (lang === nameLanguage){
        showLanguage = listShowLanguage[index];
      }
    })
    this.langChoose = showLanguage;
  }

    changeHover(lg:string) {
     if(this.langChooseValue !== lg) {
       this.isChanged = true;
     } else {
       this.isChanged = false;
     }
    }
}
