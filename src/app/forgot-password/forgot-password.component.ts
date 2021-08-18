import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup, FormBuilder, RequiredValidator } from '@angular/forms';
import { ApiService } from 'src/services/api.service';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgetPasswordForm: FormGroup
  email: FormControl;
  submitted: boolean
  countryList: any;
  gotPhoneNumber: boolean = false
  showPage: boolean = true
  otp: any;
  constructor(private router: Router, private formBuilder: FormBuilder, private apiService: ApiService, private commonService: CommonService) { }
  binding: string

  ngOnInit() {
    this.forgetPasswordForm = this.formBuilder.group({
      email: [''],
      phone: [''],
      countryCode: ['']
    })

    this.readCountryCode()


  }


  clickOnCheckBox(e) {

    this.binding = e.value
    if (e.value == 'number') {
      this.forgetPasswordForm.get('phone').setValidators([Validators.required, Validators.maxLength(15)])
      this.forgetPasswordForm.get('countryCode').setValidators([Validators.required])
      this.forgetPasswordForm.get('email').clearValidators()
      this.forgetPasswordForm.get('phone').updateValueAndValidity();
      this.forgetPasswordForm.get('countryCode').updateValueAndValidity()
      this.forgetPasswordForm.get('email').updateValueAndValidity()

    }
    if (e.value === 'email') {
      this.forgetPasswordForm.get('email').setValidators([Validators.required]);
      this.forgetPasswordForm.get('phone').clearValidators();
      this.forgetPasswordForm.get('countryCode').clearValidators()
      this.forgetPasswordForm.get('phone').updateValueAndValidity();
      this.forgetPasswordForm.get('countryCode').updateValueAndValidity()
      this.forgetPasswordForm.get('email').updateValueAndValidity()
    }
  }

  get f() {
    return this.forgetPasswordForm.controls
  }
  readCountryCode() {
    this.apiService.getCountryCode().subscribe(res => {
      console.log(res);
      this.countryList = res;
    })
  }

  goToLogin() {

    this.submitted = true
    let data
    if (this.submitted && this.forgetPasswordForm.valid) {
      if (this.binding === 'email') {
        data = {
          email: this.forgetPasswordForm.controls['email'].value
        }
      } else if (this.binding === 'number') {
        data = {
          countryCode: this.forgetPasswordForm.controls['countryCode'].value,
          phone: this.forgetPasswordForm.controls['phone'].value
        }
      }

      this.apiService.forgetPassword(data).subscribe((res) => {
        console.log(res)
        if (res.success) {
          if (this.binding === 'number') {
            this.showPage = false;
            this.gotPhoneNumber = true;
            this.commonService.successToast(res.message)
          }
          if (this.binding === 'email') {
            this.router.navigate(['']);
            this.commonService.successToast(res.message)

          }

          this.commonService.successToast(res.message)
        } else {
          this.commonService.errorToast(res.message)
        }
      })
    }
  }


  onOtpChange(e) {
    this.otp = e
  }

  onOTPSubmit() {
    let body = {
      phone: this.forgetPasswordForm.controls['phone'].value,
      countryCode: this.forgetPasswordForm.controls['countryCode'].value,
      otp: this.otp,
      type: 'normal'
    }
    console.log(body);
    this.apiService.verifyPhone(body).subscribe(res => {
      console.log(res);
      if (res.success) {
        this.commonService.successToast(res.message)
        this.router.navigate(['resetPassword'], { queryParams: { 'phone': body.phone, 'countryCode': body.countryCode } })
      } else {
        this.commonService.errorToast(res.message)
      }
    })
  }

}
