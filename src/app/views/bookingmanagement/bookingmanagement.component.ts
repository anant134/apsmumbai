import { Component, TemplateRef } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { MessageService } from "primeng/api";
import { commonService } from "../../service/commonService-service";
import * as moment from "moment";
import { guid } from "@fullcalendar/angular";
@Component({
  templateUrl: "bookingmanagement.component.html",
  providers: [MessageService],
})
export class BookingManagementComponent {
  modalRef: BsModalRef;

  form: FormGroup;
  submitted = false;
  modelpopuptitle = "Booking appointment for primary guest.";
  selectedProvince: any = null;
  selectedMuniciplality: any = null;
  selectedBarangay: any = null;
  selectedGender: any = null;
  selectedSlots: any = null;
  userInfo: any = null;
  bookingInfo: any = null;
  isHoilday: any = false;
  accAppDtlSel: any = true;
  accAppDtlDis: any = false;
  accAppDtl: any = "";

  accPersonalInfoSel: any = false;
  accPersonalInfoDis: any = true;

  slotsData: any[] = [];
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
  isParentAcc: any = true;
  appointmentdate: any = new Date();

  isAddApplicant: any = true;
  parentid: any = "";
  bookingid: any = "";

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  constructor(
    private modalService: BsModalService,
    private commonService: commonService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {}

  LogData() {
    var oldData = { firstname: "Anant", lastname: "S" };
    var newData = { lastname: "Shetty" };
    var logdata = {
      tablename: "Test",
      id: 1,
      loginfo: this.commonService.log(oldData, newData),
      createdon: new Date(),
      userid: 1,
      username: "Moorthi",
      trnsid: guid(),
    };
    console.log(logdata);
    var oldData1 = { firstname: "Anant", lastname: "S" };
    var newData1 = { firstname: "Akshay", lastname: "Shetty" };
    var logdata1 = {
      tablename: "Test",
      id: 1,
      loginfo: this.commonService.log(oldData1, newData1),
      createdon: new Date(),
      userid: 1,
      username: "Moorthi",
      trnsid: guid(),
    };
    console.log(logdata1);
    var oldData2 = { firstname: "Anant", lastname: "Shetty" };
    var newData2 = {
      firstname: "Anant",
      lastname: "Shetty",
      address: "Mumbai",
    };
    var logdata2 = {
      tablename: "Test",
      id: 1,
      loginfo: this.commonService.log(oldData2, newData2),
      createdon: new Date(),
      userid: 1,
      username: "Moorthi",
      trnsid: guid(),
    };

    console.log(logdata2);
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
      seniorCitizenID: this.form.value.seniorCitizenID,
      firstName: this.form.value.firstName,
      middleName: this.form.value.middleName,
      lastName: this.form.value.lastName,
      dob: this.form.value.dob,
      address: this.form.value.address,
      placeOfBirth: this.form.value.placeofbirth,
      mobilenumber: this.form.value.mobilenumber,
      natureOfWork: this.form.value.natureofwork,
      gender: this.form.value.selectedGender.code,
      nationality: this.form.value.selectedNationality.code,
      selectedBloodGroup: this.form.value.selectedBloodGroup.code,
      email: this.form.value.emailid,
      appointmentdate: moment(this.appointmentdate).format("YYYY-MM-DD"),
      parentid: "",
      bookingid: this.bookingid,
      isParentBooking: false,
      isAddApplicant: this.isAddApplicant,
      registrationid: this.bookingid,
      userid: this.userInfo[0].id,
      selectedSlots: this.form.value.selectedSlots.slotId,
      Slotsdate: "",
    };

    var _requestfor = "BookApplicant";
    if (this.isAddApplicant) {
      finalData.parentid = this.parentid;
      finalData.appointmentdate = "";
      _requestfor = "AddApplicant";
    } else {
      finalData.isParentBooking =
        this.parentid == null || this.parentid == "0" ? true : false;
      finalData.Slotsdate =
        this.form.value.selectedSlots.slotId.toString().substring(0, 4) +
        "-" +
        this.form.value.selectedSlots.slotId.toString().substring(4, 6) +
        "-" +
        this.form.value.selectedSlots.slotId.toString().substring(6, 8);
    }

    this.commonService
      .post(
        {
          requestfor: _requestfor,
          data: finalData,
        },
        "registration.php"
      )
      .subscribe((res: any) => {
        debugger;
        if (res.errflag > 0) {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: res.errmsg,
          });
        } else {
          if (this.isAddApplicant) {
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: "Applicant Add successfully.",
            });
          } else {
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: "Thanks for booking",
            });
          }

          window.location.reload();
        }
      });

    console.log(finalData);
  }
  openModalApplicant(template: TemplateRef<any>) {
    this.isAddApplicant = true;
    this.accPersonalInfoSel = true;
    this.accPersonalInfoDis = false;
    this.parentid = "";
    this.bookingid = "";
    this.modalRef = this.modalService.show(template, {
      class: "modal-xl",
      animated: true,
      backdrop: "static",
    });
    this.setInfo();
  }
  openModal(template: TemplateRef<any>, bookingData: any) {
    debugger;
    this.isAddApplicant = false;
    this.accAppDtl = "";
    if (
      bookingData.appointmentdate != "" ||
      bookingData.appointmentdate == undefined
    ) {
      this.accAppDtl =
        moment(bookingData.appointmentdate).format("YYYY-MM-DD") +
        " " +
        moment(bookingData.slotidatetime).format("h:mm a");
    }
    this.parentid = bookingData.parentid;
    this.bookingid = bookingData.id;

    this.form.get("selectedProvince").disable();
    this.form.get("selectedMuniciplality").disable();
    this.form.get("selectedBarangay").disable();
    this.form.get("firstName").disable();
    this.form.get("middleName").disable();
    this.form.get("lastName").disable();
    this.form.get("seniorCitizenID").disable();
    this.form.get("dob").disable();
    this.form.get("address").disable();
    this.form.get("placeofbirth").disable();
    this.form.get("mobilenumber").disable();
    this.form.get("natureofwork").disable();
    this.form.get("selectedGender").disable();
    this.form.get("selectedNationality").disable();
    this.form.get("selectedBloodGroup").disable();
    this.form.get("emailid").disable();

    this.commonService
      .post(
        {
          requestfor: "getCurrentSlots",
          data: { slotsDate: this.appointmentdate },
        },
        "slots.php"
      )
      .subscribe((res: any) => {
        if (res.resultkey == 1) {
          this.slotsData = res.resultvalue;
          this.isHoilday = false;
          if (this.slotsData.length > 0) {
            if (this.slotsData[0].slotId == -1) {
              this.isHoilday = true;
            }
          }
          this.accAppDtlSel = true;
          this.accAppDtlDis = false;
          this.accPersonalInfoSel = false;
          this.accPersonalInfoDis = true;
          this.modalRef = this.modalService.show(template, {
            class: "modal-xl",
            animated: true,
            backdrop: "static",
          });
        }
      });
  }
  getSlotsforDates() {
    debugger;
    var appdate = moment(this.appointmentdate).format("YYYY-MM-DD");
    this.commonService
      .post(
        {
          requestfor: "getCurrentSlots",
          data: { slotsDate: appdate },
        },
        "slots.php"
      )
      .subscribe((res: any) => {
        if (res.resultkey == 1) {
          //  debugger;
          this.slotsData = res.resultvalue;

          this.isHoilday = false;
          if (this.slotsData.length > 0) {
            if (this.slotsData[0].slotId == -1) {
              this.isHoilday = true;
            }
          }
        }
      });
  }
  getBookingInfo() {
    debugger;
    var admin =
      this.userInfo[0].isAdmin != "0" || this.userInfo[0].isSuperAdmin != "0"
        ? 1
        : 0;
    this.commonService
      .post(
        {
          requestfor: "getBookingInfo",
          data: { userid: this.userInfo[0].id, isadmin: admin },
        },
        "registration.php"
      )
      .subscribe((res: any) => {
        if (res.resultkey == 1) {
          debugger;

          for (let index = 0; index < res.resultvalue.length; index++) {
            res.resultvalue[index].slotidatetime = "";
            res.resultvalue[index].slotidatetime =
              res.resultvalue[index].slotid == null
                ? ""
                : res.resultvalue[index].slotid.toString().substring(0, 4) +
                  "-" +
                  res.resultvalue[index].slotid.toString().substring(4, 6) +
                  "-" +
                  res.resultvalue[index].slotid.toString().substring(6, 8) +
                  " " +
                  res.resultvalue[index].slotid.substring(
                    8,
                    res.resultvalue[index].slotid.length
                  ) +
                  ":00:00";
            //2022-01-25 00:00:00
          }

          this.bookingInfo = res.resultvalue;
          console.log(this.bookingInfo);
        }
      });
  }
  selectSlot(data) {
    //debugger;
    // console.log(data);
    if (data.avialbleSlots > 0) {
      this.form.controls["selectedSlots"].setValue(data);
      var startAmPm = data.startTime > 12 ? "PM" : "AM";
      var endAmPm = data.endTime > 12 ? "PM" : "AM";
      this.accAppDtl =
        moment(this.appointmentdate).format("YYYY-MM-DD") +
        " " +
        data.startTime +
        "" +
        startAmPm;
      // " - " +
      // data.endTime +
      // "" +
      // endAmPm +
      // ")";

      this.accAppDtlSel = false;
      this.accAppDtlDis = false;
      this.accPersonalInfoSel = true;
      this.accPersonalInfoDis = false;
      this.setInfo();
    }
  }

  setInfo() {
    if (this.bookingInfo.length > 0) {
      if (this.isAddApplicant) {
        this.form.controls.firstName.setValue("");
        this.form.controls.lastName.setValue("");
        this.form.controls.middleName.setValue("");
        this.form.controls.address.setValue("");
        this.form.controls.dob.setValue(new Date());
        this.form.controls.selectedBloodGroup.setValue({});
        this.form.controls.selectedGender.setValue({});
        this.form.controls.emailid.setValue("");
        this.form.controls.mobilenumber.setValue("");
        this.form.controls.natureofwork.setValue("");
        this.form.controls.placeofbirth.setValue("");
        this.form.controls.seniorCitizenID.setValue("");
      } else {
        this.form.controls.seniorCitizenID.setValue(
          this.bookingInfo[0].residentid
        );
        this.form.controls.firstName.setValue(this.bookingInfo[0].firstname);
        this.form.controls.lastName.setValue(this.bookingInfo[0].lastname);
        this.form.controls.middleName.setValue(this.bookingInfo[0].middlename);
        this.form.controls.address.setValue(this.bookingInfo[0].address);
        this.form.controls.dob.setValue(
          new Date(this.bookingInfo[0].birthdate)
        );
        var bloodgrp = [];
        if (this.bookingInfo[0].bloodtype != "") {
          bloodgrp = this.bloodgroup.filter(
            (x) => x.code == this.bookingInfo[0].bloodtype
          );
          if (bloodgrp.length > 0)
            this.form.controls.selectedBloodGroup.setValue({
              code: bloodgrp[0].code,
              name: bloodgrp[0].name,
            });
        }
        var gdr = [];
        if (this.bookingInfo[0].gender != "") {
          gdr = this.gender.filter((x) => x.code == this.bookingInfo[0].gender);
          if (gdr.length > 0)
            this.form.controls.selectedGender.setValue({
              code: gdr[0].code,
              name: gdr[0].name,
            });
        }
        this.form.controls.emailid.setValue(this.bookingInfo[0].emailid);
        this.form.controls.mobilenumber.setValue(
          this.bookingInfo[0].mobilenumber
        );
        this.form.controls.natureofwork.setValue(
          this.bookingInfo[0].natureofwork
        );
        this.form.controls.placeofbirth.setValue(
          this.bookingInfo[0].placeofbirth
        );
      }

      var ntl = [];
      if (this.bookingInfo[0].nationality != "") {
        ntl = this.nationality.filter(
          (x) => x.code == this.bookingInfo[0].nationality
        );
        if (ntl.length > 0)
          this.form.controls.selectedNationality.setValue({
            code: ntl[0].code,
            name: ntl[0].name,
          });
      }

      var _p = this.province.filter(
        (x) => x.pcode == this.bookingInfo[0].province
      );

      if (_p.length > 0) {
        this.form.controls.selectedProvince.setValue(_p[0]);
        var _m = _p[0].municiplality.filter(
          (x) => x.mcode == this.bookingInfo[0].municiplality
        );
        debugger;
        this.onChangeProvince({
          code: _m[0].mcode,
          name: _m[0].municiplalityName,
        });
        var _b = _m[0].municiplalityBarangay.filter(
          (x) => x.bcode == this.bookingInfo[0].barangay
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
        }
      });
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

  onChangeMuniciplality(value) {
    //debugger;
    //  console.log(this.form.value.selectedProvince.municiplality);
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
  ngOnInit(): void {
    this.userInfo =
      sessionStorage.length > 0
        ? JSON.parse(sessionStorage.getItem("userdata"))
        : [];

    this.form = this.formBuilder.group({
      selectedProvince: ["", [Validators.required]],
      selectedMuniciplality: ["", [Validators.required]],
      selectedBarangay: ["", [Validators.required]],
      seniorCitizenID: ["", [Validators.required]],
      firstName: ["", [Validators.required]],
      middleName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      dob: new Date(),
      address: "",
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
      emailid: ["", [Validators.required, Validators.email]],
      appointmentdate: new Date(),
      selectedSlots: "",
    });

    this.getBookingInfo();
    this.getProvinceAndMuniciplality();

    //   this.calculateAge();
  }
}
