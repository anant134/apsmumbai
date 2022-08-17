import { Component, OnInit } from "@angular/core";

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
  selector: "app-forgetpassword",
  templateUrl: "./forgetpassword.component.html",
  styleUrls: ["./forgetpassword.component.scss"],
  providers: [MessageService],
})
export class ForgetpasswordComponent implements OnInit {
  form: FormGroup;
  submitted = false;
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
      username: ["", [Validators.required]],
    });
  }
  login() {
    this.router.navigate(["login"], {});
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    } else {
      this.commonService
        .post(
          {
            requestfor: "forgetpassword",
            data: {
              username: this.form.controls.username.value,
            },
          },
          "user.php"
        )
        // .subscribe((res: any) => {
        //   debugger;
        //   if (res.resultkey == 1) {
        //   }
        // });

        .subscribe(
          (result) => {
            // Handle result
            console.log(result);
          },
          (error) => {}
        );
    }
  }
}
