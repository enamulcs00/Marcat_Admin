import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CommonService } from 'src/services/common.service';
import { MoreThan } from 'src/services/moreThanValidator';

@Component({
  selector: 'app-addinventory',
  templateUrl: './addinventory.component.html',
  styleUrls: ['./addinventory.component.scss']
})
export class AddinventoryComponent implements OnInit {
  sub: any;
  id: any;
  updateInventoryForm: FormGroup;
  submitted: boolean;
  progress: boolean;

  constructor(private router: Router, private activatedrouter: ActivatedRoute, private apiService: ApiService, private fb: FormBuilder, private commonService: CommonService) {

    this.sub = this.activatedrouter
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.id = params['id'];

      });
    this.getProduct(this.id)
  }

  ngOnInit() {
    this.updateInventoryForm = this.fb.group({
      productId: [''],
      productName: [''],
      productCategory: [''],
      normalStock: [''],
      overStock: [''],
      currentQuantity: [''],
      price: [''],
      minimumPurchaseQuantity: [''],
      updateQuantity: ['', Validators.required],

    })


  }

  getProduct(id) {
    this.apiService.viewProduct(id).subscribe(res => {
      if (res.success) {
        this.updateInventoryForm.get('productId').setValue(res.data.productId)
        this.updateInventoryForm.get('productName').setValue(res.data.name)
        this.updateInventoryForm.get('productCategory').setValue(res.data.category.name)
        this.updateInventoryForm.get('normalStock').setValue(res.data.normalStock)
        this.updateInventoryForm.get('overStock').setValue(res.data.overStock)
        this.updateInventoryForm.get('currentQuantity').setValue(res.data.productQuantity)
        this.updateInventoryForm.get('price').setValue(res.data.price)
        //  this.updateInventoryForm.get('updateQuantity').setValue(res.data.productId)
        this.updateInventoryForm.get('minimumPurchaseQuantity').setValue(res.data.purchaseQuantity)
        this.updateInventoryForm.disable();
        this.updateInventoryForm.get('updateQuantity').enable()
      }
    })


  }
  onSubmit() {

    this.submitted = true;

    if (this.submitted && this.updateInventoryForm.valid) {
      const body = new FormData();
      body.append('id', this.id);
      body.append('productQuantity', this.updateInventoryForm.controls['updateQuantity'].value);

    
      this.progress = true
      this.apiService.updateProduct(body).subscribe((res) => {
        if (res.success) {
          this.commonService.successToast(res.message)
          this.progress = false
          this.router.navigate(['/inventryManagement'])
        } else {
          this.commonService.errorToast(res.message)
          this.progress = false
        }
      })
    }
  }



  goToinventory() {
    history.back()
  };
}
