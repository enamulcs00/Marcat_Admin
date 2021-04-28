import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { element } from 'protractor';
import Swal from 'sweetalert2';
import { CommonService } from 'src/services/common.service';
import { Observable } from 'rxjs';
import { map, startWith, debounceTime } from 'rxjs/internal/operators';

interface countrylist {
  code: string;
  name: string;
  name_ar: string;
  status: number
  _id: string;
  isDeleted: boolean
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  tax: any;
  zoneName: any
  zoneFormGroup: FormGroup
  zoneEditFormGroup: FormGroup;
  updateSetting: FormGroup
  // applyTax: any = false;
  countryList: countrylist[] = []
  selectedCountry: any;
  browser: any
  shippingChargesList: any;
  openEditform: boolean;
  result: any
  id: any;
  taxId: any;
  countryId: any;
  submitted: boolean;
  selectedStates = []
  filteredOptions: Observable<any[]>;
  showCountryList: any;
  countryName: any;
  countryShortCodeEdit: any;
  user: any;
  roles: any;
  constructor(private apiService: ApiService, private fb: FormBuilder, private commonService: CommonService) {
    this.user = JSON.parse(this.apiService.getUser())
    this.roles=this.user.roles
   }

  ngOnInit() {
    this.getTax();

   // this.getShippingRateList();
    // this.zoneFormGroup = this.fb.group({
    //   rangePrice: ['', Validators.required],
    //   selectedCountry: ['', Validators.required],
    //   belowMinValue: ['', Validators.required],
    //   minValue: ['', Validators.required],
    //   maxValue: ['', Validators.required],
    //   aboveMaxValue: ['', Validators.required]
    // });

    // this.zoneEditFormGroup = this.fb.group({
    //   rangePrice: ['', Validators.required],
    //   selectedCountry: ['', Validators.required],
    //   belowMinValue: ['', Validators.required],
    //   minValue: ['', Validators.required],
    //   maxValue: ['', Validators.required],
    //   aboveMaxValue: ['', Validators.required]
    // });

    this.updateSetting = this.fb.group({
      facebook: ['', Validators.required],
      twitter: ['', Validators.required],
      instagram: ['', Validators.required],
      linkedIn: ['', Validators.required],
      appStoreLink: ['', Validators.required],
      googlePlayLink: ['', Validators.required],
      tax: ['', Validators.required],
      applyTax: ['',]
    })
    // this.openPopUp()
  }
  getTax() {

    this.apiService.getTax().subscribe(res => {
      console.log(res)
      if (res.success) {
        let data = res.data[0];
        this.taxId = data._id
        this.updateSetting.controls['tax'].setValue(data.tax);
        this.updateSetting.controls['applyTax'].setValue(data.taxApplicable);
        this.updateSetting.controls['facebook'].setValue(data.facebook);
        this.updateSetting.controls['twitter'].setValue(data.twitter);
        this.updateSetting.controls['instagram'].setValue(data.instagram);
        this.updateSetting.controls['linkedIn'].setValue(data.linkedin);
        this.updateSetting.controls['appStoreLink'].setValue(data.appStore);
        this.updateSetting.controls['googlePlayLink'].setValue(data.playStore);

      }
    })
  }

  updateTax() {

    console.log(this.tax, this.updateSetting.controls['applyTax'].value)
    let body = {
      id: this.taxId,
      tax: this.updateSetting.controls['tax'].value,
      facebook: this.updateSetting.controls['facebook'].value,
      instagram: this.updateSetting.controls['instagram'].value,
      linkedin: this.updateSetting.controls['linkedIn'].value,
      playStore: this.updateSetting.controls['googlePlayLink'].value,
      twitter: this.updateSetting.controls['twitter'].value,
      taxApplicable: this.updateSetting.controls['applyTax'].value,
      appStore: this.updateSetting.controls['appStoreLink'].value

      //taxApplicable: this.applyTax
    }
    this.apiService.updateTax(body).subscribe(res => {
      console.log(res);
      if (res.success) {
        this.commonService.successToast(res.message)
        this.getTax()
      }
    })
  }

  // onKey(e) {
  //   console.log(e);
  //   let search = e
  //   this.apiService.getCountryList(search).subscribe((res: any) => {
  //     this.showCountryList = res.data;
  //   })

  // }

  // private _filter(value) {
  //   const filterValue = value.toLowerCase();
  //   const data =
  //   {
  //     'search': filterValue
  //   }
  //   this.apiService.getCountryList(data).subscribe((res: any) => {
  //     this.countryList = res.data;
  //     return this.countryList.filter(option => option.name.toLowerCase().includes(filterValue));
  //   })

  // }

  // saveZone() {

