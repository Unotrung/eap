import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RepaymentService {
  public api_url_repayment = "";

  constructor(private http: HttpClient) {
    this.api_url_repayment = `${environment.urlApiEap}v1/eap/repayment`
  }

  showListRepayment(page:number, pageSize:number,sortByField:string,sortValue:number, id:string): Observable<any>{
    const params = new HttpParams()
        .set('page', `${page}`)
        .set('pageSize', `${pageSize}`)
        .set('sortByField', sortByField)
        .set('sortValue', `${sortValue}`)
        .set('id', `${id}`);
    return this.http.get(`${this.api_url_repayment}/${id}`,{params})
  }
  showDetailRepayment(idRepayment:string,idUSer: string): Observable<any>{
    return this.http.get(`${this.api_url_repayment}/repaymentDetail/${idUSer}/${idRepayment}`)
  }
}
