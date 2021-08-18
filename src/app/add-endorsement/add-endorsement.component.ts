import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'app-add-endorsement',
  templateUrl: './add-endorsement.component.html',
  styleUrls: ['./add-endorsement.component.scss']
})
export class AddEndorsementComponent implements OnInit {
  progress: boolean;
  vendorList: any;
  endorsementForm: FormGroup;
  flagData: boolean;
  productList: any;
  sellerId: any;
  celebList: any;
  user: any;

  constructor(private apiService:ApiService,private commonService:CommonService,private fb:FormBuilder, private router:Router) {
    this.user = JSON.parse(this.apiService.getUser())
   }

  ngOnInit() {
    this.showVendorList();
    this.showCelebrityList();
    this.endorsementForm= this.fb.group({
      id:['',Validators.required],
      product:['',Validators.required],
      celebrity:['',Validators.required],
      commission:['',[Validators.required, Validators.max(100), Validators.min(0)]],
    })

  }





  showVendorList() {
    
    let body = {
      roles: 'merchant',
      filter: '',
      search: '',
      page: 1,
      count: 99999999    }
    this.progress = true

    this.apiService.getList(body).subscribe((res) => {
      if (res.success) {
        this.progress = false
        this.vendorList = res.data;
      
      } else {
        this.progress = false
        this.commonService.errorToast(res.message)
      }
    });
  }



  showCelebrityList() {
    let body = {
      roles: 'celebrity',
      filter: '',
      search: '',
      page: 1,
      count: 9999999999,
      isFeatured: ''
    }
    this.progress = false
    this.apiService.getList(body).subscribe((res) => {
      if (res.success) {
        this.progress = false
        this.celebList = res.data;
      } else {
        this.progress = false
        this.commonService.errorToast(res.message)
      }
    });
  }


  vendorSelected(id) {
    this.sellerId = id
    this.getAllProducts()
  }


  onSubmit(){
    let body= this.endorsementForm.value;
    this.apiService.addEndorsement(body).subscribe(res=>{
      if(res.success){
        this.commonService.successToast(res.message);
        this.router.navigate(['/admin-endorment'])
      }else{
        this.commonService.errorToast(res.message)
      }
      
    })
  }


  back() {
    window.history.back()
  }

  getAllProducts() {
    
    //Method if isApproved is selected for some value
    this.progress = true
    this.apiService.getProductsForEndorsement(1, 99999999999, '', true, '',
      this.sellerId, true)
      .subscribe(res => {
        if (res.success) {
          this.progress = false
          if (res.data.length > 0) {
            this.flagData = false;
            this.productList = res.data;
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


}
