import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { NgForOf } from '@angular/common';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/services/common.service';

declare var $: any;
interface Ready {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  sub: any
  id: any;

  firstName: string;
  lastName: string;
  UserEmail: string;
  userCountryCode: string;
  UserPhoneNumber: string;
  status: string;
  numberOfOrder: string;
  completedOrder: string;
  rejectedOrder: string;
  totalAmountPaid: string;
  editUserForm: FormGroup
  submitted: boolean;
  progress: boolean;

  constructor(private router: Router, private fb: FormBuilder, private commonService: CommonService, private route: ActivatedRoute, private apiService: ApiService,
    private datePipe: DatePipe) {

    this.editUserForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      UserEmail: ['', [Validators.required, Validators.email]],
      userCountryCode: ['', Validators.required],
      UserPhoneNumber: ['', Validators.required],
      numberOfOrder: ['', Validators.required],
      completedOrder: ['', Validators.required],
      rejectedOrder: ['', Validators.required],
      totalAmountPaid: ['', Validators.required],



    })


  }


  get f() {
    return this.editUserForm.controls;
  }

  ngOnInit() {
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.id = params['id'];
      });


    this.progress = true
    this.apiService.viewUser(this.id).subscribe((res) => {
      if (res.success) {
        this.progress = false
        console.log(res.data);
        this.editUserForm.controls['firstName'].setValue(res.data.firstName);

        this.editUserForm.controls['lastName'].setValue(res.data.lastName);
        this.editUserForm.controls['UserEmail'].setValue(res.data.email);
        this.editUserForm.controls['userCountryCode'].setValue(res.data.countryCode);
        this.editUserForm.controls['UserPhoneNumber'].setValue(res.data.phone);
        this.editUserForm.controls['numberOfOrder'].setValue(res.data.totalOrders);
        this.editUserForm.controls['completedOrder'].setValue(res.data.completedOrders);
        this.editUserForm.controls['rejectedOrder'].setValue(res.data.rejectedOrders);
        this.editUserForm.controls['totalAmountPaid'].setValue(res.data.totalPaid);
        // this.firstName = res.data.firstName;
        // this.lastName = res.data.lastName;
        // this.userCountryCode = res.data.countryCode;
        // this.UserEmail = res.data.email;
        // this.UserPhoneNumber = res.data.phone;
        //this.status = res.data.status;
        this.numberOfOrder = res.data.totalOrders;
        this.completedOrder = res.data.completedOrders;
        this.rejectedOrder = res.data.rejectedOrders;
        this.totalAmountPaid = res.data.totalPaid

        if (this.status === "0") {
          this.status = this.pick[1].value
        } else {
          this.status = this.pick[0].value
        }


      } else {
        this.progress = false
        this.commonService.errorToast(res.message)
      }
    });
  }



  updateUser() {
    let userUpdate = {}
    this.submitted = true
    console.log(this.id)
    let temp: number
    if (this.status == "active") {
      temp = 1
    } else {
      temp = 0
    }

    if (this.submitted && this.editUserForm.valid) {
      let userUpdate = {
        id: this.id,
        firstName: this.editUserForm.get('firstName').value,
        lastName: this.editUserForm.get('lastName').value,
        email: this.editUserForm.get('UserEmail').value,
        countryCode: this.editUserForm.get('userCountryCode').value,
        phone: this.editUserForm.get('UserPhoneNumber').value,
        totalOrders: this.editUserForm.get('numberOfOrder').value,
        completedOrders: this.editUserForm.get('completedOrder').value,
        rejectedOrders: this.editUserForm.get('rejectedOrder').value,
        totalPaid: this.editUserForm.get('totalAmountPaid').value,

      }
      this.progress = true
      this.apiService.editUser(userUpdate).subscribe((res) => {
        console.log(res);
        if (res.success) {
          this.progress = false
          this.commonService.successToast(res.message)
        } else {
          this.progress = false
          this.commonService.errorToast(res.message)
        }
        this.goTomanageUser()
      });

    } else {
      console.log("form is invalid")
    }






    // let userUpdate = {
    //   id: this.id,
    //   firstName: this.firstName,
    //   lastName: this.lastName,
    //   email: this.UserEmail,
    //   phone: this.UserPhoneNumber,
    //   status: temp,
    //   totalOrders: this.numberOfOrder,
    //   completedOrders: this.completedOrder,
    //   rejectedOrders: this.rejectedOrder,
    //   totalPaid: this.totalAmountPaid,
    // }

  }
  goTomanageUser() {
    this.router.navigate(['/manageUser'])
  }
  pick: Ready[] = [
    { value: "active", viewValue: 'Active' },
    { value: "inactive", viewValue: 'Inactive' }

  ];
}
