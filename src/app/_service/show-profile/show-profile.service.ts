import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ShowProfileService {
  public api_url_show_profile = "";
  constructor(private http: HttpClient) {
    this.api_url_show_profile = `${environment.urlApiEap}v1/eap/user/`;
  }

  showProfileByPhone(id: String): Observable<any>{
    return this.http.get(`${this.api_url_show_profile}${id}`)
  }
}
