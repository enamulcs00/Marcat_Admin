import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.scss']
})
export class SubcategoryComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }
  gotoeditsubcategory(){
    this.router.navigate(['editsubcategory'])
  }
  gotoviewsubcategory(){
    this.router.navigate(['viewsubcategory'])
  }
  gotoaddsubcategory(){
    this.router.navigate(['addsubcategory'])
  }
 
}
