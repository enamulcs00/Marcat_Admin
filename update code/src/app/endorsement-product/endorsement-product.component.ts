import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { UrlService } from 'src/services/url.service';
import { CommonService } from 'src/services/common.service';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-endorsement-product',
  templateUrl: './endorsement-product.component.html',
  styleUrls: ['./endorsement-product.component.scss']
})
export class EndorsementProductComponent implements OnInit {

  productList: any;
  sub: any
  id: any
  name: any
  length = 100;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;
  filterBy = 'active';
  search = '';
  imageToShow: any;
  blockCheck: any;
  imageUrl: any;
  categoryId = '';
  subCategory = '';
  flagData: boolean = false;
  page: number = 1;
  flagUserList: boolean = false;
  srNo: number;
  user: any;
  sellerId: any;
  isApproved: any = true;
  flagapproval: boolean;
  idToDelete: any;
  isEndorse: any = true;
  progress: boolean;
  constructor(private router: Router,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private serverUrl: UrlService,
    private commonService: CommonService
  ) {
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.id = params['id'];

      });
    this.user = JSON.parse(sessionStorage.getItem('Markat_User'))
    console.log(this.user);

    this.sellerId = this.id
    //alert(this.id)
  }

  ngOnInit() {

    // alert(this.id)
    this.imageUrl = this.serverUrl.imageUrl;
    this.getAllProducts()

  }
  flag: boolean = false

  filterSelected(e) {

    if (this.filterBy) {
      this.flag = true
    }
    else {
      this.flag = false

    }
    console.log(e.value);
    this.filterBy = e.value;

    this.getAllProducts()
  }

  approvedSelected(e) {

    if (this.isApproved) {
      this.flagapproval = true
    }
    else {
      this.flagapproval = false

    }
    console.log(e.value);
    this.isApproved = e.value;

    this.getAllProducts()
  }




  getAllProducts() {

    //Method if isApproved is selected for some value
    this.progress = true
    this.apiService.getProductsForEndorsement(this.page, this.pageSize, this.filterBy, this.isApproved, this.search,
      this.sellerId, this.isEndorse)
      .subscribe(res => {
        if (res.success) {
          this.progress = false
          if (res.data.length > 0) {
            this.flagData = false;
            this.productList = res.data;
            console.log(res.data);
            this.length = res.total
            // this.productList = res.data
          } else {
            this.flagData = true;
          }
        } else {
          this.progress = false
          this.commonService.errorToast(res.message)
          this.flagData = true
        }

      })

  }


  flagSearch: boolean = true
  searchMethod() {
    this.flagSearch = false
    this.getAllProducts();

  }

  clearSearch() {
    this.flagSearch = true
    this.search = ''
    this.getAllProducts()
  }


  vendorProductListAfterPageSizeChanged(e): any {

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

    this.getAllProducts()
  }

  edndorsementProduct(id) {

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
            product: id,
            commission: result.value,
          }
          this.progress = true
          this.apiService.endorsementRequest(body).subscribe(res => {
            console.log(res);
            if (res.success) {
              this.progress = false
              console.log('requestSent');
              this.commonService.successToast(res.message)
            } else {
              this.progress = false
              this.commonService.errorToast(res.message)

            }

          })
        } else {
          this.commonService.errorToast('Please add commission')
        }
      } else {
        console.log("nothing changed");

      }

    })

  }

  goToaddProduct() {
    this.router.navigate(['/addproduct'])
  }
  goToeditProduct(id) {
    this.router.navigate(['/editProduct'], { queryParams: { "id": id } })
  }
  goToviewProduct(id: any) {
    this.router.navigate(['/viewProduct'], { queryParams: { "id": id } })
  }


  goToVendorList() {
    this.router.navigate(['venderManagement']);
  }

  back() {
    window.history.back()
  }
}
