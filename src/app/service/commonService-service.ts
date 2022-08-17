import { Injectable } from "@angular/core";
import { DataService } from "./dataservice-service";
import { from } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class commonService {
  constructor(private dataservice: DataService) {}

  post(req: any, filename: any, isUpdate: boolean = false) {
    if (isUpdate) {
      this.log({}, {});
    }
    return this.dataservice.postHttpData(filename, req);
  }
  log(olddata: any, newData: any) {
    var orginalValue = {};
    var modifiedValue = {};
    var datainfo = [];
    for (var key in newData) {
      if (newData.hasOwnProperty(key)) {
        if (key != undefined && newData[key] != undefined) {
          if (olddata[key] != newData[key]) {
            var d = { keydata: key, old: olddata[key], new: newData[key] };
            datainfo.push(d);
            orginalValue[key] = olddata[key];
            modifiedValue[key] = newData[key];
          }
        }
      } else {
        var d1 = { keydata: key, old: "", new: newData[key] };
        datainfo.push(d1);
        orginalValue[key] = "";
        modifiedValue[key] = newData[key];
      }
    }
    var result = datainfo;
    return result;
  }
}
