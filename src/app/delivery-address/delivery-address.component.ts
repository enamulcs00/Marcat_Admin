import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'app-delivery-address',
  templateUrl: './delivery-address.component.html',
  styleUrls: ['./delivery-address.component.scss']
})
export class DeliveryAddressComponent implements OnInit {
  sub: any;
  id: any
  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private commonService: CommonService) { }
  addressList: any
  address1: any;
  city: any;
  country: any;
  postalCode: any;
  state: any;
  address2: any;
  flag: boolean = false;
  editId: any;
  phone: any;
  flagData: boolean = false;
  ngOnInit() {
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.id = params['id'];
      });
    this.getUserAddresses();
  }

  getUserAddresses() {

    this.apiService.getUserAddress(this.id).subscribe((res) => {
      if (res.data.length > 0) {
        this.flagData = true
        this.addressList = res.data
      } else {
        this.flagData = false
      }


    });

  }


  back() {
    window.history.back();
  }

  editAddress(id) {
    this.editId = id
    this.flag = !this.flag
    for (let i = 0; i < this.addressList.length; i++) {
      if (this.addressList[i]._id == id) {
        this.address1 = this.addressList[i].apartment;
        this.city = this.addressList[i].city;

        this.postalCode = this.addressList[i].postalCode;
        this.state = this.addressList[i].state;
        this.address2 = this.addressList[i].buildingName;
        this.phone = this.addressList[i].phone

      }
    }
  }


  UpdateAddress() {

    const body = {
      'id': this.editId,
      'apartment': this.address1,
      'buildingName': this.address2,
      'city': this.city,
      'state': this.state,
      'postalCode': this.postalCode,
      'phone': this.phone
    }

    this.apiService.updateAddress(body).subscribe((res) => {
      console.log(res);
      if (res.success) {
        this.commonService.successToast(res.message);

        this.flag = false
        this.getUserAddresses()
      } else {
        this.commonService.errorToast(res.message)
      }

    });


  }



  goTomanageUser() {
    this.router.navigate(['manageUser']);
  }



}



