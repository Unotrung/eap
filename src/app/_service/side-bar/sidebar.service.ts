import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public isShowSidebarSubject$ = new BehaviorSubject<boolean>(true);
  isShowMenu$: BehaviorSubject<boolean>;
  heightMenu$: BehaviorSubject<number>;
  heightSidebar$: BehaviorSubject<number>;
  public itemSelectObject$: BehaviorSubject<string>;
  itemSelect$: Observable<string>;
  isShowSidebar$= this.isShowSidebarSubject$.asObservable();
  constructor() {
  this.isShowMenu$ = new BehaviorSubject<boolean>(false);
  this.heightMenu$ = new BehaviorSubject<number>(0);
  this.heightSidebar$ = new BehaviorSubject<number>(0);
  this.itemSelectObject$ = new BehaviorSubject<string>('');
  this.itemSelect$ = this.itemSelectObject$.asObservable();
  }

  showSidebar(isShow:boolean) {
    this.isShowSidebarSubject$.next(isShow);
  }
}
