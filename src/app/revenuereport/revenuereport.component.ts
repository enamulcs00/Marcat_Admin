import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { CommonService } from 'src/services/common.service';
import { ApiService } from 'src/services/api.service';
@Component({
  selector: 'app-revenuereport',
  templateUrl: './revenuereport.component.html',
  styleUrls: ['./revenuereport.component.scss']
})
export class RevenuereportComponent implements OnInit {
  length = 100;
  pageSize = 10;
  progress: boolean
  page = 1
  topSeller = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;
  filterBy = '';
  search = '';
  vendorList: any;
  status: any
  selectOption: string
  flagUserList: boolean = false;
  srNo: number = 1;
  flagData: boolean;
  revenueReport: any;
  user: any;
  roles: any;
  revenueReportVendor: any;

  constructor(private router: Router, private apiService: ApiService, private commonService: CommonService) {
    this.user = JSON.parse(this.apiService.getUser())
  }

  ngOnInit() {
    debugger
    this.roles = this.user.roles
    console.log(this.roles)
    this.getRevenueReport()

  }

  getRevenueReport() {


    if (this.roles == 'admin' || this.roles == 'subAdmin') {
      this.progress = true
      this.apiService.getRevenueReport(this.page, this.pageSize, this.search, this.topSeller).subscribe((res) => {
        if (res) {
          this.progress = false
          if (res.success) {
            if (res.data.length > 0) {
              this.flagData = false
              this.revenueReport = res.data
              this.length = res.total
              console.log(this.revenueReport)
            } else {
              this.flagData = true
            }
          } else {
            this.commonService.errorToast(res.message)
          }

        };
      });
    } else {
      this.progress = true
      this.apiService.getRevenueReportVendor(this.page, this.pageSize, this.search, this.filterBy).subscribe((res) => {
        if (res) {
          this.progress = false
          if (res.success) {
            if (res.data.length > 0) {
              this.flagData = false
              this.revenueReportVendor = res.data
              this.length = res.total
              console.log(this.revenueReportVendor)
            } else {
              this.flagData = true
            }
          } else {
            this.commonService.errorToast(res.message)
          }

        };
      });
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

    this.filterBy = e.value

    this.getRevenueReport()

  }

  flagSearch: boolean = true
  searchMethod() {
    this.page = 1
    this.flagSearch = false
    this.getRevenueReport()

  }


  clearSearch() {

    this.flagSearch = true
    this.search = ''
    this.getRevenueReport()
  }

  statusChnaged(e) {
    console.log(e)
  }

  revenueReportListAfterPageSizeChanged(e): any {
    //console.log(e);

    if (e.pageIndex == 0) {
      this.page = 1;
      this.pageSize = e.pageSize
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

    this.getRevenueReport()
  }


  goToanalytics() {
    this.router.navigate(['analytics'])
  }
  goToreveuegraph() {
    this.router.navigate(['reveuegraph'])
  }


  back() {
    window.history.back()
  }
}
