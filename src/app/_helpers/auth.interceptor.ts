import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {from, Observable} from 'rxjs';

import {AuthenticationService} from "../_service/auth/authentication.service";
import {Buffer} from "buffer";
import {Router} from "@angular/router";
import {map, switchMap, tap} from "rxjs/operators";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    private isRef: boolean = false;

    constructor(private authenticationService: AuthenticationService,
                private router: Router) {
    }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return from(this.handleAccess(req, next));
    }

    private async handleAccess(request: HttpRequest<any>, next: HttpHandler):
        Promise<HttpEvent<any>> {
        let checkRequest = (request.url === 'https://apibnpl.voolo.vn/v1/bnpl/user/resetPin');
        let checkRequestRefreshToken = (request.url === 'https://apieap.voolo.vn/v1/eap/auth/requestRefreshToken');
        let checkRequestFec = (request.url.includes('anypoint.mulesoft'));
        let accessToken = this.authenticationService.currentAccessTokenValue;
        let refreshToken = this.authenticationService.refreshTokenValue;

        if (accessToken && !checkRequest && !checkRequestFec) {
            let x = this.parseJwt(accessToken);
            let isExp = new Date(x.exp * 1000) > new Date();
            console.log(new Date(x.exp * 1000))
            if (isExp) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${accessToken}`,
                        appKey:  'WOLFCONSULTING113911',
                        appId:  '998877665544332211'
                    }
                });
            } else {
                if (!checkRequestRefreshToken) {
                    let id = this.authenticationService.userCurrentSubject$.getValue()._id;
                    let email = this.authenticationService.userCurrentSubject$.getValue().email;
                    let data = {
                        id: id,
                        email: email,
                        refreshToken: refreshToken
                    }
                    try {
                        let res = await this.authenticationService.changeToken(data).toPromise();
                        console.log(res);
                        let newToken = res.accessToken;
                        let newRefreshToken = res.refreshToken;
                        localStorage.setItem('accessToken', JSON.stringify(newToken));
                        localStorage.setItem('refreshToken', JSON.stringify(newRefreshToken));
                        this.authenticationService.accessTokenSubject$.next(newToken);
                        this.authenticationService.refreshTokenSubject$.next(newRefreshToken);
                        let neWAccessToken = this.authenticationService.currentAccessTokenValue;
                        request = request.clone({
                            setHeaders: {
                                Authorization: `Bearer ${neWAccessToken}`,
                                appKey:  'WOLFCONSULTING113911',
                                appId:  '998877665544332211'
                            }
                        });
                    } catch (e) {
                        e.message;
                        console.log("loi")
                        this.authenticationService.accessTokenSubject$.next(null);
                        this.authenticationService.userCurrentSubject$.next(null);
                        this.authenticationService.refreshTokenSubject$.next(null);
                        localStorage.removeItem('accessToken');
                        localStorage.removeItem('userCurrent');
                        localStorage.removeItem('refreshToken');
                        this.router.navigate(['/']).then(()=>{window.location.reload();});
                    }
                }
            }
        } else {
            request = request.clone({
                setHeaders: {
                    appKey:  'WOLFCONSULTING113911',
                    appId:  '998877665544332211'
                }
            });
        }
        console.log(request);
        return next.handle(request).toPromise();
    }

    //
    // intercept3(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     let checkRequest = (request.url === 'https://apibnpl.voolo.vn/v1/bnpl/user/resetPin');
    //     let checkRequestRefreshToken = (request.url === 'https://apieap.voolo.vn/v1/eap/auth/requestRefreshToken');
    //     let accessToken = this.authenticationService.currentAccessTokenValue;
    //     let refreshToken = this.authenticationService.refreshTokenValue;
    //     if (accessToken && !checkRequest && !checkRequestRefreshToken) {
    //         let x = this.parseJwt(accessToken);
    //         let isExp = new Date(x.exp * 1000) > new Date();
    //         console.log(new Date(x.exp * 1000))
    //         if (isExp) {
    //             request = request.clone({
    //                 setHeaders: {
    //                     Authorization: `Bearer ${accessToken}`
    //                 }
    //             });
    //             return next.handle(request);
    //         } else {
    //
    //             let id = this.authenticationService.userCurrentSubject$.getValue()._id;
    //             let email = this.authenticationService.userCurrentSubject$.getValue().email;
    //             let data = {
    //                 id: id,
    //                 email: email,
    //                 refreshToken: refreshToken
    //             }
    //
    //             this.authenticationService.changeToken(data).subscribe(next => {
    //                 console.log("result 1", next);
    //                 let newToken = next.accessToken;
    //                 let newRefreshToken = next.refreshToken;
    //                 localStorage.setItem('accessToken', JSON.stringify(newToken));
    //                 localStorage.setItem('refreshToken', JSON.stringify(newRefreshToken));
    //                 this.authenticationService.accessTokenSubject$.next(newToken);
    //                 this.authenticationService.refreshTokenSubject$.next(newRefreshToken);
    //                 this.isRef = true;
    //                 let neWAccessToken = this.authenticationService.currentAccessTokenValue;
    //                 console.log("newToken", neWAccessToken);
    //                 request = request.clone({
    //                     setHeaders: {
    //                         Authorization: `Bearer ${neWAccessToken}`
    //                     }
    //                 });
    //             })
    //
    //         }
    //
    //     }
    //
    //     console.log("newRq 2:", request)
    //     return next.handle(request);
    // }

    parseJwt(token) {
        var base64Payload = token.split('.')[1];
        var payload = Buffer.from(base64Payload, 'base64');
        return JSON.parse(payload.toString());
    }

}
