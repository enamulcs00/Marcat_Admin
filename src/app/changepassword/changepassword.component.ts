import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiService } from 'src/services/api.service';
import { CommonService } from 'src/services/common.service';
import { Router } from '@angular/router';
import { MustMatch } from 'src/services/mustMatch';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  submitted: boolean = false;
  changePassForm: FormGroup
  progress: boolean;
  constructor(private formBuilder: FormBuilder,
    private apiService: ApiService,
    private commService: CommonService,
    private router: Router) {



  }
  ngOnInit() {

    this.changePassForm = this.formBuilder.group({
      oldPassword: new FormControl("", [Validators.required, Validators.minLength(7), Validators.maxLength(25)]),
      newPassword: new FormControl("", [Validators.required, Validators.minLength(7), Validators.maxLength(25)]),
      confirmPassword: new FormControl("", [Validators.required, Validators.minLength(7), Validators.maxLength(25)]),
    }, {
      validator: MustMatch('newPassword', 'confirmPassword')
    });


  }

  get f() { return this.changePassForm.controls; }
  onChangePassword() {


    this.submitted = true;
    if (this.changePassForm.valid && this.submitted) {
      this.progress = false
      this.apiService.changePassword(this.changePassForm.value).subscribe(res => {
        if (res.success) {
          this.progress = false
          this.commService.successToast(res.message);
          this.router.navigateByUrl("dashboard");
        } else {
          this.progress = false
          this.commService.errorToast(res.message)
        }
      });
    } else {
      console.log(
        "invalid"
      )
    }

  }
}