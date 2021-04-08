import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { PageEvent } from '@angular/material/paginator';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UrlService } from 'src/services/url.service';
import { element } from 'protractor';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'app-view-vendor',
  templateUrl: './view-vendor.component.html',
  styleUrls: ['./view-vendor.component.scss']
})
export class ViewVendorComponent implements OnInit {


  viewVendor: FormGroup;
  uploaded: boolean;
  imageFile: any;
  profileImage: any;
  lat: any;
  lng: any;
  formattedaddress: any;
  country: any;
  options = {
    types: [],

  }

  celebrityTypeModel = [{
    'value': 2,
    'viewValue': 'Sell'
  },
  {
    'value': 1,
    'viewValue': 'Endorse'
  },
  {
    'value': 3,
    'viewValue': 'Both'
  },]
  userDetails: any;
  roles: any;
  sub: any;
  id: any;
  categoryList: any;
  imageUrl: string;
  matchedCategory = [];
  categories: any;
  userRole: any;
  celebrityType: any;
  progress: boolean;
  constructor(private route: Router, private router: ActivatedRoute, private urlService: UrlService, private apiService: ApiService, private commonService: CommonService, private fb: FormBuilder) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Markat_User'));
    console.log("USer", this.userDetails);
    this.roles = this.userDetails.roles
    this.imageUrl = this.urlService.imageUrl


    this.sub = this.router
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.id = params['id'];

      });

  }

  ngOnInit() {

    this.viewVendor = this.fb.group({

      firstName: ['',],
      lastName: ['',],
      gender: ['',],
      email: ['',],
      countryCode: ['',],
      phone: ['',],
      bio: [''],
      address: ['',],
      celebrityType: ['']



    });
    this.getProfile();

  }


  getProfile() {
    this.progress = true
    this.apiService.viewUser(this.id).subscribe(res => {
      console.log(res);
      if (res.success) {
        this.progress = false
        this.viewVendor.get('firstName').setValue(res.data.firstName),
          this.viewVendor.get('lastName').setValue(res.data.lastName);
        if (res.data.gender == 'M') {
          this.viewVendor.get('gender').setValue('Male');

        } else {
          this.viewVendor.get('gender').setValue('Female');

        }
        this.viewVendor.get('email').setValue(res.data.email),
          this.viewVendor.get('countryCode').setValue(res.data.countryCode),
          this.viewVendor.get('phone').setValue(res.data.phone),
          this.viewVendor.get('bio').setValue(res.data.bio),
          this.viewVendor.get('address').setValue(res.data.address);
        this.viewVendor.get('celebrityType').setValue(res.data.celebrityType);
        this.celebrityType = res.data.celebrityType

        //  this.viewVendor.get('firstName').setValue(res.data.firstName),
        this.userRole = res.data.roles
        this.profileImage = res.data.profilePic;
        this.categories = res.data.categories

        this.viewVendor.disable()

      } else {
        this.progress = false
        this.commonService.errorToast(res.message)
      }

    })
  }



  public AddressChange(address: any) {

    //setting address from API to local variable 
    console.log(address);
    this.lat = address.geometry.location.lat()
    this.lng = address.geometry.location.lng()
    this.formattedaddress = address.formatted_address
    this.viewVendor.get('address').setValue(this.formattedaddress)
    let length = address.address_components.length
    this.country = address.address_components[length - 1].long_name;

  }




  goTovendermanagement() {
    this.route.navigate(['venderManagement'])
  }



}
