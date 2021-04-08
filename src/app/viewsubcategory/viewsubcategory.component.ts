import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { UrlService } from 'src/services/url.service';

@Component({
  selector: 'app-viewsubcategory',
  templateUrl: './viewsubcategory.component.html',
  styleUrls: ['./viewsubcategory.component.scss']
})
export class ViewsubcategoryComponent implements OnInit {
  sub: any;
  id: any;
  categoryName: any;
  vendorId
  SubcategoryList: any
  imagePath: any
  flagData: any
  constructor(private router: Router, private route: ActivatedRoute, private apiService: ApiService,
    private urlService: UrlService) {
    this.imagePath = this.urlService.imageUrl
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.id = params['id'];
        this.categoryName = params['name'];
        this.vendorId = params['vendorId']
      });
  }

  getSubcategoryOfVendor() {
    this.apiService.getVendorSubcategory(this.vendorId, this.id).subscribe((res) => {
      if (res.data.length > 0) {
        console.log(res);
        this.flagData = false
        this.SubcategoryList = res.data
      } else {
        this.flagData = true

      }
    })

  }

  goToVendorList() {
    this.router.navigate(['venderManagement']);
  }

  ngOnInit() {
    this.getSubcategoryOfVendor();

  }
  goToproduct(subcategoryId, name) {
    this.router.navigate(['product'], { queryParams: { id: this.vendorId, categoryId: this.id, subCategory: subcategoryId, name: name } })
  }
}
