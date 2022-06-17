import { Injectable } from '@angular/core';
import {HttpClient, HttpContext, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  public api_url_transaction = "";

  constructor(private http: HttpClient) {
    this.api_url_transaction = `${environment.urlApiEap}v1/eap/transaction`;
  }

  showListTransaction(page:number, pageSize:number,sortByField:string,sortValue:number,id:string): Observable<any>{
    const params = new HttpParams()
        .set('page', `${page}`)
        .set('pageSize', `${pageSize}`)
        .set('sortByField', sortByField)
        .set('sortValue', `${sortValue}`)
        .set('id', `${id}`);
    return this.http.get(`${this.api_url_transaction}/${id}`,{params})
  }

  showDetailTransaction(idTransaction:string,idUSer: string): Observable<any>{
    return this.http.get(`${this.api_url_transaction}/transactionDetail/${idUSer}/${idTransaction}`)
  }
}
