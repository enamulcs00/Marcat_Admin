import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'app-sub-admin-list',
  templateUrl: './sub-admin-list.component.html',
  styleUrls: ['./sub-admin-list.component.scss']
})
export class SubAdminListComponent implements OnInit {
  search: string = '';
  filterBy: string = '';
  debounce: number;
  imageUrl: any;
  subAdminList: any;
  idToDelete: any;

  progress: boolean = false;

  flag: boolean;
  length = 100;
  count = 10;
  page = 1
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;
  flagData: boolean;

  constructor(private apiService: ApiService, private router: Router, private commonService: CommonService) {

    this.imageUrl = this.commonService.imageUrl
  }

  ngOnInit(): void {

    this.getSubAdminList();

  }

  goToEdit(id) {
    this.router.navigate(['sub-admin-add'], { queryParams: { check: 'edit', id: id } })
  }

  goToviewSubadmin(id) {
    this.router.navigate(['sub-admin-add'], { queryParams: { check: 'view', id: id } })
  }



  flagSearch: boolean = true
  searchMethod() {
    this.flagSearch = false
    console.log(this.search);
    this.getSubAdminList()
  }

  clearSearch() {
    this.flagSearch = true
    this.search = ''
    this.getSubAdminList()

  }



  getSubAdminList() {

    this.apiService.getSubAdminList(this.page, this.count, this.search, this.filterBy).subscribe(res => {
      console.log(res);
      if (res.success) {
        this.flagData = false
        this.subAdminList = res.data
        this.length = res.total
      } else {
        this.flagData = true
      }



    })
  }



  changeUserStatus(id, status) {
    let temp = id
    let body = {}
    for (let i = 0; i <= this.subAdminList.length; i++) {
      if (this.subAdminList[i]._id == temp) {
        if (status == 1) {
          body = {
            "model": "User",
            "id": temp,
            "status": 0
          }
        } else {
          body = {
            "model": "User",
            "id": temp,
            "status": 1
          }
        }
        console.log(body)
        this.progress = false
        this.apiService.changeUserStatus(body).subscribe((res) => {
          console.log(res)
          if (res.success) {

            this.progress = false
            this.commonService.successToast(res.message)

            this.getSubAdminList();
          } else {
            this.commonService.errorToast(res.message)

            this.progress = false


          }

        });
      }

    }
  }
  filterSelected(e) {

    if (this.filterBy) {
      this.flag = true
    }
    else {
      this.flag = false

    }
    this.getSubAdminList();

  }


  deleteVendor(id) {
    let body = {
      id: id,
      model: 'User'
    }

    this.apiService.delete(body).subscribe(res => {
      console.log(res);
      if (res.success) {
        this.getSubAdminList()
        this.commonService.successToast(res.message)

      } else {
        this.commonService.errorToast(res.message)
      }

    })

  }





}
