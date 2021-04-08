import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
interface Food {
  value: string;
  viewValue: string;
}
interface Ready {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-addordermanagement',
  templateUrl: './addordermanagement.component.html',
  styleUrls: ['./addordermanagement.component.scss']
})
export class AddordermanagementComponent implements OnInit {
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
  ];
  name = 'Angular 4';
  url: any;
  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: ProgressEvent) => {
        this.url = (<FileReader>event.target).result;
      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }
  constructor(private router: Router) { }

  ngOnInit() {
  }
  goToordermanagement() {
    this.router.navigate(['/ordermanagement'])
  }
}
