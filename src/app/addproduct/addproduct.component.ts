import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/services/api.service';
import { CommonService } from 'src/services/common.service';
import { UrlService } from 'src/services/url.service';
import { MoreThan } from 'src/services/moreThanValidator';
declare var $: any;

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent implements OnInit {
  name = 'Angular 4';
  urls = [];
  addProductForm: FormGroup
  images= [];
  parentId = ''
  categoryList: any[];
  selectedCategory: any;
  subCategoryList: any[];
  brandList: any;
  selectedBrand: any;

  submitted: boolean;
  showCommission: boolean = false;
  commission: any;
  tax: any;
  taxId: any;
  applyTax: any;
  vendorList: any;
  length: any;
  showCelebrity: boolean;
  showMerchant: boolean;
  user: any;
  sellerId: any;
  selectedSubcategory: any;
  productId: string;
  geofenceList: any;




  constructor(private router: Router, private apiService: ApiService,
    private commonService: CommonService, private urlService: UrlService, private fb: FormBuilder) {

    this.user = JSON.parse(sessionStorage.getItem('Markat_User'))

    if (this.user.roles == 'admin') {
      this.sellerId = null
    } else {
      this.sellerId = this.user._id
      this.getAllCategory(this.sellerId)
     
    }

    this.getAllGeofence();

  }

  ngOnInit() {
    this.getTax()
    $('.genral_product').hide();
    $('.genral_product.active_product').show();

    $('.add_product_list').click(function () {
      $('.genral_product').hide();
      $('.genral_product.active_product').hide();
      var product_rel = $(this).attr('rel');
      $('#' + product_rel).show();
    });


    this.addProductForm = this.fb.group({
      celebritySeller: ['', Validators.required],
      merchantSeller: ['', Validators.required],
      name: ['', [Validators.required,]],
      name_ar: ['', Validators.required],
      gender: ['', Validators.required],
      category: ['', Validators.required],
      subCategory: ['', Validators.required],
      // skuNumber: ['', [Validators.required, Validators.min(0)]],
      // isbnNumber: ['', [Validators.required, Validators.min(0)]],
      quantity: ['', [Validators.required, Validators.min(0)]],
      normalStock: ['', [Validators.required, Validators.min(0)]],
      overStock: ['', [Validators.required, Validators.min(0)]],
      purchaseQuantity: ['', [Validators.required, Validators.min(0)]],
      discount: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      highlights: ['',],
      highlights_ar: [''],
      seller: [''],
      //  isfeatured: ['', Validators.required],
      brand: ['', [Validators.required,]],
      price: ['', [Validators.required, Validators.min(1)]],
      description: ['', [Validators.required,]],
      description_ar: ['', Validators.required],
      image: ['', [Validators.required]],
      availableLocation:['',Validators.required],
      // isbnNumber: ['', [Validators.required, Validators.min(0)]],
      // isbnNumber: ['', [Validators.required, Validators.min(0)]],
      specification: this.fb.array([]),
      trustedShipping: [false],
      easyReturn: [false],
      secureShopping: [false],
      specification_ar: this.fb.array([]),
      aliases: this.fb.array([
        this.fb.control('')
      ])
    },
      {
        validator: MoreThan('quantity', 'purchaseQuantity')
      }
    )

    if (this.user.roles == 'admin') {

    } else {
      this.generateProductId(this.user.roles)
      this.addProductForm.get('seller').setValue(this.sellerId);
      this.addProductForm.get('merchantSeller').disable({ onlySelf: true })
      this.addProductForm.get('celebritySeller').disable({ onlySelf: true })
      // this.addProductForm.reset()
    }


  }
  deleteLocally(i) {

    this.urls.splice(i, 1);
    this.images.splice(i, 1)
  }

  generateProductId(roles) {

    let timestamp
    if (roles == 'celebrity') {
      timestamp = Date.now()
      this.productId = timestamp + 'CE'

    } else if (roles == 'merchant') {
      timestamp = Date.now()
      this.productId = timestamp + 'ME'
    }
  }


  getAllGeofence() {
    let body = {
      page: 1,
      count: 999999999
    }

    this.apiService.getAllGeofence(body).subscribe(res => {

      if (res.success) {
        this.geofenceList = res.data
      }

    })
  }

  setradio(user) {


    let roles: any
    let search: any
    if (user == 'celebrity') {
      this.showMerchant = false

      roles = 'celebrity';
      search = ''

      this.apiService.getCelebList(search, roles).subscribe((res) => {
        if (res.success) {
          this.vendorList = res.data;
          this.showCelebrity = true;
          this.addProductForm.get('merchantSeller').disable()
          this.addProductForm.get('celebritySeller').enable()
          this.length = res.total;

        }
      });
      this.generateProductId(roles)
    } else if (user == 'merchant') {

      this.showCelebrity = false

      roles = 'merchant',

        search = '',


        this.apiService.getCelebList(search, roles).subscribe((res) => {
          if (res.success) {
            this.vendorList = res.data;
            this.showMerchant = true;
            this.addProductForm.get('merchantSeller').enable()
            this.addProductForm.get('celebritySeller').disable()
            this.length = res.total;
          }
        });
      this.generateProductId(roles)
    }
  }
  merchantSelected(id) {
    this.sellerId = id
    this.getAllCategory(id)
  }

  celebritySelected(id) {
    this.sellerId = id
    this.getAllCategory(id);

  }
  getTax() {

    this.apiService.getTax().subscribe(res => {
      if (res.success) {
        this.tax = res.data[0].tax
        this.taxId = res.data[0]._id
        this.applyTax = res.data[0].taxApplicable
      }
    })
  }
  specification(): FormArray {
    return this.addProductForm.get('specification') as FormArray;
  }
  get aliases() {
    return this.addProductForm.get('aliases') as FormArray;
  }

  specification_ar(): FormArray {
    return this.addProductForm.get('specification_ar') as FormArray;
  }
  newSpecifiaction(): FormGroup {
    return this.fb.group({
      title: '',
      value: ''
    })
  }
  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

  newSpecifiaction_ar(): FormGroup {
    return this.fb.group({
      title: '',
      value: ''
    })
  }
  addNewSpecification_ar() {
    this.specification_ar().push(this.newSpecifiaction_ar())
  }
  addNewSpecification() {
    this.specification().push(this.newSpecifiaction())
  }

  // addNewSearchKeywrods() {
  //   this.seacrhKeywords().push(this.newSearchKeywords())
  // }
  removeSpecification(i: number) {
    this.specification().removeAt(i);

  }

  removeSearchKeywords(i: number) {
    this.aliases.removeAt(i);

  }
  removeSpecification_ar(i: number) {
    this.specification_ar().removeAt(i);

  }


  getAllCategory(id) {


    this.categoryList = []

    this.apiService.getCategoryByUser(id).subscribe(res => {

      if (res.success) {

        if (res.data) {
          this.categoryList = res.data
        }
      }

    }
    );
  }

  categorySelected(id) {

    this.selectedCategory = id
    this.getAllSubcategory(id);
    this.getBrand(id)
  }


  getAllSubcategory(id) {

    let temp = []
    this.subCategoryList = []
    if (this.selectedCategory) {
      this.categoryList.forEach(element => {
        if (element._id === id) {
          this.subCategoryList = element.subCategory
        }
      });
    } else {
      this.commonService.errorToast("Please Select a category.");

    }

  }

  subCategorySelected(id) {


    this.selectedSubcategory = id

  }

  getBrand(id) {

    this.brandList = []
    this.apiService.getBrandListBySubcat(id).subscribe(res => {
      if (res.success) {
        if (res.data) {
          this.brandList = res.data;
        }
      }
    })
  }

  brandSelected(id) {
    this.selectedBrand = id;

  }
  progress: boolean
  onSubmit() {
console.log('Form status',this.addProductForm.valid, this.images,"Img len",this.images.length);

    this.submitted = true;

    if (this.submitted && this.addProductForm.valid && this.images.length > 0) {
      const body = new FormData();
      body.append('productId', this.productId);
      body.append('seller', this.sellerId)
      body.append('name', this.addProductForm.controls['name'].value);
      body.append('name_ar', this.addProductForm.controls['name_ar'].value);
      body.append('description', this.addProductForm.controls['description'].value);
      body.append('description_ar', this.addProductForm.controls['description_ar'].value);
      body.append('price', this.addProductForm.controls['price'].value);
      body.append('category', this.addProductForm.controls['category'].value);
      body.append('subCategory', JSON.stringify(this.addProductForm.controls['subCategory'].value));
      body.append('availableLocation', JSON.stringify(this.addProductForm.controls['availableLocation'].value));
      body.append('brand', this.addProductForm.controls['brand'].value);
      body.append('purchaseQuantity', this.addProductForm.controls['purchaseQuantity'].value);
      body.append('productQuantity', this.addProductForm.controls['quantity'].value);
      body.append('normalStock', this.addProductForm.controls['normalStock'].value);
      body.append('overStock', this.addProductForm.controls['overStock'].value);
      body.append('specifications', JSON.stringify(this.addProductForm.controls['specification'].value));
      body.append('trustedShipping', JSON.stringify(this.addProductForm.controls['trustedShipping'].value));
      // body.append('isFeatured', JSON.stringify(this.addProductForm.controls['isfeatured'].value));
      body.append('easyReturn', JSON.stringify(this.addProductForm.controls['easyReturn'].value));
      body.append('secureShopping', JSON.stringify(this.addProductForm.controls['secureShopping'].value));
      body.append('gender', JSON.stringify(this.addProductForm.controls['gender'].value));

      body.append('searchKeyword', JSON.stringify(this.addProductForm.controls['aliases'].value));

      body.append('specifications_ar', JSON.stringify(this.addProductForm.controls['specification_ar'].value));
      for (let i in this.images) {
        body.append('images', this.images[i], this.images[i].name);
console.log("images",this.images[i],'index',i);

      }
      body.append('highlights', this.addProductForm.controls['highlights'].value)
      body.append('highlights_ar', this.addProductForm.controls['highlights_ar'].value)

      body.append('discount', this.addProductForm.controls['discount'].value)

    
      this.progress = true
      this.apiService.AddProduct(body).subscribe((res) => {
        if (res.success) {
          this.commonService.successToast("Product Successfully added")
          this.router.navigate(['/product'])
          this.progress = false
        } else {
          this.commonService.errorToast(res.message)
          this.progress = false
        }
      })
    }
  }

  goToproduct() {
    this.router.navigate(['/product'])
  }

  // readUrl(event: any) {
  //   let imageOk: boolean = true
  //   var img = new Image;
  //   let sefl = this
  //   let tempfile: any
  //   if (event.target.files && event.target.files[0]) {
  //     var filesAmount = event.target.files.length;
  //     for (let i = 0; i < event.target.files.length; i++) {
  //       let name = event.target.files[i].name;
  //       tempfile = event.target.files[i]
  //       var reader = new FileReader();
  //       let toasterService = this.commonService
  //       reader.readAsDataURL(event.target.files[i])
  //       reader.onload = (event: any) => {
  //         img.src = event.target.result;
  //         let temp = {
  //           name: name,
  //           image: event.target.result
  //         }
  //          img.onload = () => {
  //           var height = img.height;
  //           var width = img.width;
  //           if (height != width) {
  //             toasterService.errorToast("Image should be a Square size");
  //             imageOk = false
  //             // this.pushImage();
  //             return imageOk
  //           } else {
  //             toasterService.successToast("Image Size is Ok");
  //             imageOk = true
  //             this.urls.push(temp);
  //             this.images.push(tempfile);
  //             console.log('Images',this.urls,this.images,temp,tempfile);
              
  //             // this.addProductForm.controls['image'].patchValue(this.images)
  //             return imageOk
  //           }

  //         };
  //       }
  //     }
  //   }
  // }


  back() {
    history.back();
  }
  readUrl(e) {
    let temp = []

    if (e.target.files && e.target.files[0]) {
      for (let i = 0; i < e.target.files.length; i++) {
        var reader = new FileReader();
        let name = e.target.files[i].name;
        this.images.push(e.target.files[i]);
        reader.readAsDataURL(e.target.files[i]);
        reader.onload = (event: any) => {
          let body = {
            name: name,
            image: event.target.result
          }
          this.urls.length<6?this.urls.push(body):(this.commonService.closeTost(),this.commonService.errorToast('Maximum 6 images can be uploaded'));
         var uniqArray = Array.from(new Map(this.urls.map(e=>[e.name, e])).values());
         this.urls = uniqArray
         };
      }
    } else {
      this.commonService.errorToast('Only Document can be uploaded')
    }

  }
}
