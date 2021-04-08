import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { CommonService } from 'src/services/common.service';
import { UrlService } from 'src/services/url.service';
import { PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-promo-code-management',
  templateUrl: './promo-code-management.component.html',
  styleUrls: ['./promo-code-management.component.scss']
})
export class PromoCodeManagementComponent implements OnInit {

  filterBy: any = '';
  user: any;
  sellerId: any;
  search: any = '';
  flagUserList: boolean = false;
  srNo: number = 1;
  length = 100;
  pageSize = 10;
  page = 1
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;
  flagData: boolean = false;
  productList: any;
  isApproved: any = true;
  imageUrl: string;
  progress: boolean;
  promoCodeList: any;
  constructor(private router: Router, private apiService: ApiService, private commonService: CommonService, private urlService: UrlService) { }

  ngOnInit() {



    this.getPromoCode()
  }

  flag = false
  filterSelected(e) {
    debugger
    this.filterBy = e.value

    if (this.filterBy) {
      this.flag = true
    }
    else {
      this.flag = false

    }
    this.getPromoCode()

  }

  flagSearch: boolean = true
  searchMethod() {
    this.flagSearch = false
    console.log(this.search);

    this.getPromoCode()
  }

  clearSearch() {
    debugger
    this.flagSearch = true
    this.search = ''
    this.getPromoCode();

  }


  ListAfterPageSizeChanged(e): any {
    console.log(e);
    if (e.pageIndex == 0) {
      this.page = 1;
      // this.page = e.pageIndex;
      //  this.srNo = e.pageIndex * e.pageSize
      this.pageSize = e.pageSize
      this.flagUserList = false
    } else {
      if (e.previousPageIndex < e.pageIndex) {
        this.page = e.pageIndex + 1;
        this.pageSize = e.pageSize
        this.srNo = e.pageIndex * e.pageSize
        this.flagUserList = true
      } else {
        this.page = e.pageIndex;
        this.pageSize = e.pageSize
        this.srNo = e.pageIndex * e.pageSize
        this.flagUserList = true
      }

    }
    this.getPromoCode()



  }


  getPromoCode() {
    this.progress = true
    this.apiService.getAllPromoCode(this.page, this.pageSize, this.filterBy, this.search).subscribe(res => {
      console.log(res);
      if (res.success) {

        this.progress = false;
        this.promoCodeList = res.data;
        this.length = res.data.length
        if (this.promoCodeList.length === 0) {
          this.flagData = true
        } else {
          this.flagData = false
        }

      }

    })



  }

  changeUserStatus(id, status) {

    let temp = id
    var body
    for (let i = 0; i <= this.promoCodeList.length; i++) {
      if (this.promoCodeList[i]._id == temp) {
        if (status == 1) {
          body = {
            "model": "PromoCode",
            "id": temp,
            "status": 0
          }
        } else {
          body = {
            "model": "PromoCode",
            "id": temp,
            "status": 1
          }
        }
        console.log(body)
        this.progress = true
        this.apiService.changeUserStatus(body).subscribe((res) => {
          console.log(res)
          if (res.success) {
            this.progress = false
            this.commonService.successToast(res.message)
            this.getPromoCode();
          } else {
            this.progress = false
          }

        });
      }

    }
  }



  deletePromoCode(id) {

    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Promo Code!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085D6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",

      allowOutsideClick: true
    }).then(result => {
      if (result.value) {
        console.log(id)


        const data = {
          "id": id,
          "model": "PromoCode"
        }
        this.progress = true
        this.apiService.delete(data).subscribe(res => {
          console.log(res);
          if (res.success) {
            //  this.getAllCategories()
            this.progress = false
            this.commonService.successToast(res.message);
            this.getPromoCode()

          } else {
            this.progress = false
            this.commonService.errorToast(res.message)
          }

        });

      } else {
        console.log("cancellled")
      }

    });



  }


  gotoUpdatePromoCode(id) {

    console.log(id);
    this.router.navigate(['editPromoCode'], { queryParams: { 'id': id } });
  }

  goToAddPromoCode() {
    this.router.navigate(['addPromoCode'])
  }
}
