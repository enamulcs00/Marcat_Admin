import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addsubcategory',
  templateUrl: './addsubcategory.component.html',
  styleUrls: ['./addsubcategory.component.scss']
})
export class AddsubcategoryComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  goTosubcategory(){
    this.router.navigate(['subcategory'])
  }

}
