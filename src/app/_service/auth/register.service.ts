import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment"


@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  public api_url_register = "";
  constructor(private http: HttpClient) {
    this.api_url_register = `${environment.urlApiEap}v1/eap/auth/`;
  }

  registerUser(data: any): Observable<any>{
    return this.http.post(`${this.api_url_register}sendOTP`,data)
  }
  verifyOtp(data:any): Observable<any>{
    return this.http.post(`${this.api_url_register}verifyOtp`,data)
  }
  setPassword(data: any): Observable<any>{
    return this.http.post(`${this.api_url_register}register`,data)
  }
}
