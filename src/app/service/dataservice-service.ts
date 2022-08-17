import { Injectable } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { finalize, map } from "rxjs/operators";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
declare var $: any;
@Injectable({
  providedIn: "root",
})
export class DataService {
  httpOptions: object;
  totalReq: number;

  constructor(private http: HttpClient, private rounter: Router) {
    this.totalReq = 0;
  }
  public getHttp(reqURL: string, objData: any) {
    const params = $.param(objData);
    return this.http
      .get(environment.api_root + reqURL + "?" + params, this.httpOptions)
      .pipe(
        map((x: any) => {
          if (x && x.errorCode && x.errorCode == 401) {
            return x;
          }

          return x;
        })
      )
      .pipe(
        finalize(() => {
          // console.log('loaded');
          //this.totalReq--;
          //console.log("Sub", this.totalReq);
          // if (this.totalReq == 0) {
          // this.global.hideLoader();
          // }
        })
      );
  }

  public postHttpData(reqURL: string, objData: any) {
    let t = new Date().getTime();

    this.httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    return this.http
      .post(environment.api_root + reqURL, objData, this.httpOptions)
      .pipe(
        map((x: any) => {
          if (x && x.errorCode && x.errorCode == 401) {
            // this.global.clearUser();
            this.rounter.navigate(["/login"]);
            x.resultKey = 0;
            return x;
          }

          return x;
        })
      )
      .pipe(
        finalize(() => {
          // console.log('loaded');
          this.totalReq--;
          //console.log("Sub", this.totalReq);
          // if (this.totalReq == 0) {
          // this.global.hideLoader();
          // }
        })
      );
  }
}
