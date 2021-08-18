import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { ApiService } from 'src/services/api.service';
import * as moment from 'moment';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;
  filterBy: string = '';
  search: string = '';
  flagUserList: boolean = false;
  srNo: number;
  page = 1;
  length = 100;
  pageSize = 10;
  flagData: boolean;
  paymentData: any;
  constructor(private router: Router, private apiService: ApiService, private commonService: CommonService) { }

  ngOnInit() {

    this.getPaymentData(this.page, this.pageSize, this.search, this.filterBy)
  }

  getPaymentData(page, pageSize, search, filterBy) {

    this.apiService.getPaymentDaTA(page, pageSize, search, filterBy).subscribe(res => {
      console.log(res)
      if (res) {
        if (res.data.length > 0) {
          this.flagData = false
          this.paymentData = res.data
          this.length = res.total
          // this.pageSize = res.total
        } else {
          this.flagData = true
        }
      };
    })

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
    this.getPaymentData(this.page, this.pageSize, this.search, this.filterBy)
  }

  flagSearch: boolean = true
  searchMethod() {
    this.page = 1
    this.flagSearch = false
    this.getPaymentData(this.page, this.pageSize, this.search, this.filterBy)

  }


  clearSearch() {

    this.flagSearch = true
    this.search = ''
    this.getPaymentData(this.page, this.pageSize, this.search, this.filterBy)
  }

  statusChnaged(e) {
    console.log(e)
  }

  salesListAfterPageSizeChanged(e): any {
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

    this.getPaymentData(this.page, this.pageSize, this.search, this.filterBy)
  }


  setPaid(id, phone, email) {
    let body = {
      id: id,
      lastPaidDate: moment.now(),
      phone: phone,
      email: email
    }
    console.log(body);
    this.apiService.editUser(body).subscribe((res) => {

      console.log(res);
      if (res.success) {
        this.commonService.successToast(res.message)
      } else {
        this.commonService.errorToast(res.message)
      }

    });
  }

  back() {
    window.history.back()
  }

}
