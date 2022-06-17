import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  public api_url_get_provider = "";
  constructor(private http: HttpClient) {
    this.api_url_get_provider = `${environment.urlApiEap}v1/eap/`
  }

  getProvider(): Observable<any>{
    return this.http.get(`${this.api_url_get_provider}common/generateProviders`);
  }
}
