import { Injectable } from '@angular/core';
import {CustomerInformation} from "../../_model/customer_infomation";
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CustomerInformationService {

  customerInfo$: BehaviorSubject<CustomerInformation>

  constructor(
      private http: HttpClient
  ) {
    this.customerInfo$ =  new BehaviorSubject<CustomerInformation>({
      name: undefined,
      sex: undefined,
      phone: undefined,
      birthday: undefined,
      citizenId: undefined,
      issueDate: undefined,

      city: '',
      district: '',
      ward: '',
      street: '',

      personal_title_ref: '',
      name_ref: '',
      phone_ref: ''
    })
  }


  // getCustomerInfo():Observable<any> {
  //
  // }
}