  //   console.log(this.zoneFormGroup.value);
  //   if (this.zoneFormGroup.valid) {
  //     let selectedCountry = this.zoneFormGroup.controls['selectedCountry'].value;
  //     let selectedCountryObject = this.showCountryList.find(element => element.name === selectedCountry)
  //     let body = {
  //       'country': selectedCountry,
  //       'countryShortCode': selectedCountryObject.code,
  //       'countryId': selectedCountryObject._id,
  //       'minPrice': this.zoneFormGroup.controls['minValue'].value,
  //       'maxPrice': this.zoneFormGroup.controls['maxValue'].value,
  //       'rangePrice': this.zoneFormGroup.controls['rangePrice'].value,
  //       'belowPrice': this.zoneFormGroup.controls['belowMinValue'].value,
  //       'abovePrice': this.zoneFormGroup.controls['aboveMaxValue'].value,
  //     }

  //     console.log("body", body);

  //     this.apiService.addShippingRate(body).subscribe(res => {
  //       console.log(res);
  //       if (res.success) {
  //         this.commonService.successToast(res.message);
  //         this.getShippingRateList()
  //       }

  //     })
  //   }

  // }
  // updateShippingRate() {

  //   console.log(this.zoneEditFormGroup.value);
  //   if (this.zoneEditFormGroup.valid) {
  //     // let selectedCountry = this.zoneEditFormGroup.controls['selectedCountry'].value;
  //     let selectedCountryObject
  //     for (let i = 0; i < this.countryList.length; i++) {
  //       if (this.countryList[i]._id === this.countryId) {
  //         selectedCountryObject = this.countryList[i]
  //       }
  //     }
  //     let body = {
  //       'country': this.countryName,
  //       'countryCode': this.countryShortCodeEdit,
  //       'id': this.id,
  //       'minPrice': this.zoneEditFormGroup.controls['minValue'].value,
  //       'maxPrice': this.zoneEditFormGroup.controls['maxValue'].value,
  //       'rangePrice': this.zoneEditFormGroup.controls['rangePrice'].value,
  //       'belowPrice': this.zoneEditFormGroup.controls['belowMinValue'].value,
  //       'abovePrice': this.zoneEditFormGroup.controls['aboveMaxValue'].value,
  //     }
  //     this.apiService.updateShippingRate(body).subscribe(res => {
  //       console.log(res);
  //       if (res.success) {
  //         this.commonService.successToast(res.message);
  //         this.getShippingRateList()
  //       }
  //     })
  //   }
  // }


  // getShippingRateList() {

  //   this.apiService.getShippingRateList().subscribe(res => {
  //     console.log(res);
  //     if (res.success) {

  //       this.shippingChargesList = res.data
  //     } else {
  //       this.commonService.errorToast(res.message)

  //     }

  //   })
  // }


  // openPopUp() {
  //   const data =
  //   {
  //     'search': ''
  //   }
  //   this.apiService.getCountryList(data).subscribe(res => {
  //     console.log("countryList", res);
  //     for (let i = 0; i < res.data.length; i++) {
  //       let body: countrylist = res.data[i];
  //       this.countryList.push(body)
  //     }
  //     console.log("this", this.countryList);
  //   }
  //   )
  // }


  // editShippingCharge(id) {

  //   this.id = id
  //   console.log(id);
  //   this.apiService.getSingleShippingCharge(id).subscribe(res => {
  //     console.log(res);
  //     let data = res.data;
  //     this.countryId = data.countryId
  //     this.countryName = data.country;
  //     this.countryShortCodeEdit = data.countryShortCode;
  //     this.zoneEditFormGroup.controls['rangePrice'].setValue(data.rangePrice);
  //     this.zoneEditFormGroup.controls['selectedCountry'].setValue(data.country)
  //     this.zoneEditFormGroup.controls['belowMinValue'].setValue(data.belowPrice);
  //     this.zoneEditFormGroup.controls['minValue'].setValue(data.minPrice);
  //     this.zoneEditFormGroup.controls['maxValue'].setValue(data.maxPrice)
  //     this.zoneEditFormGroup.controls['aboveMaxValue'].setValue(data.abovePrice)
  //   })

  // }

  // deleteShippingCharge(id) {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "Once deleted, you will not be able to recover  this Shipping rate!!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085D6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes",

  //     allowOutsideClick: true
  //   }).then(result => {
  //     if (result.value) {
  //       this.result = result;
  //       console.log(id)
  //       const data = {
  //         "id": id,
  //         "model": "ShippingCharges"
  //       }

  //       this.apiService.delete(data).subscribe(res => {
  //         console.log(res);
  //         if (res.success) {
  //           //  this.getAllCategories()
  //           this.commonService.successToast(res.message);
  //           this.getShippingRateList()

  //         } else {
  //           this.commonService.errorToast(res.message)
  //         }

  //       });


  //     } else {
  //       console.log("cancelled");
  //     }
  //   });
  // }


  back() {
    window.history.back()
  }

}
