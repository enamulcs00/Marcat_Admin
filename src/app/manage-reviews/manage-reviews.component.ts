import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api.service';
import { PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'app-manage-reviews',
  templateUrl: './manage-reviews.component.html',
  styleUrls: ['./manage-reviews.component.scss']
})
export class ManageReviewsComponent implements OnInit {

  page = 1;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;
  filterBy: string = '';
  search: string = '';

  status: number
  flagSearch: boolean = true;
  flagData: any = true;
  flag: any
  flagUserList: boolean;
  srNo: number;
  reviewList: any;
  progress: boolean;
  constructor(private apiService: ApiService, private commonService: CommonService) { }

  ngOnInit() {
    this.getReview()
  }

  getReview() {
    this.progress = false
    this.apiService.getReviewList(this.page, this.pageSize, this.search, this.filterBy).subscribe(res => {
      if (res.success) {
        this.progress = false
        console.log(res)
        this.reviewList = res.data;
        if (this.reviewList.length > 0) {
          this.flagData = false
        }
        this.length = res.total
        // alert("")
      } else {
        this.progress = false
        this.commonService.errorToast(res.message)
      }
    })


  }

  filterSelected(e) {
    if (this.filterBy) {
      this.flag = true
    }
    else {
      this.flag = false

    }
    console.log(e);
    this.filterBy = e;
    this.getReview()
  }


  searchMethod() {

    this.flagSearch = false
    this.getReview()

  }


  clearSearch() {

    this.flagSearch = true
    this.search = ''
    this.getReview()
  }

  statusChnaged(e) {
    console.log(e)
  }

  reviewListAfterPageSizeChanged(e): any {
    console.log(e);

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

    this.getReview()
  }

  deleteReview(i) {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Review!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085D6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      allowOutsideClick: true
    }).then(result => {
      if (result.value) {
        let id = i

        const data = {
          "id": id,
          "model": "Rating"
        }
        this.apiService.hardDelete(data).subscribe(res => {
          this.commonService.successToast("Review Deleted")
          this.getReview()
        });
      }
      else {
        console.log("cancelled");
      }
    })
  }


  back() {
    window.history.back()
  }

}
