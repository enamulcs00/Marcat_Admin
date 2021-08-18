import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/services/api.service';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  submitted: boolean
  singUpFormWithPhone: FormGroup;
  ShowTrue: boolean;
  progress: boolean;
  constructor(private router: Router, private fb: FormBuilder, private apiService: ApiService, private commonService: CommonService) { }
  singUpFormWithEmail: FormGroup
  ngOnInit() {

    this.singUpFormWithEmail = this.fb.group({
      roles: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(8)]],

    })


  }



  onSignUp() {
    this.submitted = true
    if (this.submitted && this.singUpFormWithEmail.valid) {
      console.log(this.singUpFormWithEmail.value);
      let body = this.singUpFormWithEmail.value;
      this.progress = true
      this.apiService.signUp(body).subscribe(res => {
        console.log(res);
        if (res.success) {
          this.progress = false
          this.commonService.successToast(res.message);
          this.router.navigate(['login']);
        } else {
          this.progress = false
          this.commonService.errorToast(res.message);

        }

      })
    }
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

}
