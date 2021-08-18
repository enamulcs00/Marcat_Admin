import { Component, OnInit } from '@angular/core';
import * as js from '../../assets/js/custom';
import { Router } from '@angular/router';
import { throwMatDuplicatedDrawerError } from '@angular/material';
import { ApiService } from 'src/services/api.service';
declare var $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  user: any;
  roles: string;
  celebrityType: any;

  constructor(private router: Router, private apiService: ApiService) {

    this.user = JSON.parse(this.apiService.getUser())
    console.log('cool', this.user);

  }

  ngOnInit() {
    this.roles = this.user.roles
    if (this.roles == 'celebrity') {
      this.celebrityType = this.user.celebrityType
    }
    // if (this.roles == 'admin') {
    //   alert('Admin')

    // } else if (this.roles == 'merchant') {
    //   alert('vendor')
    // } else if (this.roles == 'celebrity') {
    //   alert('celebrity')
    // }
    $('.nav_item').click(function () {
      $('.side_pages').css('width', '200')
    });
    $('.nav_item').mouseover(function () {
      $('.side_pages').css('width', '200')
    });
    $('.nav_item').mouseout(function () {
      $('.side_pages').css('width', '0')
    });

    $('.core').hide();
    $('.core.active').show();


    $('.nav_item').click(function () {
      $('.core').hide();
      $('.core.active').hide();
      var relstore = $(this).attr('rel');
      $("#" + relstore).show();
    });
    $('.nav_item').mouseover(function () {
      $('.core').hide();
      $('.core.active').hide();
      var relstore = $(this).attr('rel');
      $("#" + relstore).show();
    });
    $('.side_pages').hover(function () {
      $(this).css('width', '200')
    })
    $('.side_pages').mouseleave(function () {
      $(this).css('width', '0')
    })



    js.sideBar()
  }
  goTomanageUser() {
    this.router.navigate(['manageUser']);
  }
  goToproduct() {
    this.router.navigate(['product']);
  }
  goToordermanagement() {
    this.router.navigate(['ordermanagement']);
  }
  goTopayment() {
    this.router.navigate(['payment']);
  }


  goToPromoCode() {
    this.router.navigate(['promoCodeList'])
  }
  goTologin() {
    this.router.navigate(['login']);
  }
  goToresetPassword() {
    this.router.navigate(['resetPassword']);
  }
  goTodashboard() {
    this.router.navigate(['dashboard']);
  }
  goToEndorsement() {
    if (this.roles == 'celebrity') {
      this.router.navigate(['endorsedProduct']);
    } else {
      this.router.navigate(['endorsement']);
    }

  }

  goToCelebritymanagement() {
    this.router.navigate(['manageCelebrity'])
  }

  goToProduct() {
    this.router.navigate(['product'])
  }

  goToBrand() {
    this.router.navigate(['brandList'])
  }
  goToreportpage() {
    this.router.navigate(['reportpage']);
  }
  goToinventry() {
    this.router.navigate(['inventryManagement'])
  }
  goTomanageReviews() {
    this.router.navigate(['manageReviews'])
  }
  goTovendermanagement() {
    this.router.navigate(['venderManagement'])
  }
  goTocategory() {
    this.router.navigate(['category'])
  }
  goToabout() {
    this.router.navigate(['about'])
  }
  goTofaq() {
    this.router.navigate(['faq'])
  }
  goTosubcategory() {
    this.router.navigate(['subcategory'])
  }
  goToofferdeals() {
    this.router.navigate(['offerdeals'])
  }

  goTosalesreport() {
    this.router.navigate(['salesreport'])
  }

  goTorevenuereport() {
    this.router.navigate(['revenuereport'])
  }
  goTonotification() {
    this.router.navigate(['notification'])
  }
  goTotermcondition() {
    this.router.navigate(['termcondition'])
  }
  goTocontactus() {
    this.router.navigate(['contactus'])
  }
  goToprivacypolicy(){
    this.router.navigate(['privacypolicy'])
   } 
  goToreturnpolicy() {
    this.router.navigate(['returnpolicy'])
  }
  goToventorT() {
    this.router.navigate(['ventorT'])
  }
  goTovendorSalesReport() {
    this.router.navigate(['vendorSalesReport'])
  }
  goTotermofuse() {
    this.router.navigate(['termofuse'])
  }
  goTotermofsales() {
    this.router.navigate(['termofsales'])
  }
  goToconsumerprivacypolicy() {
    this.router.navigate(['consumerprivacypolicy'])
  }
  goTowarrantypolicy() {
    this.router.navigate(['warrantypolicy'])
  }

  goToBroadCast() {

    this.router.navigate(['push-notification'])
  }
  goToSettings() {
    this.router.navigate(['Settings'])
  }
  goToAboutapp() {
    this.router.navigate(['about'])
  }
  // goToprivacypolicy() {
  //   this.router.navigate(['privacypolicy'])
  // }
}

