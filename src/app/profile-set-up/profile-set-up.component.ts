import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { CommonService } from 'src/services/common.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-profile-set-up',
  templateUrl: './profile-set-up.component.html',
  styleUrls: ['./profile-set-up.component.scss']
})
export class ProfileSetUpComponent implements OnInit {
  setUpProfile: FormGroup
  countryList: any;
  userDetails: any;
  categoryList = []
  categoryDropDownSettings: IDropdownSettings = {};
  selectedCategoryItem = []
  formattedaddress = " ";
  options = {
    types: [],

  }

  @ViewChild("placesRef", { static: true }) placesRef: GooglePlaceDirective;
  imageFile: any;
  profileImage: any;
  lat: any;
  lng: any;
  uploaded: boolean = false;
  document = [];
  urls = [];
  selectedCategoryId = [];
  country: any;
  sub: any;
  roles: any;
  progress: boolean;
  constructor(private fb: FormBuilder, private route: Router, private cd: ChangeDetectorRef, private router: ActivatedRoute, private apiService: ApiService, private commonService: CommonService) {

    this.readCountryCode();
    this.userDetails = JSON.parse(sessionStorage.getItem('Markat_User'));
    console.log("USer", this.userDetails);
    this.getCategoryList()

    this.sub = this.router
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.roles = params['roles'];

      });
  }

  getCategoryList() {

    let temp = []
    this.categoryList = []
    let page = 1;
    let count = 2000;

    this.apiService.getAllCategories().subscribe(res => {

      if (res.success) {

        console.log(res)
        if (res.data) {
          for (let i = 0; i < res.data.length; i++) {
            let body = {
              'id': res.data[i].id,
              'text': res.data[i].name
            }
            temp.push(body);
          }
        }
      }
      this.categoryList = temp;
    }
    );
  }

  readCountryCode() {
    this.apiService.getCountryCode().subscribe(res => {
      console.log(res);
      this.countryList = res;
    })
  }

  ngOnInit() {
    this.setUpProfile = this.fb.group({

      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      countryCode: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      bio: ['', Validators.maxLength(220)],
      Specialities: ['', Validators.required],
      celebrityType: ['', Validators.required],
      profilePhoto: [''],
      gender: ['', Validators.required]
    })
    if (this.roles === 'merchant') {
      this.setUpProfile.controls['celebrityType'].disable({ onlySelf: true });

    }

    if (this.userDetails.phone) {
      this.setUpProfile.get('phone').setValue(this.userDetails.phone);
      this.setUpProfile.get('countryCode').setValue(this.userDetails.countryCode);
      this.setUpProfile.controls['countryCode'].disable({ onlySelf: true });
      this.setUpProfile.controls['phone'].disable({ onlySelf: true });
    } else if (this.userDetails.email) {
      this.setUpProfile.get('email').setValue(this.userDetails.email);
      this.setUpProfile.controls['email'].disable({ onlySelf: true });
    }

  }

  onCategorySelect(e) {

    console.log(e.id);
    let temp
    const index = this.selectedCategoryItem.findIndex(o => o.id.toString() == e.id.toString());
    if (index < 0) {
      this.selectedCategoryItem.push(e.id);
    }
    for (let item in this.selectedCategoryItem) {
      this.selectedCategoryId.push(this.selectedCategoryItem[item].id)
    }

    this.setUpProfile.get('Specialities').setValue(this.selectedCategoryId)
  }
  onSelectAll(e) {

    let temp
    console.log(e)
    for (let i = 0; i < e.length; i++) {
      this.selectedCategoryId.push(e[i].id)
    }

    this.setUpProfile.get('Specialities').setValue(this.selectedCategoryId)
  }

  public AddressChange(address: any) {

    //setting address from API to local variable 
    console.log(address);
    this.lat = address.geometry.location.lat()
    this.lng = address.geometry.location.lng()
    this.formattedaddress = address.formatted_address
    this.setUpProfile.get('address').setValue(this.formattedaddress)
    let length = address.address_components.length
    this.country = address.address_components[length - 1].long_name;

  }


  onFileChange(e) {
    console.log(e);
    let temp = []

    if (e.target.files && e.target.files[0] && this.document.length < 6) {
      for (let i = 0; i < e.target.files.length; i++) {
        var reader = new FileReader();
        let name = e.target.files[i].name;
        this.document.push(e.target.files[i]);

        reader.readAsDataURL(e.target.files[i]);
        reader.onload = (event: any) => {
          let body = {
            name: name,
            document: event.target.result
          }
          this.urls.push(body);
          this.setUpProfile.controls['profilePhoto'].patchValue(this.imageFile);
          // need to run CD since file load runs outside of zone
          this.cd.markForCheck();
        };
      }
    } else {
      this.commonService.errorToast('Only Document can be uploaded')
    }

  }

  onProfileChange(e) {
    this.uploaded = true
    if (e.target.files && e.target.files[0]) {
      this.imageFile = e.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {

        this.profileImage = event.target.result;
        this.setUpProfile.controls['profilePhoto'].patchValue(this.imageFile);
      };

    }

  }

  deletePhoto(id) {
    console.log(id);

    let temp = [];
    let tempDoc = []
    console.log("beforeDelete", this.urls);
    console.log("beforeDelete", this.document);
    temp = this.urls.splice(id, 1);
    tempDoc = this.document.splice(id, 1);

    console.log("Deleted", temp);
    console.log("Deleted", tempDoc);



  }

  onProfileSetUp() {


    console.log("Form", this.setUpProfile.value);
    console.log("image", this.profileImage);
    console.log("document", this.document);
    if (this.setUpProfile.valid) {
      let temp

      let formData = new FormData;
      if (this.imageFile) {
        formData.append('profilePic', this.imageFile, this.imageFile.name);
      }
      if (this.document.length) {
        for (let item in this.document) {
          formData.append('documentOne', this.document[item], this.document[item].name);
        }
      }
      formData.append('firstName', this.setUpProfile.get('firstName').value);
      formData.append('lastName', this.setUpProfile.get('lastName').value)
      formData.append('email', this.setUpProfile.get('email').value)
      formData.append('phone', this.setUpProfile.get('phone').value);
      formData.append('bio', this.setUpProfile.get('bio').value);
      formData.append('country', this.country)
      formData.append('address', this.formattedaddress)
      formData.append('countryCode', this.setUpProfile.get('countryCode').value)
      formData.append('categories', JSON.stringify(this.selectedCategoryId))
      formData.append('celebrityType', this.setUpProfile.get('celebrityType').value)
      formData.append('gender', this.setUpProfile.get('gender').value)
      formData.append('lat', this.lat)
      formData.append('lng', this.lng)

      formData.forEach((value, key) => {
        console.log(key + " " + value)
      });
      this.progress = true
      this.apiService.setProfile(formData).subscribe(res => {
        console.log(res);
        if (res.success) {
          this.progress = false
          this.commonService.successToast(res.message);

          this.route.navigate(['/login']);
        } else {
          this.progress = false
          this.commonService.errorToast(res.message);
        }

      })


    }


  }

}
