import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment"


@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  public api_url_forgot = "";
  constructor(private http: HttpClient) {
    this.api_url_forgot = `${environment.urlApiEap}v1/eap/auth/`
  }

  getOtpResetPassword(data:any): Observable<any> {
    console.log(`${this.api_url_forgot}forgotPassword`);
    return this.http.post(`${this.api_url_forgot}forgotPassword`,data)
  }

  verifyOtp(data:any): Observable<any> {
    return this.http.post(`${this.api_url_forgot}verifyOtpPassword`,data)
  }

  resetPassword(data:any,token:string): Observable<any>{
    const header = new HttpHeaders({'Authorization':`Bearer ${token}`,
      'Content-Type': 'application/json'});
    console.log(header);
    return this.http.put(`${this.api_url_forgot}resetPassword`,data,{headers:header});
  }
}
