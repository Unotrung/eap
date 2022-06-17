import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  public api_url_get_contract = "";
  constructor(private http: HttpClient) {
    this.api_url_get_contract = `${environment.urlApiEap}v1/eap/`;
  }

  getContract(): Observable<any>{
    return this.http.get(`${this.api_url_get_contract}common/generateContract`);
  }
}
