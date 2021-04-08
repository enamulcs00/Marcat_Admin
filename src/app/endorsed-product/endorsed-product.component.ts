import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { CommonService } from 'src/services/common.service';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-endorsed-product',
  templateUrl: './endorsed-product.component.html',
  styleUrls: ['./endorsed-product.component.scss']
})
export class EndorsedProductComponent implements OnInit {
  length = 100;
  pageSize = 10;
  page = 1
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;
  filterBy = '';
  search = '';
  vendorList: any;
  status: any
  selectOption: string
  flagUserList: boolean = false;
  srNo: number = 1;
  roles;
  categoryList: any[];
  selectedCategory: any;
  body: { model: string; id: any; status: number; };
  user: any;
  isApproved: any;
  endorsementProductList: any;
  progress: boolean;
  constructor(private router: Router, private apiService: ApiService, private commonService: CommonService) {
    this.user = JSON.parse(sessionStorage.getItem('Markat_User'));
    console.log(this.user);


  }

  ngOnInit() {

    this.getEndorsement()

  }

  flag = false
  filterSelected(e) {



    if (this.filterBy) {
      this.flag = true
    }
    else {
      this.flag = false

    }

  }


  showVendorList() {
    console.log("inside get vendor")
    let body = {
      roles: 'merchant',
      filter: this.filterBy,
      search: this.search,
      page: this.page,
      count: this.pageSize
    }
    this.progress = true

    this.apiService.getList(body).subscribe((res) => {
      if (res.success) {
        this.progress = false
        console.log(res);
        this.vendorList = res.data;
        this.length = res.total;
      } else {
        this.progress = false
        this.commonService.errorToast(res.message)
      }
    });
  }

  getEndorsement() {
    let body = {
      isApproved: this.isApproved,
      filter: this.filterBy,
      search: this.search,
      page: this.page,
      count: this.pageSize
    }
    this.progress = true
    this.apiService.getEndorsedProduct(body).subscribe(res => {
      console.log(res);
      if (res.success) {
        this.progress = false
        this.endorsementProductList = res.data;
        this.length = res.total;
      } else {
        this.progress = false
        this.commonService.errorToast(res.message)
      }

    })


  }

  goToEndorsedProduct() {

    this.router.navigate(['endorsedProduct'])

  }


  acceptRequest(id) {

  }





  onChangeStatus(id, status) {

    let body
    if (status == 0) {
      body = {
        id: id,
        status: 1,
        model: 'Endorse'
      }
    } else {
      body = {
        id: id,
        status: 0,
        model: 'Endorse'
      }
    }
    this.progress = true
    this.apiService.changeUserStatus(body).subscribe(res => {
      console.log(res);
      if (res.success) {
        this.progress = false
        this.commonService.successToast(res.message)
        this.showVendorList();

      } else {
        this.progress = false
        this.commonService.errorToast(res.message)

      }
    })

  }

  vendorListAfterPageSizeChanged(e): any {
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

    this.getEndorsement()


  }


  flagSearch: boolean = true
  searchMethod() {
    this.flagSearch = false
    console.log(this.search);

    this.getEndorsement()

  }

  clearSearch() {
    this.flagSearch = true
    this.search = ''

    this.getEndorsement()


  }







  back() {
    window.history.back()
  }

}
