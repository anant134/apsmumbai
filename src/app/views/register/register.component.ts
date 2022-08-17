import { Component } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { commonService } from "../../service/commonService-service";
import { MessageService } from "primeng/api";
@Component({
  selector: "app-dashboard",
  templateUrl: "register.component.html",
  providers: [MessageService],
})
export class RegisterComponent {
  provinceId: string;
  municiplalityId: string;
  barangayId: string;
  displayModal: boolean;
  form: FormGroup;
  submitted = false;
  paddchecked: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private commonService: commonService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {}
  selectedProvince: any = null;
  selectedMuniciplality: any = null;
  selectedBarangay: any = null;
  selectedPProvince: any = null;
  selectedPMuniciplality: any = null;
  selectedPBarangay: any = null;
  selectedGender: any = null;

  province: any[] = [];
  municiplality: any[] = [];
  barangay: any[] = [];
  gender: any[] = [
    { code: "m", name: "Male" },
    { code: "f", name: "Female" },
    { code: "o", name: "Other" },
  ];
  bloodgroup: any[] = [
    { code: "A+", name: "A+ (A positive)" },
    { code: "A−", name: "A− (A negative)" },
    { code: "B+", name: "B+ (B positive)" },
    { code: "B−", name: "B− (B negative)" },
    { code: "AB+", name: "AB+ (AB positive)" },
    { code: "AB−", name: "AB− (AB negative)" },
    { code: "O+", name: "O+ (O positive)" },
    { code: "O−", name: "O− (O negative)" },
  ];
  nationality: any[] = [{ code: "ph", name: "Philippine" }];

  dob: any = new Date();
  age: any = 0;

