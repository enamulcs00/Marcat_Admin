import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { CommonService } from 'src/services/common.service';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-endorsement',
  templateUrl: './endorsement.component.html',
  styleUrls: ['./endorsement.component.scss']
})
export class EndorsementComponent implements OnInit {


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
  flagApproved: boolean;
  noData: boolean = false;
  constructor(private router: Router, private apiService: ApiService, private commonService: CommonService) {
    this.user = JSON.parse(sessionStorage.getItem('Markat_User'));
    console.log(this.user);


  }

  ngOnInit() {
    if (this.user.roles == 'celebrity') {
      this.showVendorList();
    } else {
      this.getEndorsement()
    }
  }

  flag = false
  filterSelected(e) {



    if (this.filterBy) {
      this.flag = true
    }
    else {
      this.flag = false

    }
    if (this.user.roles == 'celebrity') {
      this.showVendorList();
    } else {
      this.getEndorsement()
    }
  }

  isApprovedSelected(e) {


    if (this.isApproved) {
      this.flagApproved = true
    }
    else {
      this.flagApproved = false

    }
    this.isApproved = e.value

    this.getEndorsement()

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
    this.apiService.getVendorListForEndorsement(body).subscribe((res) => {
      if (res.success) {
        this.progress = false
        if (res.data.length > 0) {
          console.log(res);
          this.noData = false
          this.vendorList = res.data;
          this.length = res.total;
        } else {
          this.noData = true
        }
      } else {
        this.progress = false
        this.commonService.errorToast(res.message)
      }

    });
  }

  getEndorsement() {
    let body = {
      isApproved: this.isApproved,        //isApproved-  1= accepted, 2= pending, 3=rejected
      filter: this.filterBy,
      search: this.search,
      page: this.page,
      count: this.pageSize
    }
    this.progress = true
    this.apiService.getEndorsement(body).subscribe(res => {
      console.log(res);
      if (res.success) {
        this.progress = false
        if (res.data.length > 0) {
          this.noData = false
          this.endorsementProductList = res.data;
          this.length = res.total;
        } else {
          this.noData = true

        }
      } else {
        this.progress = false
        this.commonService.errorToast(res.message)
      }

    })


  }

  goToEndorsedProduct() {

    this.router.navigate(['endorsedProduct'])

  }


  acceptRequest(id, status) {

    let body = {
      id: id,
      status: status
    }
    this.progress = true
    this.apiService.approveEndorsementRequest(body).subscribe(res => {
      console.log(res);
      if (res.success) {
        this.progress = false
        this.commonService.successToast(res.message)
        this.getEndorsement();
      } else {
        this.progress = false
        this.commonService.errorToast(res.message)

      }

    })

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
    if (this.user.roles == 'celebrity') {
      this.showVendorList();
    } else {
      this.getEndorsement()
    }

  }


  flagSearch: boolean = true
  searchMethod() {
    this.flagSearch = false
    console.log(this.search);
    if (this.user.roles == 'celebrity') {
      this.showVendorList();
    } else {
      this.getEndorsement()
    }
  }

  clearSearch() {
    this.flagSearch = true
    this.search = ''
    if (this.user.roles == 'celebrity') {
      this.showVendorList();
    } else {
      this.getEndorsement()
    }

  }


  goToproduct(i) {
    this.router.navigate(['endorsmentProduct'], { queryParams: { "id": i } })
  }





  back() {
    window.history.back()
  }

}
