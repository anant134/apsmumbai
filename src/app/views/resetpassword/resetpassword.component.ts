import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { commonService } from "../../service/commonService-service";

@Component({
  selector: "app-resetpassword",
  templateUrl: "./resetpassword.component.html",
  styleUrls: ["./resetpassword.component.scss"],
  providers: [MessageService],
})
export class ResetpasswordComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  isEmailvaildate = false;
  userdisbale = true;
  userid: any = "";
  vaildateCode: any = "";
  constructor(
    private route: ActivatedRoute,
    private commonService: commonService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      confirmpassword: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      this.vaildateCode = params.id;
      this.isEmailvaildate =
        params.email == "" || params.email == undefined ? false : true;

      this.getUserInfo(this.vaildateCode);
    });

    this.form.controls["confirmpassword"].disable();
    this.form.controls["password"].disable();
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  diableenablecontrol(flag) {
    if (flag) {
      this.form.controls["confirmpassword"].disable();
      this.form.controls["password"].disable();
    } else {
      this.form.controls["confirmpassword"].enable();
      this.form.controls["password"].enable();
    }
  }
  getUserInfo(Code) {
    this.diableenablecontrol(true);
    this.commonService
      .post(
        { requestfor: "getUserInfoByCode", data: { code: Code } },
        "user.php"
      )
      .subscribe(
        (result) => {
          // Handle result
          console.log(result);
          if (result.resultkey == 1) {
            if (result.resultvalue[0].errflag == 0) {
              this.userid = result.resultvalue[0].id;
              this.diableenablecontrol(false);
            } else {
              this.messageService.add({
                severity: "error",
                summary: "Error",
                detail: result.resultvalue[0].errmsg.toString(),
              });
            }
          }
        },
        (error) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.toString(),
          });
        }
      );
  }
  clear() {
    this.form.reset();
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    } else {
      if (
        this.form.controls.password.value !=
        this.form.controls.confirmpassword.value
      ) {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Password does not match",
        });
        return;
      }
      this.commonService
        .post(
          {
            requestfor: "restPassword",
            data: {
              userid: this.userid,
              pcode: this.vaildateCode,
              password: this.form.controls.password.value,
              isEmailvaildate: this.isEmailvaildate,
            },
          },
          "user.php"
        )
        .subscribe((res: any) => {
          debugger;
          if (res.resultkey == 1) {
            if (res.resultvalue.length > 0) {
              if (res.resultvalue[0].errflag == 0) {
                this.messageService.add({
                  severity: "success",
                  summary: "Success",
                  detail: "Password change successfully.",
                });
                setTimeout(() => {
                  this.router.navigate(["login"], {});
                }, 2000);
              } else {
                this.messageService.add({
                  severity: "error",
                  summary: "Error",
                  detail: res.resultvalue[0].errmsg,
                });
              }
            }
          }
        });
    }
  }
}