  showModalDialog() {
    this.displayModal = true;
    this.form.reset();
  }
  CloseAndReset() {
    this.displayModal = false;
  }
  chkPAS(event: any) {
    console.log(event);
    if (event) {
      this.form.controls.paddress.setValue(this.form.value.address);
      this.form.controls.selectedPProvince.setValue(
        this.form.value.selectedProvince
      );
      this.form.controls.selectedPMuniciplality.setValue(
        this.form.value.selectedMuniciplality
      );
      this.form.controls.selectedPBarangay.setValue(
        this.form.value.selectedBarangay
      );
    } else {
      this.form.controls.paddress.setValue("");
      this.form.controls.selectedPProvince.setValue("");
      this.form.controls.selectedPMuniciplality.setValue("");
      this.form.controls.selectedPBarangay.setValue("");
    }
  }
  onChangeProvince(value) {
    var locMuniciplality = [];
    var _municiplalityvalues = this.form.value.selectedProvince.municiplality;

    for (let m = 0; m < _municiplalityvalues.length; m++) {
      const eleMuniciplality = _municiplalityvalues[m];
      locMuniciplality.push({
        code: eleMuniciplality.id,
        name: eleMuniciplality.municiplalityName,
      });
    }

    this.municiplality = locMuniciplality;
    if (value != "") {
      this.form.controls.selectedMuniciplality.setValue(value);
    }
  }
  onChangePProvince(value) {
    var locMuniciplality = [];
    var _municiplalityvalues = this.form.value.selectedPProvince.municiplality;

    for (let m = 0; m < _municiplalityvalues.length; m++) {
      const eleMuniciplality = _municiplalityvalues[m];
      locMuniciplality.push({
        code: eleMuniciplality.id,
        name: eleMuniciplality.municiplalityName,
      });
    }

    this.municiplality = locMuniciplality;
    if (value != "") {
      this.form.controls.selectedPMuniciplality.setValue(value);
    }
  }
  onChangeMuniciplality(value) {
    // debugger;
    // console.log(this.form.value.selectedProvince.municiplality);
    var _municiplality = this.form.value.selectedProvince.municiplality;
    var _selectedMuniciplality = _municiplality.filter(
      (x) => x.id == this.form.value.selectedMuniciplality.code
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
      this.form.controls.selectedBarangay.setValue(value);
    }
  }
  onChangePMuniciplality(value) {
    // debugger;
    // console.log(this.form.value.selectedProvince.municiplality);
    var _municiplality = this.form.value.selectedPProvince.municiplality;
    var _selectedMuniciplality = _municiplality.filter(
      (x) => x.id == this.form.value.selectedPMuniciplality.code
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
      this.form.controls.selectedPBarangay.setValue(value);
    }
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
          this.autoSelectProvinceMuniciplalityBarangay();
        }
      });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    var finalData = {
      provinceID: this.form.value.selectedProvince.pcode,
      municiplalityID: this.form.value.selectedMuniciplality.code,
      barangayID: this.form.value.selectedBarangay.code,
      pprovinceID: this.form.value.selectedPProvince.pcode,
      pmuniciplalityID: this.form.value.selectedPMuniciplality.code,
      pbarangayID: this.form.value.selectedPBarangay.code,
      seniorCitizenID: this.form.value.seniorCitizenID,
      firstName: this.form.value.firstName,
      middleName: this.form.value.middleName,
      lastName: this.form.value.lastName,
      dob: this.form.value.dob,
      address: this.form.value.address,
      paddress: this.form.value.paddress,
      placeOfBirth: this.form.value.placeofbirth,
      mobileNumber: this.form.value.mobilenumber,
      natureOfWork: this.form.value.natureofwork,
      gender: this.form.value.selectedGender.code,
      nationality: this.form.value.selectedNationality.code,
      selectedBloodGroup: this.form.value.selectedBloodGroup.code,
      email: this.form.value.email,
      flag: "i",
    };

    this.commonService
      .post({ requestfor: "registration", data: finalData }, "registration.php")
      .subscribe((res: any) => {
        //  debugger;
        if (res.resultkey == 1) {
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: "Registration successfully ",
          });
          this.showModalDialog();
          // window.location.reload();
        } else {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: res.resultvalue,
          });
        }
      });
  }
  onReset(): void {
    this.submitted = false;
    this.form.reset();
    this.municiplality = [];
    this.barangay = [];
    this.form.controls.dob.setValue(new Date());
    this.showModalDialog();
  }
  autoSelectProvinceMuniciplalityBarangay() {
    this.route.queryParams.subscribe((params) => {
      console.log(params); // { orderby: "price" }
      this.provinceId = params.p;
      this.municiplalityId = params.m;
      this.barangayId = params.b;

      var _p = this.province.filter((x) => x.pcode == params.p);
      if (_p.length > 0) {
        this.form.controls.selectedProvince.setValue(_p[0]);
        var _m = _p[0].municiplality.filter((x) => x.mcode == params.m);
        if (_m.length > 0) {
          this.form.controls.selectedMuniciplality.setValue({
            code: _m[0].mcode,
            name: _m[0].municiplalityName,
          });
          this.onChangeProvince({
            code: _m[0].mcode,
            name: _m[0].municiplalityName,
          });

          var _b = _m[0].municiplalityBarangay.filter(
            (x) => x.bcode == params.b
          );
          if (_b.length > 0) {
            this.form.controls.selectedBarangay.setValue({
              code: _b[0].bcode,
              name: _b[0].barangayName,
            });
            this.onChangeMuniciplality({
              code: _b[0].bcode,
              name: _b[0].barangayName,
            });
          } else {
            this.onChangeMuniciplality("");
          }
        }
      }
    });
  }
  ngOnInit(): void {
    this.getProvinceAndMuniciplality();

    this.form = this.formBuilder.group({
      selectedProvince: ["", [Validators.required]],
      selectedMuniciplality: ["", [Validators.required]],
      selectedBarangay: ["", [Validators.required]],
      selectedPProvince: ["", [Validators.required]],
      selectedPMuniciplality: ["", [Validators.required]],
      selectedPBarangay: ["", [Validators.required]],
      seniorCitizenID: ["", [Validators.required]],
      firstName: ["", [Validators.required]],
      middleName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      dob: new Date(),
      address: "",
      paddress: "",
      placeofbirth: "",
      mobilenumber: [
        "",
        [
          Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      natureofwork: "",
      selectedGender: ["", [Validators.required]],
      selectedNationality: ["", [Validators.required]],
      selectedBloodGroup: "",
      email: ["", [Validators.required, Validators.email]],
    });
    this.calculateAge();
  }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  calculateAge() {
    let timeDiff = Math.abs(Date.now() - this.form.value.dob.getTime());
    this.age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
  }
}
