import { Component, OnInit, TemplateRef } from "@angular/core";
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
  selector: "app-countrymaster",
  templateUrl: "./countrymaster.component.html",
  styleUrls: ["./countrymaster.component.scss"],
  providers: [MessageService],
})
export class CountrymasterComponent implements OnInit {
  modalRef: BsModalRef;
  countryInfo: any;
  formcountry = new FormGroup({
    name: new FormControl("", [Validators.required]),
    id: new FormControl(""),
    code: new FormControl(""),
  });
  constructor(
    private modalService: BsModalService,
    private commonService: commonService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {}
  get f() {
    return this.formcountry.controls;
  }

  ngOnInit(): void {
    this.loadCountry();
  }
  onSubmit() {
    if (this.formcountry.valid) {
      var sendData = {
        name: this.formcountry.value,
      };
      this.commonService
        .post(
          {
            requestfor: "saveCountry",
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
  openModal(template: TemplateRef<any>, countryData: any) {
    if (countryData.id != undefined) {
      this.formcountry.get("name")!.setValue(countryData.name);
      this.formcountry.get("code")!.setValue(countryData.code);
    }

    this.modalRef = this.modalService.show(template, {
      class: "modal-xl",
      animated: true,
      backdrop: "static",
    });
  }
}
