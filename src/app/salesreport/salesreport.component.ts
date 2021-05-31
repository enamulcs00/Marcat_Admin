import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { ApiService } from 'src/services/api.service';
import { CommonService } from 'src/services/common.service';
import { UrlService } from 'src/services/url.service';

interface readOnly {
  viewValue: string,
  value: string
}
@Component({
  selector: 'app-salesreport',
  templateUrl: './salesreport.component.html',
  styleUrls: ['./salesreport.component.scss']
})
export class SalesreportComponent implements OnInit {

  page = 1;
  length = 100;
  pageSize = 10;
  progress: boolean;
  filterList: readOnly[] = [{ viewValue: 'New', value: 'New' },
  { viewValue: 'Accepted', value: 'Accepted' },
  { viewValue: 'Cancelled', value: 'Canceled' },
  { viewValue: 'Rejected', value: 'Rejected' },
  { viewValue: 'Packing', value: 'Packing' },
  { viewValue: 'Shipped', value: 'Shipped' },
  { viewValue: 'Delivered', value: 'Delivered' },
    // { viewValue: 'Unwant', value: 'UnWant' },
    // { viewValue: 'Picking', value: 'Picking' },
    // { viewValue: 'Rescheduled', value: 'Rescheduled' },
    // { viewValue: 'Picked For Shipping', value: 'pickedShipping' },
    // { viewValue: 'Picked', value: 'Picked' },
    // { viewValue: 'Picked and Delivered', value: 'PickedDelivered' }
  ]
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;
  filterBy: string = 'Delivered';
  search: string = '';
  salesList = []
  status: number
  flagSearch: boolean = true;
  flagData: any = true;
  flag: any
  flagUserList: boolean;
  srNo: number;
  user: any;
  roles: any;
  baseUrl: string;
  view: any
  sellerId: any;
  vendorId: any='';
  sub: any;
  constructor(private router: Router, private apiService: ApiService, private commonService: CommonService, private activatedRoute:ActivatedRoute,private urlService: UrlService) {

    this.user = JSON.parse(this.apiService.getUser())
    this.baseUrl = urlService.SERVER_URL
    if (this.user.roles == 'admin' || this.user.roles == 'subAdmin') {
      this.sellerId = null
      this.sub=this.activatedRoute.queryParams.subscribe(res=>{
        this.vendorId=res.vendor
        console.log('vednor id from admin is:',this.vendorId);
        
      })




    } else {
      this.sellerId = this.user._id
    }
  }

  ngOnInit() {
    this.roles = this.user.roles;

    this.getSaleslist(this.page, this.pageSize, this.search, this.filterBy)
  }

  getSaleslist(page, pageSize, search, filterBy) {
    this.progress = true
    this.apiService.getSaleList(page, pageSize, search, filterBy, this.vendorId).subscribe(res => {
      console.log(res)

      if (res.success) {
        this.progress = false
        if (res.data) {
          if (res.data.length > 0) {
            this.flagData = false
          }
          this.salesList = res.data;
          this.length = res.total
        } else {
          this.flagData = true
        }
      } else {
        this.progress = false;
        this.commonService.errorToast(res.message)
      }
    })

  }

  filterSelected(e) {

    console.log(e);
    if (this.filterBy) {
      this.flag = true
    }
    else {
      this.flag = false
    }
    console.log(e);

    this.filterBy = e

    this.getSaleslist(this.page, this.pageSize, this.search, this.filterBy)

  }

  searchMethod() {
    this.flagSearch = false
    // console.log(this.search);
    this.getSaleslist(this.page, this.pageSize, this.search, this.filterBy)
  }
  clearSearch() {
    this.flagSearch = true
    this.search = ''
    this.getSaleslist(this.page, this.pageSize, this.search, this.filterBy)
  }
  statusChanged(value, id) {

    console.log("value", value, "ID", id);
    let body = {

      status: value
    }
    this.apiService.updateStatus(body, id).subscribe(res => {
      console.log(res);
      if (res.success) {
        this.commonService.successToast('Updated Succesfully')
        this.getSaleslist(this.page, this.pageSize, this.search, this.filterBy)
      } else {
        this.commonService.errorToast('Error: Please Try again  after some time')
        this.getSaleslist(this.page, this.pageSize, this.search, this.filterBy)
      }
    })

  }

  productListAfterPageSizeChanged(e): any {

    console.log(e)
    if (e.pageIndex == 0) {
      this.page = 1;
      // this.page = e.pageIndex;
      //  this.srNo = e.pageIndex * e.pageSize
      this.flagUserList = false
    } else {
      if (e.previousPageIndex < e.pageIndex) {
        this.page = e.pageIndex + 1;
        this.srNo = e.pageIndex * e.pageSize
        this.flagUserList = true
      } else {
        this.page = e.pageIndex;
        this.srNo = e.pageIndex * e.pageSize
        this.flagUserList = true
      }

    }
    this.getSaleslist(this.page, e.pageSize, this.search, this.filterBy)
  }






  goToaddordermanagement() {
    this.router.navigate(['/addordermanagement'])
  };
  goToeditOrder() {
    this.router.navigate(['/editOrder'])
  };
  goToviewOrder(id) {
    this.router.navigate(['/viewOrder'], { queryParams: { "id": id } })
  };


  back() {
    window.history.back()
  }

  downloadCsv() {

    let url = [this.baseUrl + '/api/admin/exportSaleCsv',]
    if (this.user.roles != 'admin') {

      window.open(this.baseUrl + '/api/admin/exportSaleCsv?src=' + this.sellerId, '_blank')
    } else {
      window.open(this.baseUrl + '/api/admin/exportSaleCsv', '_blank')
    }



  }

}
