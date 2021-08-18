import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { FormArray, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MoreThan } from 'src/services/moreThanValidator';
import { CommonService } from 'src/services/common.service';
import { UrlService } from 'src/services/url.service';
declare var $: any;
@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {





  //Because of short time. copy pasting the code of edit product and disable the form to work as view product






  name = 'Angular 4';
  urls = [];
  editProductForm: FormGroup
  images = [];
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
  selectedSubcategory = [];
  productId: string;
  sub: any;
  id: any;
  sellerDetails: any;
  imageURl: string;
  flagImageEditted: boolean;
  previewImage: any;
  tempSelectedCategoryId: any;
  progress: boolean;




  constructor(private router: Router, private apiService: ApiService, private route: ActivatedRoute,
    private commonService: CommonService, private urlService: UrlService, private fb: FormBuilder) {

    this.user = JSON.parse(sessionStorage.getItem('Markat_User'))
    console.log(this.user);
    this.imageURl = this.urlService.imageUrl
    if (this.user.roles == 'admin') {
      this.sellerId = null
    } else {
      this.sellerId = this.user._id
      this.getAllCategory(this.sellerId)
    }
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.id = params['id'];

      });

  }

  ngOnInit() {
    this.getProduct(this.id)

    $('.genral_product').hide();
    $('.genral_product.active_product').show();

    $('.add_product_list').click(function () {
      $('.genral_product').hide();
      $('.genral_product.active_product').hide();
      var product_rel = $(this).attr('rel');
      $('#' + product_rel).show();
    });


    this.editProductForm = this.fb.group({
      // celebritySeller: ['', Validators.required],
      // merchantSeller: ['', Validators.required],
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
      // seller: [''],
      isfeatured: ['', Validators.required],
      brand: ['', [Validators.required,]],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required,]],
      description_ar: ['', Validators.required],
      image: ['',],
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



  }

  getProduct(id) {
    this.progress = false
    this.apiService.viewProduct(id).subscribe(res => {
      console.log(res);
      if (res.success) {
        this.progress = false
        this.sellerDetails = res.data.seller

        this.getAllCategory(this.sellerDetails._id)
        this.setValue(res.data)

      } else {
        this.progress = false
        this.commonService.errorToast(res.message)
      }
    })


  }
  setValue(data: any) {

    this.selectedCategory = data.category._id
    this.productId = data.productId
    data.subCategory.forEach(element => {
      this.selectedSubcategory.push(element._id)
    });

    this.editProductForm.get('name').setValue(data.name);
    this.editProductForm.get('name_ar').setValue(data.name_ar);


    this.getBrand(data.category.id)
    this.editProductForm.get('quantity').setValue(data.productQuantity);
    this.editProductForm.get('normalStock').setValue(data.normalStock);
    this.editProductForm.get('overStock').setValue(data.overStock);
    this.editProductForm.get('purchaseQuantity').setValue(data.purchaseQuantity);
    this.editProductForm.get('discount').setValue(data.discount);
    this.editProductForm.get('highlights').setValue(data.highlights);
    this.editProductForm.get('highlights_ar').setValue(data.highlights_ar);
    if (data.isFeatured == true) {
      this.editProductForm.get('isfeatured').setValue('true');

    } else {
      this.editProductForm.get('isfeatured').setValue('false');

    }
    this.editProductForm.get('brand').setValue(data.brand._id);

    this.editProductForm.get('price').setValue(data.price);
    this.editProductForm.get('category').setValue(data.category._id);
    this.editProductForm.get('description').setValue(data.description);
    this.editProductForm.get('description_ar').setValue(data.description_ar);
    this.editProductForm.get('trustedShipping').setValue(data.trustedShipping);
    this.editProductForm.get('secureShopping').setValue(data.secureShopping);
    this.editProductForm.get('easyReturn').setValue(data.easyReturn);
    this.editProductForm.get('gender').setValue(data.gender);
    this.setSpecifications(data.specifications)
    this.setSpecifications_ar(data.specifications_ar)
    this.setSearchKeywords(data.searchKeyword)
    this.previewImage = data.images;

    this.editProductForm.disable()
  }



  specification(): FormArray {
    return this.editProductForm.get('specification') as FormArray;
  }
  get aliases() {
    return this.editProductForm.get('aliases') as FormArray;
  }

  specification_ar(): FormArray {
    return this.editProductForm.get('specification_ar') as FormArray;
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

  deleteLocally(i) {
    this.urls.splice(i, 1)
  }

  deletePhoto(imagePath) {

    console.log(imagePath);
    let body = {
      imageId: imagePath
    }
    this.apiService.deleteImage(body).subscribe(res => {
      // this.commonService.successToast("Image Deleted")
      this.getProduct(this.id)
    })

  }


  setSpecifications(specification) {
    const formArray = new FormArray([]);
    for (let x of specification) {
      formArray.push(this.fb.group({
        title: x.title,
        value: x.value
      }));
    }
    this.editProductForm.setControl('specification', formArray)
  }

  setSpecifications_ar(specification_ar) {
    const formArray = new FormArray([]);
    for (let x of specification_ar) {
      formArray.push(this.fb.group({
        title: x.title,
        value: x.value
      }));
    }
    this.editProductForm.setControl('specification_ar', formArray)
  }

  setSearchKeywords(searchKeywords) {


    this.editProductForm.setControl('aliases', this.fb.array(searchKeywords || []))
  }


  getAllCategory(id) {


    this.categoryList = []

    this.apiService.getCategoryByUser(id).subscribe(res => {

      if (res.success) {
        console.log(res);
        if (res.data) {
          this.categoryList = res.data
          //this.getAllSubcategory(this.selectedCategory);
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
      this.editProductForm.get('subCategory').setValue(this.selectedSubcategory);
    } else {
      this.commonService.errorToast("Please Select a category.");

    }

  }
  compareObjects(o1: any, o2: any) {
    if (o1.name == o2.name && o1.id == o2.id)
      return true;
    else return false
  }

  subCategorySelected(id) {


    console.log(id);
    this.selectedSubcategory = id

  }

  getBrand(id) {

    this.brandList = []
    this.apiService.getBrandListBySubcat(id).subscribe(res => {
      if (res.success) {
        console.log(res)
        if (res.data) {
          this.brandList = res.data;
        }
      }
    })
  }

  brandSelected(id) {
    this.selectedBrand = id;
    console.log(id);

  }

  onSubmit() {

    console.log("check", this.editProductForm)
    this.submitted = true;

    if (this.submitted && this.editProductForm.valid) {
      const body = new FormData();
      body.append('id', this.id);

      body.append('productId', this.productId);
      body.append('seller', this.sellerDetails._id)
      body.append('name', this.editProductForm.controls['name'].value);
      body.append('name_ar', this.editProductForm.controls['name_ar'].value);
      body.append('description', this.editProductForm.controls['description'].value);
      body.append('description_ar', this.editProductForm.controls['description_ar'].value);
      body.append('price', this.editProductForm.controls['price'].value);
      body.append('category', this.editProductForm.controls['category'].value);
      body.append('subCategory', JSON.stringify(this.editProductForm.controls['subCategory'].value));
      body.append('brand', this.editProductForm.controls['brand'].value);
      body.append('purchaseQuantity', this.editProductForm.controls['purchaseQuantity'].value);
      body.append('productQuantity', this.editProductForm.controls['quantity'].value);
      body.append('normalStock', this.editProductForm.controls['normalStock'].value);
      body.append('overStock', this.editProductForm.controls['overStock'].value);
      body.append('specifications', JSON.stringify(this.editProductForm.controls['specification'].value));
      body.append('isFeatured', this.editProductForm.controls['isfeatured'].value);
      body.append('trustedShipping', JSON.stringify(this.editProductForm.controls['trustedShipping'].value));
      body.append('easyReturn', JSON.stringify(this.editProductForm.controls['easyReturn'].value));
      body.append('secureShopping', JSON.stringify(this.editProductForm.controls['secureShopping'].value));
      body.append('gender', JSON.stringify(this.editProductForm.controls['gender'].value));
      body.append('searchKeyword', JSON.stringify(this.editProductForm.controls['aliases'].value));
      body.append('specifications_ar', JSON.stringify(this.editProductForm.controls['specification_ar'].value));
      for (let i = 0; i < this.images.length; i++) {
        body.append('images', this.images[i], this.images[i].name);
      }
      body.append('highlights', this.editProductForm.controls['highlights'].value)
      body.append('highlights_ar', this.editProductForm.controls['highlights_ar'].value)

      body.append('discount', this.editProductForm.controls['discount'].value)

      body.forEach((value, key) => {
        console.log(key + " " + value)
      });
      this.progress = true
      this.apiService.updateProduct(body).subscribe((res) => {
        if (res.success) {
          this.progress = false
          this.commonService.successToast("Product Successfully added")
          this.router.navigate(['/product'])
          console.log(res)
        } else {
          this.progress = false
          this.commonService.errorToast(res.message)
        }
      })
    }
  }

  goToproduct() {
    this.router.navigate(['/product'])
  }

  readUrl(event: any) {

    let imageOk: boolean = true
    var img = new Image;
    let sefl = this
    let tempfile: any
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        let name = event.target.files[i].name;
        tempfile = event.target.files[i]
        console.log("check image", event.target.files[i].size);
        var reader = new FileReader();
        let toasterService = this.commonService

        reader.readAsDataURL(event.target.files[i])
        reader.onload = (event: any) => {
          img.src = event.target.result;
          console.log(event.target.result);

          let temp = {
            name: name,
            image: event.target.result
          }

          img.onload = () => {

            var height = img.height;
            var width = img.width;
            if (height != width) {
              toasterService.errorToast("Image should be a Square size");
              imageOk = false
              // this.pushImage();
              return imageOk
            } else {
              toasterService.successToast("Image Size is Ok");
              imageOk = true
              this.flagImageEditted = true
              this.urls.push(temp);
              this.images.push(tempfile);
              this.editProductForm.controls['image'].patchValue(this.images)
              return imageOk
            }

          };
        }
      }
    }
  }


  back() {
    history.back()
  }

}


