import { Component } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { commonService } from "../../service/commonService-service";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-dashboard",
  templateUrl: "login.component.html",
  providers: [MessageService],
})
export class LoginComponent {
  province: any[] = [];
  municiplality: any[] = [];
  barangay: any[] = [];
  form: FormGroup;
  submitted = false;

  selectedProvince: any = null;
  selectedMuniciplality: any = null;
  selectedBarangay: any = null;

  constructor(
    private route: ActivatedRoute,
    private commonService: commonService,
    private formBuilder: FormBuilder,
    private router: Router,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    sessionStorage.removeItem("userdata");
    this.getProvinceAndMuniciplality();
    this.form = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  getProvinceAndMuniciplality(): void {
    this.commonService
      .post(
        { requestfor: "getProvince", data: { flag: "actv" } },
        "province.php"
      )
      .subscribe((res: any) => {
        if (res.resultkey == 1) {
          this.province = res.resultvalue;
          //   this.autoSelectProvinceMuniciplalityBarangay();
        }
      });
  }

  onChangeProvince(value) {
    var locMuniciplality = [];
    var _municiplalityvalues = this.selectedProvince.municiplality;

    for (let m = 0; m < _municiplalityvalues.length; m++) {
      const eleMuniciplality = _municiplalityvalues[m];
      locMuniciplality.push({
        code: eleMuniciplality.id,
        name: eleMuniciplality.municiplalityName,
      });
    }

    this.municiplality = locMuniciplality;
    if (value != "") {
      this.selectedMuniciplality = value;
    }
  }
  onSignUp() {
    // debugger;
    if (this.selectedProvince == null) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Please Select Province",
      });
    } else if (this.selectedMuniciplality == null) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Please Select Municiplality",
      });
    } else if (this.selectedBarangay == null) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Please Select Barangay",
      });
    } else {
      this.router.navigate(["register"], {
        queryParams: {
          p: this.selectedProvince.pcode,
          m: this.selectedMuniciplality.code,
          b: this.selectedBarangay.code,
        },
      });
    }
  }
  onChangeMuniciplality(value) {
    // debugger;
    // console.log(this.selectedProvince.municiplality);
    var _municiplality = this.selectedProvince.municiplality;
    var _selectedMuniciplality = _municiplality.filter(
      (x) => x.id == this.selectedMuniciplality.code
    );
    this.barangay = [];
    if (_selectedMuniciplality.length > 0) {
      if (_selectedMuniciplality[0].municiplalityBarangay.length > 0) {
        var _municiplalityBarangay =
          _selectedMuniciplality[0].municiplalityBarangay;
        var locBarangay = [];
        for (let m = 0; m < _municiplalityBarangay.length; m++) {
          const eleBarangay = _municiplalityBarangay[m];
          locBarangay.push({
            code: eleBarangay.bcode,
            name: eleBarangay.barangayName,
          });
        }

        this.barangay = locBarangay;
      }
    }
    if (value != "") {
      this.selectedBarangay = value;
    }
  }
  register() {
    this.router.navigate(["register"], {});
  }
  onForgetPassword() {
    this.router.navigate(["forgetpassword"], {});
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    } else {
      this.commonService
        .post(
          {
            requestfor: "vaildateUser",
            data: {
              username: this.form.controls.username.value,
              password: this.form.controls.password.value,
            },
          },
          "user.php"
        )
        .subscribe((res: any) => {
          debugger;
          if (res.resultkey == 1) {
            if (res.resultvalue.length > 0) {
              if (res.resultvalue[0].status > 0) {
                sessionStorage.setItem(
                  "userdata",
                  JSON.stringify(res.resultvalue)
                );
                if (res.resultvalue[0].roleId == 2) {
                  this.router.navigate(["bookingmanage"], {});
                } else {
                  this.router.navigate(["dashboard"], {});
                }
              } else {
                this.messageService.add({
                  severity: "error",
                  summary: "Error",
                  detail: res.resultvalue[0].message,
                });
              }
            }
          }
        });
    }
  }
}
