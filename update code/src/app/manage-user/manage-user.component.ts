import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/services/common.service';
import { ApiService } from 'src/services/api.service';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { promise } from 'protractor';
import Swal from 'sweetalert2';
import { UrlService } from 'src/services/url.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {
  length = 100;
  pageSize = 10;
  page = 1;
  roles = 'user';
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;
  filterBy: string = '';
  search: string = '';
  userList: any
  flagData: any;
  flagNumber: boolean = false;
  flagUserList: boolean = false;
  progress: boolean;
  baseUrl: string;
  user: any;
  constructor(private router: Router,
    private apiService: ApiService,
    private commonService: CommonService, private urlService: UrlService) {
    this.user = JSON.parse(this.apiService.getUser())
  }
  srNo: number
  ngOnInit() {
    this.ShowAllUser()
    this.baseUrl = this.urlService.SERVER_URL;

  }
  body: {}

  flag: boolean = false
  filterSelected(e) {

    if (this.filterBy) {
      this.flag = true
    }
    else {
      this.flag = false
    }
    // console.log(e.target.value);

    //  this.filterBy = e.target.value
    this.ShowAllUser()

  }


  changeUserStatus(id, status) {



    let temp = id
    for (let i = 0; i <= this.userList.length; i++) {
      if (this.userList[i]._id == temp) {
        if (status == 1) {
          this.body = {
            "model": "User",
            "id": temp,
            "status": 0
          }
        } else {
          this.body = {
            "model": "User",
            "id": temp,
            "status": 1
          }
        }
        console.log(this.body)
        this.progress = true
        this.apiService.changeUserStatus(this.body).subscribe((res) => {
          console.log(res)
          if (res.success) {
            this.progress = false
            this.commonService.successToast(res.message)
            this.ShowAllUser();
          } else {
            this.commonService.errorToast(res.message)
          }

        });
      }

    }
  }


  flagSearch: boolean = true
  searchMethod() {
    this.flagSearch = false
    // console.log(this.search);
    this.ShowAllUser()

  }

  clearSearch() {

    this.flagSearch = true
    this.search = ''
    this.ShowAllUser()
  }



  UserListAfterPageSizeChanged(e): any {
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
        this.pageSize = e.pageSize
      } else {
        this.page = e.pageIndex;
        this.srNo = e.pageIndex * e.pageSize
        this.flagUserList = true
        this.pageSize = e.pageSize
      }

    }
    this.ShowAllUser();
  }


  ShowAllUser() {

    //Calling method from service which will call api for data
    let body = {
      roles: this.roles,
      filter: this.filterBy,
      search: this.search,
      page: this.page,
      count: this.pageSize
    }
    this.progress = true
    this.apiService.getList(body).subscribe(res => {
      console.log(res);

      if (res.success) {
        this.progress = false
        if (res.data.length > 0) {
          this.flagData = false
          this.userList = res.data;
          this.length = res.total;
          console.log(this.userList);
        } else {

          this.flagData = true
        }

      } else {
        this.progress = false
        this.commonService.errorToast(res.message)
      }
    })

  }
  goToadduser() {
    this.router.navigate(['adduser'])
  };
  goTobookingRequestHistory(i) {
    let id: any
    let name: string
    // console.log(i);
    for (let j = 0; j <= this.userList.length; j++) {
      if (i == j) {
        // console.log(this.userList[j]._id);
        id = this.userList[j]._id;
        name = this.userList[j].firstName;

      }
    }
    this.router.navigate(['bookingRequestHistory'], { queryParams: { "id": id, "name": name } })
  };
  goToviewUser() {
    this.router.navigate(['viewUser'])
  };

  goToUserAddress(id) {
    this.router.navigate(['deliveryAddress'], { queryParams: { "id": id } })
  }
  goToeditUser(i) {
    let id: any
    // console.log(i);
    for (let j = 0; j <= this.userList.length; j++) {
      if (i == j) {
        // console.log(this.userList[j]._id);
        id = this.userList[j]._id

      }
    }
    this.router.navigate(['editUser'], { queryParams: { "id": id } })
  }

  deleteUser(id) {

    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this User!",
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
          "model": "User"
        }
        this.progress = true
        this.apiService.delete(data).subscribe(res => {
          console.log(res);
          if (res.success) {
            this.progress = false
            //  this.getAllCategories()
            this.commonService.successToast(res.message);
            this.ShowAllUser()

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

  downloadCsv() {

    let url = [this.baseUrl + '/api/admin/exportUserCsv',]

    window.open(this.baseUrl + '/api/admin/exportUserCsv', '_blank')

  }


  back() {
    window.history.back()
  }
}
