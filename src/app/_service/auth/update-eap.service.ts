import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment"


@Injectable({
  providedIn: 'root'
})
export class UpdateEapService {
  public api_url_update = "";
  constructor(private http: HttpClient) {
    this.api_url_update = `${environment.urlApiEap}v1/eap/`
  }

  updatePassword(id:string,data:any): Observable<any> {
    return this.http.put(`${this.api_url_update}user/${id}`,data)
  }
  getOtp(data:any): Observable<any> {
    return this.http.post(`${this.api_url_update}auth/sendOTPUpdateEmail`,data)
  }

  verifyOtp(data:any): Observable<any> {
    return this.http.post(`${this.api_url_update}auth/verifyOTPUpdateEmail`,data)
  }

  updateEmail(data:any): Observable<any> {
    return this.http.put(`${this.api_url_update}auth/updateEmail`,data)
  }

}
