import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { ApiService } from 'src/services/api.service';
import { query } from '@angular/animations';
import Swal from "sweetalert2";
import { CommonService } from 'src/services/common.service';
@Component({
  selector: 'app-vender-management',
  templateUrl: './vender-management.component.html',
  styleUrls: ['./vender-management.component.scss']
})
export class VenderManagementComponent implements OnInit {
  progress: boolean
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
  roles: any = 'merchant';
  categoryList: any[];
  selectedCategory = [];
  body2: any;
  user: any;
  constructor(private router: Router, private apiService: ApiService, private commonService: CommonService) {
    this.user = JSON.parse(this.apiService.getUser())
  }

  ngOnInit() {
    this.showVendorList();
  }

  flag = false
  filterSelected(e) {

    if (this.filterBy) {
      this.flag = true
    }
    else {
      this.flag = false

    }
    this.showVendorList();

  }


  showVendorList() {
    console.log("inside get vendor")
    let body = {
      roles: this.roles,
      filter: this.filterBy,
      search: this.search,
      page: this.page,
      count: this.pageSize
    }
    this.progress = true
    this.apiService.getList(body).subscribe((res) => {
      if (res.success) {
        console.log(res);
        this.vendorList = res.data;
        this.length = res.total;
        this.progress = false
      } else {
        this.progress = false
        this.commonService.errorToast(res.message)
      }
    });
  }

  acceptVendor(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "What will be the Commission percentage for the Vendor",
      icon: "info",
      showCancelButton: true,
      input: 'number',
      confirmButtonColor: "#3085D6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      allowOutsideClick: true
    }).then(result => {
      if (result.isConfirmed) {
        if (result.value) {
          let body = {
            id: id,
            sellerProfileStatus: 1,
            commission: result.value,
          }
          this.acceptReject(body)
        } else {
          this.commonService.errorToast('Please add commission')
        }
      } else {
        console.log("nothing changed");

      }

    })
  }


  changeUserStatus(id, status) {

    let temp = id
    for (let i = 0; i <= this.vendorList.length; i++) {
      if (this.vendorList[i]._id == temp) {
        if (status == 1) {
          this.body2 = {
            "model": "User",
            "id": temp,
            "status": 0
          }
        } else {
          this.body2 = {
            "model": "User",
            "id": temp,
            "status": 1
          }
        }
        console.log(this.body2)
        this.progress = false
        this.apiService.changeUserStatus(this.body2).subscribe((res) => {
          console.log(res)
          if (res.success) {
            this.progress = false
            this.commonService.successToast(res.message)
            this.showVendorList();
          } else {
            this.progress = false
            this.commonService.errorToast(res.message)

          }

        });
      }

    }
  }

  declinedVendor(id) {

    Swal.fire({
      title: "Are you sure?",
      text: "Please Provide the reason to decline this request!",
      icon: "warning",
      showCancelButton: true,
      input: 'text',
      confirmButtonColor: "#3085D6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      allowOutsideClick: true
    }).then(result => {
      if (result.isConfirmed) {
        if (result.value) {
          let body = {
            id: id,
            sellerProfileStatus: 2,
            message: result.value,
          }
          this.acceptReject(body)
        } else {
          this.commonService.errorToast("Please add commission")
        }
      } else {
        console.log("nothing changed");

      }

    })


  }

  acceptReject(body) {

    this.progress = true
    this.apiService.approveReject(body).subscribe(res => {
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
    this.showVendorList()
  }


  flagSearch: boolean = true
  searchMethod() {
    this.flagSearch = false
    console.log(this.search);
    this.showVendorList()
  }

  clearSearch() {
    this.flagSearch = true
    this.search = ''
    this.showVendorList()

  }
  deleteVendor(id) {

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
            this.showVendorList()

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

  goToaddVender() {
    this.router.navigate(['add'], { queryParams: { 'check': 'merchant' } })
  }
  goToviewVendor(id) {
    this.router.navigate(['view'], { queryParams: { 'id': id } })
  }
  goToeditVendor(id) {
    this.router.navigate(['edit'], { queryParams: { 'id': id } })
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

  goToViewCategory(categories) {
    // alert(id);
    this.selectedCategory = []
    for (let i in categories) {
      this.selectedCategory.push(categories[i].name)
    }
  }
  viewDocument(id) {

    this.router.navigate(['document'], { queryParams: { 'id': id, 'role': 'vendor' } })
  }


  back() {
    window.history.back()
  }

}
