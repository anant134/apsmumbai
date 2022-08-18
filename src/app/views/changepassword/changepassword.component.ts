import { Component, OnInit } from "@angular/core";
import { commonService } from "../../service/commonService-service";
import { MessageService } from "primeng/api";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: "app-changepassword",
  templateUrl: "./changepassword.component.html",
  styleUrls: ["./changepassword.component.scss"],
  providers: [MessageService],
})
export class ChangepasswordComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  userInfo: any = null;
  constructor(
    private route: ActivatedRoute,
    private commonService: commonService,
    private formBuilder: FormBuilder,
    private router: Router,
    private messageService: MessageService
  ) {}
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      oldpass: ["", [Validators.required]],
      newpass: ["", [Validators.required]],
      confirmpass: ["", [Validators.required]],
    });
  }
  login() {
    this.router.navigate(["login"], {});
  }

  vaildation() {
    if (
      this.form.controls.newpass.value != this.form.controls.confirmpass.value
    ) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "New password and confirm password not match",
      });
      return false;
    }
  }

  onSubmit(): void {
    debugger;
    this.vaildation();
    this.userInfo =
      sessionStorage.length > 0
        ? JSON.parse(sessionStorage.getItem("userdata"))
        : [];
    this.submitted = true;
    if (this.form.invalid) {
      return;
    } else {
      this.commonService
        .post(
          {
            requestfor: "changepassword",
            data: {
              oldpass: this.form.controls.oldpass.value,
              newpass: this.form.controls.newpass.value,
              confirmpass: this.form.controls.confirmpass.value,
              userid: this.userInfo[0].id,
            },
          },
          "user.php"
        )
        .subscribe(
          (result) => {
            console.log(result);
          },
          (error) => {}
        );
    }
  }
}
