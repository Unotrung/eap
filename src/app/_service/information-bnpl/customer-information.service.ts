import { Injectable } from '@angular/core';
import {CustomerInformation} from "../../_model/customer_infomation";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CustomerInformationService {
  public api_url_get_code = '';
  customerInfo$: BehaviorSubject<CustomerInformation>

  constructor(private http: HttpClient) {
    this.api_url_get_code = `${environment.urlApiBnpl}v1/bnpl/`;
    this.customerInfo$ =  new BehaviorSubject<CustomerInformation>({
      name: undefined,
      sex: undefined,
      phone: undefined,
      birthday: undefined,
      citizenId: undefined,
      issueDate: undefined,
      expirationDate: undefined,

      city: '',
      district: '',
      ward: '',
      street: '',

      temporaryCity: '',
      temporaryDistrict: '',
      temporaryWard: '',
      temporaryStreet: '',

      personal_title_ref: '',
      name_ref: '',
      phone_ref: '',

      nid_front_image: '',
      nid_back_image: '',
      selfie_image: ''
    })
  }

  getAllCities() : Observable<any>{
    return this.http.get(`${this.api_url_get_code}common/getAllCity`);
  }

  getAllDistricts(data: any) : Observable<any>{
    return this.http.post(`${this.api_url_get_code}common/getDistrict`,data);
  }

  getAllWards(data: any) : Observable<any>{
    return this.http.post(`${this.api_url_get_code}common/getWard`,data);
  }

  getAllRelationship() : Observable<any>{
    return this.http.get(`${this.api_url_get_code}common/getAllReferenceRelation`);
  }

  // getCustomerInfo():Observable<any> {
  //
  // }
}
