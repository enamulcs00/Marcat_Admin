import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
interface Food {
  value: string;
  viewValue: string;
}
interface Ready {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {
  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Confirm' },
    { value: 'pizza-1', viewValue: 'Cancel' },
    { value: 'tacos-2', viewValue: 'Ready To Pickup' },
    { value: 'tacos-3', viewValue: 'Completed' }
  ];
  pick: Ready[] = [
    { value: '5 Days', viewValue: '5 Days' },
    { value: '1 Days', viewValue: '1 Day' },
    { value: '2 Days', viewValue: '2 Days' },
    { value: '3 Days', viewValue: '3 Days' }
  ]; name = 'Angular 4';
  url: any;
  editOrderFormGroup: FormGroup
  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: ProgressEvent) => {
        this.url = (<FileReader>event.target).result;
      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }
  constructor(private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.editOrderFormGroup = this.fb.group({
      orderId: [''],
      productName: [''],
      category: [''],
      subCategory: [''],
      isbnNumber: [''],
      skuNumber: [''],
      qunatity: [''],
      price: [''],
      userName: [''],
      userAddess: [],
      orderDate: [''],
      deliveryDate: [''],
      status: ['']
    })
  }
  goToordermanagement() {
    this.router.navigate(['/ordermanagement'])
  }

}
