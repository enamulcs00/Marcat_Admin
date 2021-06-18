import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormGroupDirective,
  NgForm
} from "@angular/forms";
import { ApiService } from 'src/services/api.service';
import { CommonService } from 'src/services/common.service';
import { ErrorStateMatcher } from '@angular/material';



/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;
  matcher = new MyErrorStateMatcher();
  disableButton: boolean;
  rememberMe: boolean
  progress: boolean;
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private commonService: CommonService) { }


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl("", Validators.required),
      password: new FormControl("", [Validators.required, Validators.minLength(7)]),
    });
    this.checkRememberMe()
  }


  checkRememberMe() {

    if (localStorage.getItem('rememberMe')) {
      let userDetails = JSON.parse(localStorage.getItem('rememberMe'));
      this.loginForm.controls['email'].setValue(userDetails.email);
      this.loginForm.controls['password'].setValue(userDetails.password);
      this.rememberMe = true

    }
  }

  goToforgotPassword() {
    this.router.navigate(['forgotPassword']);
  }
  goToRegister() {
    this.router.navigate(['sign-Up']);
  }
  onLogin() {


    this.submitted = true;
    if (this.loginForm.valid && this.submitted) {
      const data = this.loginForm.value;
      this.progress = true
      this.apiService.singIn(data).subscribe(res => {
        if (res.success) {
          console.log(res);

          this.progress = false

          // this.commonService.successToast(res.message);
          let body = {
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            roles: res.data.roles,
            lang: res.data.lang,
            celebrityType: res.data.celebrityType,
            email: res.data.email,
            status: res.data.status,
            profilePic: res.data.profilePic,
            isVerified: res.data.isVerified,
            sellerProfileStatus: res.data.sellerProfileStatus,
            _id: res.data._id,
            permissions: res.data.permissions,
            countryCode: res.data.countryCode,
            phone: res.data.phone,
            loginType: res.data.loginType,
          }

          if (this.rememberMe) {
            let userData = this.loginForm.value;
            localStorage.setItem('rememberMe', JSON.stringify(userData))
          } else {
            localStorage.removeItem('rememberMe')
          }
          this.apiService.setUser(JSON.stringify(body));

          this.apiService.sendToken(res.data.accessToken);
          if (res.data.roles == 'celebrity' || res.data.roles == 'merchant') {
            if (res.data.profileStatus === 0 && res.data.sellerProfileStatus === 0) {
              this.router.navigate(['setUpProfile'], { queryParams: { 'roles': res.data.roles } });
            } else {
              this.router.navigate(['dashboard']);
            }
          } else {
            this.router.navigate(['dashboard']);
          }
        }
        else {
          this.progress = false
          this.commonService.errorToast(res.message);

        }
      })
    }
  }
}
