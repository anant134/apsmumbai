import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { MessageService } from "primeng/api";
import { commonService } from "../../service/commonService-service";

@Component({
  selector: "app-provincemaster",
  templateUrl: "./provincemaster.component.html",
  styleUrls: ["./provincemaster.component.scss"],
  providers: [MessageService],
})
export class ProvincemasterComponent implements OnInit {
  modalRef: BsModalRef;
  provinceInfo: any;
  countryInfo: any;
  formprovince = new FormGroup({
    name: new FormControl("", [Validators.required]),
    id: new FormControl(""),
    countryid: new FormControl("", [Validators.required]),
  });
  constructor(
    private modalService: BsModalService,
    private commonService: commonService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadCountry();
    this.loadProvince();
  }
  get f() {
    return this.formprovince.controls;
  }
  loadCountry() {
    this.commonService
      .post(
        {
          requestfor: "getCountry",
          data: {},
        },
        "country.php"
      )
      .subscribe((res: any) => {
        if (res.resultkey == 1) {
          debugger;
          this.countryInfo = res.resultvalue;
        }
      });
  }
  loadProvince() {
    this.commonService
      .post(
        {
          requestfor: "getProvince",
          data: { flag: "all" },
        },
        "province.php"
      )
      .subscribe((res: any) => {
        if (res.resultkey == 1) {
          debugger;
          this.provinceInfo = res.resultvalue;
        }
      });
  }
}
