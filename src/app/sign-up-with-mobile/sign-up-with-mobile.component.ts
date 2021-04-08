import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'app-sign-up-with-mobile',
  templateUrl: './sign-up-with-mobile.component.html',
  styleUrls: ['./sign-up-with-mobile.component.scss']
})
export class SignUpWithMobileComponent implements OnInit {
  singUpFormWithPhone: FormGroup
  gotPhoneNumber: boolean;
  getPhoneNumber: boolean;
  otp: number;
  submitted: boolean
  countryList: any;
  progress: boolean;
  constructor(private fb: FormBuilder, private router: Router, private apiService: ApiService, private commonService: CommonService) {
    this.readCountryCode()
  }


  readCountryCode() {
    this.apiService.getCountryCode().subscribe(res => {
      console.log(res);
      this.countryList = res;
    })
  }
  ngOnInit() {
    this.getPhoneNumber = true
    this.singUpFormWithPhone = this.fb.group({
      countryCode: ['', Validators.required],
      roles: ['', Validators.required],
      phone: ['', [Validators.required, Validators.maxLength(15)]],
      password: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(8)]],

    })
  }

  onSignUp() {


    this.submitted = true
    if (this.submitted && this.singUpFormWithPhone.valid) {
      console.log(this.singUpFormWithPhone.value);
      let body = this.singUpFormWithPhone.value;
      this.progress = true
      this.apiService.signUp(body).subscribe(res => {
        console.log(res);
        if (res.success) {
          this.progress = false
          this.getPhoneNumber = false
          this.commonService.successToast(res.message);
          this.gotPhoneNumber = true
        } else {
          this.progress = false
          this.commonService.errorToast(res.message);

        }

      })
    }


  }

  onOtpChange(e) {

    console.log(e);
    if (e.length > 3) {
      this.otp = e
    }
  }
  onOTPSubmit() {
    let body = {
      phone: this.singUpFormWithPhone.controls['phone'].value,
      countryCode: this.singUpFormWithPhone.controls['countryCode'].value,
      otp: this.otp,
      type: 'signupVerification'
    }
    console.log(body);
    this.progress = true
    this.apiService.verifyPhone(body).subscribe(res => {
      console.log(res);
      if (res.success) {
        this.progress = false
        this.commonService.successToast(res.message)
        this.router.navigate(['login'])
      } else {
        this.progress = false
        this.commonService.errorToast(res.message)
      }
    })
  }

  //app/verifyPhone
  goToLogin() {
    this.router.navigate(['login']);
  }
}
