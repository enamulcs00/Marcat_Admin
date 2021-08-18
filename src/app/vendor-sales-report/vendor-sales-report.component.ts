import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { CommonService } from 'src/services/common.service';
import { PageEvent } from '@angular/material/paginator';
interface readOnly {
  viewValue: string,
  value: string
}
@Component({
  selector: 'app-vendor-sales-report',
  templateUrl: './vendor-sales-report.component.html',
  styleUrls: ['./vendor-sales-report.component.scss']
})
export class VendorSalesReportComponent implements OnInit {
  flagUserList: boolean = false;
  srNo: number;
  page: any = 1;
  search: string = '';
  filterBy: any = '';
  filterList: readOnly[] = [{ viewValue: 'New', value: 'New' },
  { viewValue: 'Accepted', value: 'Accepted' },
  { viewValue: 'Cancelled', value: 'Canceled' },
  { viewValue: 'Rejected', value: 'Rejected' },
  { viewValue: 'Packing', value: 'Packing' },
  { viewValue: 'Shipped', value: 'Shipped' },
  { viewValue: 'Delivered', value: 'Delivered' },
  { viewValue: 'Unwant', value: 'UnWant' },
  { viewValue: 'Picking', value: 'Picking' },
  { viewValue: 'Rescheduled', value: 'Rescheduled' },
  { viewValue: 'Picked For Shipping', value: 'pickedShipping' },
  { viewValue: 'Picked', value: 'Picked' },
  { viewValue: 'Picked and Delivered', value: 'PickedDelivered' }]
  // page = 1;
  length = 100;
  pageSize = 10;
  pageEvent: PageEvent;
  pageSizeOptions = [5, 10, 25, 100]
  flagData: boolean;
  vendorList: any;
  constructor(private router: Router, private apiService: ApiService, private commonService: CommonService) { }

  ngOnInit() {
    this.getVendorSaleReport(this.page, this.pageSize, this.search, this.filterBy)
  }


  getVendorSaleReport(page, pageSize, search, filterBy) {
    this.apiService.getVendorList(page, pageSize, search, filterBy).subscribe((res) => {
      if (res.success) {
        if (res.data.length > 0) {
          this.flagData = false
          this.vendorList = res.data;
          this.length = res.total
          console.log(this.vendorList);
        } else {
          this.flagData = true
        }
      }
    });
  }

  flag = false
  filterSelected(e) {

    if (this.filterBy) {
      this.flag = true
    }
    else {
      this.flag = false

    }
    console.log(e.target.value);
    this.filterBy = e.target.value;
    this.apiService.getVendorList(this.page, this.pageSize, this.filterBy, this.search).subscribe((res) => {
      if (res.success) {
        console.log(res);
        this.vendorList = res.data;
        this.length = res.total;
      }
    });
  }


  flagSearch: boolean = true
  searchMethod() {

    this.flagSearch = false
    console.log(this.search);
    this.apiService.getVendorList(this.page, this.pageSize, this.filterBy, this.search).subscribe((res) => {
      if (res.success) {
        this.vendorList = res.data;
        console.log(this.vendorList);
        this.length = res.total;
      }
    })

  }


  clearSearch() {

    this.flagSearch = true
    this.search = ''
    this.getVendorSaleReport(this.page, this.pageSize, this.search, this.filterBy)
  }

  statusChnaged(e) {
    console.log(e)
  }

  vendorSalesReportListAfterPageSizeChanged(e): any {
    //console.log(e);

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

    this.getVendorSaleReport(this.page, this.pageSize, this.search, this.filterBy)
  }

  goToproduct(i) {
    let id: any
    let name: string
    for (let j = 0; j <= this.vendorList.length; j++) {
      if (i == j) {
        id = this.vendorList[j]._id;
        name = this.vendorList[j].firstName;

      }
    }

    this.router.navigate(['product'], { queryParams: { "id": id, "name": name } })
  }

  goToreportGraph(id) {
    this.router.navigate(['reportGraph'], { queryParams: { id: id } })
  }


  back() {
    window.history.back()
  }
}
