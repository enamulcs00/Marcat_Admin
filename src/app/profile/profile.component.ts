import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { UrlService } from 'src/services/url.service';
import { CommonService } from 'src/services/common.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  layoutstyle = [{ viewValue: 'Grid', value: 1 }, { viewValue: 'List', value: 2 }, { viewValue: 'Card', value: 3 }];
  layout: string
  imageUrl: any
  user: any;
  roles: any;
  deliveryType: any
  constructor(private router: Router, private apiService: ApiService, private urlService: UrlService, private commonService: CommonService) {
    this.user = JSON.parse(this.apiService.getUser())
  }
  profileData: any;

  ngOnInit() {
    this.roles = this.user.roles

    this.imageUrl = this.urlService.imageUrl
    this.apiService.getProfile().subscribe((res) => {
      console.log("Profile Data", res.data)
      this.profileData = res.data
      this.layout = this.profileData.layout

    });

  }

  filterSelected(e) {
    console.log(e);
    let body = {
      'deliveryType': this.deliveryType
    }

    this.apiService.editUser(body)

  }


  radioChange(e) {
    console.log(e);
    this.layout = e.value;
    let body = {
      layoutType: this.layout
    }
    this.apiService.updateProfile(body).subscribe(res => {
      console.log(res);
      if (res.success) {
        this.commonService.successToast(res.message);
      } else {
        this.commonService.errorToast(res.message);
      }

    })

  }
  goToeditprofile(id) {
    console.log(id)
    this.router.navigate(['editprofile'], { queryParams: { 'id': id } })

  }
}
