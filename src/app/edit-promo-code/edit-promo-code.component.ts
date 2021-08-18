import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/services/api.service';
import { CommonService } from 'src/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-promo-code',
  templateUrl: './edit-promo-code.component.html',
  styleUrls: ['./edit-promo-code.component.scss']
})
export class EditPromoCodeComponent implements OnInit {
  editPromoCodeForm: FormGroup;
  progress: boolean;
  today: string;
  id: any;
  sub: any;
  constructor(private fb: FormBuilder, private apiService: ApiService, private route: ActivatedRoute, private commonService: CommonService, private router: Router) { }

  ngOnInit() {
    this.today = moment(new Date()).add(1,'day').format('YYYY-MM-DD');
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.id = params['id'];

      });

    this.viewPromoCode()
    this.editPromoCodeForm = this.fb.group({
      code: ['', Validators.required],
      expiry: ['', Validators.required],
      description: ['', Validators.required],
      minCartValue: ['', Validators.required],
      discount: ['', Validators.required],
      maxDiscount: ['', Validators.required],
      discountType: ['', Validators.required],
      freqPerUser: ['', Validators.required],
      exhaustLimit: ['', Validators.required]
    })
  }

  viewPromoCode() {
    
    this.apiService.getPromoCode(this.id).subscribe(res => {
      console.log(res);
      if (res.success) {
        this.editPromoCodeForm.get('code').setValue(res.data.code),
          this.editPromoCodeForm.get('expiry').setValue(res.data.expiry),
          this.editPromoCodeForm.get('description').setValue(res.data.description),
          this.editPromoCodeForm.get('minCartValue').setValue(res.data.minCartValue),
          this.editPromoCodeForm.get('discount').setValue(res.data.discount),
          this.editPromoCodeForm.get('maxDiscount').setValue(res.data.maxDiscount),
          this.editPromoCodeForm.get('discountType').setValue(res.data.discountType),
          this.editPromoCodeForm.get('freqPerUser').setValue(res.data.freqPerUser),
          this.editPromoCodeForm.get('exhaustLimit').setValue(res.data.exhaustLimit);
      }
      else {
        this.commonService.errorToast(res.message)
      }
    })
  }


  onSubmit() {
    console.log(this.editPromoCodeForm.value);
    if (this.editPromoCodeForm.valid) {
      let body = this.editPromoCodeForm.value;

      this.progress = true
      this.apiService.updatePromoCode(body, this.id).subscribe(res => {
        console.log(res);
        if (res.success) {
          this.progress = false;
          this.commonService.successToast(res.message)
          this.router.navigate(['promoCodeList'])
        } else {
          this.progress = false;
          this.commonService.errorToast(res.message);
        }

      })

    }




  }


  goToinventory() {
    history.back()
  }

}
