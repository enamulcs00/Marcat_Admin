import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from 'src/services/api.service';
import { MustMatch } from 'src/services/mustMatch';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  sub: any;
  countryCode: any;
  phone: any;
  changePassForm: FormGroup
  submitted: boolean;
  progress: boolean;

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private apiService: ApiService, private commonService: CommonService) { }

  ngOnInit() {
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.countryCode = params['countryCode'];
        this.phone = params['phone']
      });

    this.changePassForm = this.fb.group({
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
      let body = {
        phone: this.phone,
        countryCode: this.countryCode,
        password: this.changePassForm.get('newPassword').value
      }
      this.progress = true
      this.apiService.resetPasswordByPhone(body).subscribe(res => {
        if (res.success) {
          this.progress = false
          this.commonService.successToast(res.message);
          this.router.navigateByUrl("login");
        } else {
          this.progress = false
          this.commonService.errorToast(res.message)
        }
      });
    } else {
      console.log(
        "invalid"
      )
    }

  }

  goTologin() {
    this.router.navigate(['login'])
  }
}
