import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../../_model/user";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService  {
  user$: BehaviorSubject<User>;
  public accessTokenSubject$: BehaviorSubject<String>;
  public currentAccessToken$: Observable<String>;
  public refreshTokenSubject$: BehaviorSubject<String>;
  public refreshAccessToken$: Observable<String>;
  public userCurrentSubject$: BehaviorSubject<User>;
  public userCurrent$: Observable<User>;
  public step$: BehaviorSubject<number>;
  public api_url_login = "";
  public api_url_logout = "";
  public api_url_change_token = "";
  public tokenOtp$: BehaviorSubject<string>;
  constructor(private http: HttpClient,
              private router: Router) {
    this.api_url_login = `${environment.urlApiEap}v1/eap/auth/login`;
    this.api_url_logout = `${environment.urlApiEap}v1/eap/auth/logout`;
    this.api_url_change_token = `${environment.urlApiEap}v1/eap/auth/requestRefreshToken`;
    this.accessTokenSubject$ = new BehaviorSubject<String>(JSON.parse(localStorage.getItem('accessToken')));
    this.currentAccessToken$ = this.accessTokenSubject$.asObservable();
    this.refreshTokenSubject$ = new BehaviorSubject<String>(JSON.parse(localStorage.getItem('refreshToken')));
    this.refreshAccessToken$ = this.refreshTokenSubject$.asObservable();
    this.userCurrentSubject$ = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('userCurrent')));
    this.userCurrent$ = this.userCurrentSubject$.asObservable();
    this.user$ = new BehaviorSubject<User>({});
    this.step$ = new BehaviorSubject<number>(0);
    this.tokenOtp$ = new BehaviorSubject<string>("");
  }

  loginUser(data: any): Observable<any>{
    return this.http.post(this.api_url_login,data)
  }

  public get currentAccessTokenValue(): String {
    return this.accessTokenSubject$.value;
  }

  public get refreshTokenValue(): String {
    return this.refreshTokenSubject$.value;
  }

   async logout() {
    let id = this.userCurrentSubject$.getValue()._id;
    let email = this.userCurrentSubject$.getValue().email;
    let x = await this.http.post(this.api_url_logout,{email:email,id:id}).toPromise();
     this.accessTokenSubject$.next(null);
     this.userCurrentSubject$.next(null);
     this.refreshTokenSubject$.next(null);
     localStorage.removeItem('accessToken');
     localStorage.removeItem('userCurrent');
     localStorage.removeItem('refreshToken');
     this.router.navigate(['/']);
  }

  changeToken(data:any): Observable<any>{
    return this.http.put<any>(this.api_url_change_token,data);
  }

}
