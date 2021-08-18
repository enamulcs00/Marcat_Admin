import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { UrlService } from 'src/services/url.service';
@Component({
  selector: 'app-viewcategory',
  templateUrl: './viewcategory.component.html',
  styleUrls: ['./viewcategory.component.scss']
})
export class ViewcategoryComponent implements OnInit {

  vendorName: any
  id: any
  sub: any;
  categoryList: any
  flagData: any
  constructor(private router: Router, private route: ActivatedRoute, private apiService: ApiService, private urlServie: UrlService) {

    this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.id = params['id'];
        this.vendorName = params['name']
      });
  }
  imagePath: any

  getCategory() {

    this.apiService.getVendorsCategory(this.id).subscribe((res) => {
      console.log(res)
      if (res.data.length > 0) {
        this.flagData = false
        this.categoryList = res.data
      } else {
        this.flagData = true
      }
    });

  }



  goToVendorList() {
    this.router.navigate(['venderManagement']);
  }

  ngOnInit() {
    this.imagePath = this.urlServie.imageUrl;
    this.getCategory()
  }
  goTocategory(id) {
    this.router.navigate(['/category'])
  }

  goToSubcategory(id, name) {
    this.router.navigate(['/viewsubcategory'], { queryParams: { id: id, vendorId: this.id, name: name } })
  }
}
