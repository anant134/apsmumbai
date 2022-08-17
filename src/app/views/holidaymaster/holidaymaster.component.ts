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
  selector: "app-holidaymaster",
  templateUrl: "./holidaymaster.component.html",
  styleUrls: ["./holidaymaster.component.scss"],
  providers: [MessageService],
})
export class HolidaymasterComponent implements OnInit {
  modalRef: BsModalRef;
  holidayInfo: any;
  formholiday = new FormGroup({
    reason: new FormControl("", [Validators.required]),
    id: new FormControl(""),
    date: new FormControl("", [Validators.required]),
  });
  constructor(
    private modalService: BsModalService,
    private commonService: commonService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {}
  get f() {
    return this.formholiday.controls;
  }

  ngOnInit(): void {
    this.loadHoliday();
  }

  loadHoliday() {
    this.commonService
      .post(
        {
          requestfor: "getHolidays",
          data: {},
        },
        "holiday.php"
      )
      .subscribe((res: any) => {
        if (res.resultkey == 1) {
          debugger;
          this.holidayInfo = res.resultvalue;
        }
      });
  }
  openModal(template: TemplateRef<any>, holidayData: any) {
    if (holidayData.id != undefined) {
      this.formholiday.get("reason")!.setValue(holidayData.reason);
      this.formholiday.get("date")!.setValue(holidayData.date);
    }

    this.modalRef = this.modalService.show(template, {
      class: "modal-xl",
      animated: true,
      backdrop: "static",
    });
  }
}
