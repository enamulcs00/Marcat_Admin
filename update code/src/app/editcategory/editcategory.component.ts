import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-editcategory',
  templateUrl: './editcategory.component.html',
  styleUrls: ['./editcategory.component.scss']
})
export class EditcategoryComponent implements OnInit {

   constructor(private router: Router) { }

  ngOnInit() {
  }
  goTocategory() {
    this.router.navigate(['/category'])
  }
  
}
