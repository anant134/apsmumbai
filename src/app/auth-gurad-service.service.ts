import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthGuradServiceService {
  constructor() {}
  gettoken() {
    return !!sessionStorage.getItem("userdata");
  }
}
