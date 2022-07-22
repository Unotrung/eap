import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../../environments/environment"

@Injectable({
    providedIn: 'root'
})
export class AccountBnplService {
    public api_url_register_bnpl = '';
    public api_url_check_bnpl_fec = '';
    public stepRegister$: BehaviorSubject<any>;
    public currentStepRegister$: Observable<any>;
    constructor(private http: HttpClient) {
        this.api_url_register_bnpl = `${environment.urlApiBnpl}v1/bnpl/`;
        this.api_url_check_bnpl_fec = `${environment.urlApiFec}mocking/api/v1/sources/exchange/assets/c2a50950-c027-4e3d-9806-8f2e0008c9ba/bnpl_api/2.0.3/m/Check`;
        this.stepRegister$ = new BehaviorSubject<any>({
            widthLine: 50,
            numberStep:2
        });
        this.currentStepRegister$ = this.stepRegister$.asObservable()
    }

    registerUserBnpl(data: any): Observable<any> {
        return this.http.post(`${this.api_url_register_bnpl}personal/addInfoPersonal`, data);
    }

    isCheckInformationBnpl(data: any): Observable<any> {
        return this.http.post(`${this.api_url_register_bnpl}user/checkPhoneExists`, data);
    }

    isCheckNidBnpl(data: any): Observable<any> {
        return this.http.post(`${this.api_url_register_bnpl}user/checkNidExists`, data);
    }

    updatePinCode(data: any): Observable<any> {
        return this.http.put(`${this.api_url_register_bnpl}user/updatePin`, data);
    }

    getOtp(data: any): Observable<any> {
        return this.http.post(`${this.api_url_register_bnpl}user/sendOtpPin`, data);
    }

    checkNidAndPhone(data: any): Observable<any> {
        return this.http.post(`${this.api_url_register_bnpl}user/checkNidPhoneExists`, data);
    }

    verifyOtp(data: any): Observable<any> {
        return this.http.post(`${this.api_url_register_bnpl}user/verifyOtpPin`, data);
    }

    resetPin(data: any, token: string): Observable<any> {
        const header = new HttpHeaders({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        });
        return this.http.put(`${this.api_url_register_bnpl}user/resetPin`, data, {headers: header});
    }

    registerProvider(data: any): Observable<any> {
        return this.http.put(`${this.api_url_register_bnpl}personal/registerProvider`, data);
    }

    getInformationBnpl(phone: string): Observable<any> {
        return this.http.get(`${this.api_url_register_bnpl}personal/${phone}`);
    }

    // checkInfomationBnplFec(data: any): Observable<any> {
    //     const header = new HttpHeaders({
    //         'ms2-authorization': 'bearer 92c71960-17a6-47aa-b047-3ba11f070bb5'
    //     });
    //     return this.http.post(`${this.api_url_register_bnpl}fec/checkBNPLInfo`, data, {headers: header});
    // }
    checkInfomationBnplFec(data: any): Observable<any> {
        const header = new HttpHeaders({
            'ms2-authorization': 'bearer 92c71960-17a6-47aa-b047-3ba11f070bb5',
            'TransID': '40f8e4f1-31ee-4406-a6ca-0b27ee1157y6',
            'RequestorID': 'bnpl',
            'DateTime': '2022-05-10T01:36:12.118+00:00',
            'Content-Type': 'application/json',
        });
        return this.http.post(this.api_url_check_bnpl_fec, data, {headers: header});
    }
}
