import { Component, OnInit, AfterViewInit, AfterContentChecked, ChangeDetectionStrategy, SimpleChanges, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/services/common.service';
import * as moment from 'moment';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import { GreaterDateMatch } from 'src/services/greatDateValidator';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
interface Ready {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-addoffers',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './addoffers.component.html',
  styleUrls: ['./addoffers.component.scss']
})
export class AddoffersComponent implements OnInit, AfterContentChecked, AfterViewChecked {


  showCategory: boolean = false
  showSubcategory: boolean
  showVendor: boolean
  showProduct: boolean
  categoryList = [];
  subCategoryList = [];
  vendorList = [];
  productList = [];
  selectedItem = [];
  selectedCategoryItem = []
  addDiscountForm: FormGroup;
  parentId = ''
  imageFile: any;
  previewImage: any;
  submitted: boolean;
  selectedProduct: any;
  categoryDropDownSettings: IDropdownSettings = {};
  subcategoryDropDownSettings: IDropdownSettings = {};
  vendorDropDownSettings: IDropdownSettings = {};
  productDropDownSettings: IDropdownSettings = {};
  singleCategorySelection: boolean;
  singleSubCategorySelection: boolean;
  singleVendorSelection: boolean;
  singleProductSelection: boolean;
  selectedSubcategoryItem: any;
  selectedVendorItem: any;
  selectedProductItem: any;
  userDetails: any;
  sellerId: string;
  imageNotAccepted: boolean = true
  tempArray: any[];
  images: any = [];
  progress: boolean;
  geofenceList: any;


  constructor(private router: Router, private apiService: ApiService, private fb: FormBuilder, private commonService: CommonService) {

    this.userDetails = JSON.parse(sessionStorage.getItem('Markat_User'))


  }

  showMultiCategory: boolean = false


  setradio(e: string) {

    this.singleCategorySelection = true;
    this.singleSubCategorySelection = true;
    this.singleVendorSelection = true;
    this.singleProductSelection = true;
    switch (e) {
      case "category":
        this.singleCategorySelection = false;
        this.showCategory = true;
        this.showSubcategory = false;
        this.showVendor = false;
        this.showProduct = false
        console.log("category");
        break;
      case "subcategory":
        this.singleSubCategorySelection = false
        this.showCategory = true;
        this.showSubcategory = true;
        this.showVendor = false;
        this.showProduct = false
        console.log("subcategory");
        break;
      case "brand":
        this.singleVendorSelection = false
        this.showCategory = true;
        this.showSubcategory = true;
        this.showVendor = true;
        this.showProduct = false
        this.selectedCategory = '';
        this.selectedSubCategory = '';
        console.log("brand");
        break;
      case "product":
        this.singleProductSelection = false
        this.showCategory = true;
        this.showSubcategory = true;
        this.showVendor = true;
        this.showProduct = true
        this.selectedCategory = '';
        this.selectedSubCategory = '';
        console.log("product");
        break;
    }
  }


  // Receive user input and send to search method**
  onKeyInCategory(value) {
    // this.selectedItem = [];
    this.selectedCategory = this.searchCategory(value).toString();
  }

  onKeyInSubCategory(value) {
    // this.selectedItem = [];
    this.selectedSubCategory = this.searchSubcategory(value).toString();
  }
  onKeyInVendor(value) {
    // this.selectedItem = [];
    this.selectedBrand = this.searchVendor(value).toString();
  }
  onKeyInProduct(value) {
    //  this.selectedItem = [];
    this.selectedProduct = this.searchProduct(value).toString();
  }


  searchCategory(value: string) {
    let filter = value.toLowerCase();
    return this.categoryList.filter(option => option.toLowerCase().startsWith(filter));
  }
  searchSubcategory(value: string) {
    let filter = value.toLowerCase();
    return this.subCategoryList.filter(option => option.toLowerCase().startsWith(filter));
  }
  searchVendor(value: string) {
    let filter = value.toLowerCase();
    return this.vendorList.filter(option => option.toLowerCase().startsWith(filter));
  }
  searchProduct(value: string) {
    let filter = value.toLowerCase();
    return this.productList.filter(option => option.toLowerCase().startsWith(filter));
  }
  today
  endTommorow


  getAllGeofence() {
    let body = {
      page: 1,
      count: 999999999
    }

    this.apiService.getAllGeofence(body).subscribe(res => {

      if (res.success) {
        this.geofenceList = res.data
        console.log(this.geofenceList);
      }

    })
  }
  ngOnInit() {
    this.getAllGeofence()

    this.today = moment(new Date()).format('YYYY-MM-DD');
    let currentDate = new Date().getDate();
    let currentMonth = new Date().getMonth();
    let year = new Date().getFullYear();
    //console.log(new Date(year, currentMonth, currentDate + 1))


    this.addDiscountForm = this.fb.group({
      disount: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      type: ['', Validators.required],
      dicountOn: ['', Validators.required],
      name: ['', [Validators.required,]],
      availableLocation:['',Validators.required],
      name_ar: ['', Validators.required],
      gender: ['', Validators.required],
      bannerImage: ['',]
    })

    if (this.userDetails.roles == 'admin') {
      this.getAllCategoryForAdmin();
      this.sellerId = ''
    } else {
      this.getAllCategory();
      this.sellerId = this.userDetails._id
      //  this.setradio('product');
      this.addDiscountForm.get('dicountOn').setValue('product');

    }
    this.addDiscountForm.get('bannerImage').disable()

  }
  ngAfterViewChecked(): void {

    let done = moment(this.addDiscountForm.controls['startDate'].value)
    let today = done.date();
    let thisMonth = done.month();
    let thisYear = done.year()
    let temp = new Date(thisYear, thisMonth, today + 1)
    this.endTommorow = moment(temp).format('YYYY-MM-DD')

  }

  // addEvent(event: MatDatepickerInputEvent<Date>) {
  //   console.log(event)
  //   let temp = moment(event.value).toDate();
  //   let date = temp.getDate()
  //   let mindate = date + 1
  //   this.endTommorow = new Date(temp.getFullYear() + temp.getMonth() + mindate);
  //   console.log(this.endTommorow)
  // }


  ngAfterContentChecked() {


    this.categoryDropDownSettings = {

      singleSelection: this.singleCategorySelection,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    }

    this.subcategoryDropDownSettings = {

      singleSelection: this.singleSubCategorySelection,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    }

    this.vendorDropDownSettings = {

      singleSelection: this.singleVendorSelection,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    }

    this.productDropDownSettings = {

      singleSelection: this.singleProductSelection,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    }

  }
  async bannerImageEvent(event) {
    let tempfile: any
    let imageOk: boolean = true
    var img = new Image;
    let sefl = this
    if (event.target.files && event.target.files[0]) {
      tempfile = event.target.files[0];
      let name = event.target.files[0].name;
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        img.src = event.target.result;

        let temp = {
          name: name,
          image: event.target.result
        }
        img.onload = () => {
          debugger
          var height = img.height;
          var width = img.width;
          if (this.addDiscountForm.get('type').value == 'Home Banner') {
            if (width !== 1920 || height !== 1080) {
              this.commonService.errorToast("Image size should be 1920*1080");
              imageOk = false
              // this.pushImage();
              return imageOk
            } else {
              this.commonService.successToast("Image Size is Ok");
              imageOk = true
              this.previewImage = temp.image;
              this.images = tempfile
              return imageOk
            }
          }
          if (this.addDiscountForm.get('type').value == 'Home') {
            // width / height != 16 / 4
            if (height !== 360 || width != 1280) {
              this.commonService.errorToast("Image size should be 1280*360");
              imageOk = false
              // this.pushImage();
              return imageOk
            } else {
              this.commonService.successToast("Image Size is Ok");
              imageOk = true
              this.previewImage = temp.image;
              this.images = tempfile
              return imageOk
            }
          }
          if (this.addDiscountForm.get('type').value == 'Offer' || this.addDiscountForm.get('type').value == 'Popup') {
            if (height !== 360 || width !== 360) {
              this.commonService.errorToast("Image size should be a 360*360");
              imageOk = false
              // this.pushImage();
              return imageOk
            } else {
              this.commonService.successToast("Image Size is Ok");
              imageOk = true
              this.previewImage = temp.image;
              this.images = tempfile;

              return imageOk
            }
          }
        };

      };

    }






  }
  goToofferdeals() {
    this.router.navigate(['offerdeals'])
  }

  onCategorySelect(item: any) {
    console.log(item.id);

    const index = this.selectedCategoryItem.findIndex(o => o.id.toString() == item.id.toString());
    if (index < 0) this.selectedCategoryItem.push(item);

  }

  onSubcategorySelect(item: any) {

    const index = this.selectedSubcategoryItem.findIndex(o => o.id.toString() == item.id.toString());
    if (index < 0) this.selectedSubcategoryItem.push(item)
  }

  onVendorSelect(item: any) {

    const index = this.selectedVendorItem.findIndex(o => o.id.toString() == item.id.toString());
    if (index < 0) this.selectedVendorItem.push(item)
  }

  onProductSelect(item: any) {

    const index = this.selectedProductItem.findIndex(o => o.id.toString() == item.id.toString());
    if (index < 0) this.selectedProductItem.push(item)
  }
  onSelectAll(items: any) {

    console.log(items)
    for (let i = 0; i < items.length; i++) {
      this.selectedItem.push(items[i].id)
    }
  }
  type: Ready[] = [
    { value: 'Home Banner', viewValue: 'Home Banner' },
    { value: 'Home', viewValue: 'Banner' },
    { value: 'Offer', viewValue: 'Offer' },
    { value: 'Popup', viewValue: 'Pop-Up' },
    // { value: 'Deal Slider', viewValue: 'Deal Slider' }
  ];

  getAllCategoryForAdmin() {
    let temp = []
    this.categoryList = []

    this.apiService.getAllCategories().subscribe(res => {

      if (res.success) {

        console.log(res)
        if (res.data) {
          for (let i = 0; i < res.data.length; i++) {
            let body = {
              'id': res.data[i].id,
              'name': res.data[i].name
            }
            temp.push(body);

          }
          // this.addDiscountForm.controls['disount'].setValue('category');

          // this.setradio('category')
          // this.addDiscountForm.controls['disountOn'].setValue('category');
        }
      }
    });

    this.categoryList = temp;

  }

  getAllCategory() {

    let temp = []
    this.categoryList = []

    this.apiService.getAllCategoriesForPanel().subscribe(res => {

      if (res.success) {

        console.log("categoryList", res)
        if (res.data) {
          for (let i = 0; i < res.data.length; i++) {
            let body = {
              'id': res.data[i]._id,
              'name': res.data[i].name
            }
            temp.push(body);

          }

          this.setradio('product')

        }
      }
    });

    this.categoryList = temp;

  }


  selectedCategory = ''
  categorySelected(id) {

    console.log("category :", id);
    this.selectedCategory = id;
    this.getAllSubcategory(id);
  }

  getAllSubcategory(id) {

    let temp = []
    this.subCategoryList = []
    if (this.selectedCategory) {
      this.apiService.getAllSubCategoriesForDiscount(id).subscribe(res => {
        if (res.success) {

          console.log("subCategoryList", res)
          if (res.data) {

            for (let i = 0; i < res.data.length; i++) {
              let body = {
                'id': res.data[i].id,
                'name': res.data[i].name
              }
              temp.push(body)
            }

          }
        }
        this.subCategoryList = temp;
      });

    } else {
      this.commonService.errorToast("Please Select a category.");

    }

  }


  selectedSubCategory = ''
  subCategorySelected(id) {
    console.log("subcategory:", id)
    this.selectedSubCategory = id

    this.getAllVendor();

  }

  getAllVendor() {

    this.vendorList = []
    let temp = []
    if (this.selectedSubCategory) {


      this.apiService.getBrandListbyCat(this.selectedCategory, this.selectedSubCategory).subscribe(res => {

        if (res.success) {


          console.log("brnadlist", res)
          if (res.data) {
            for (let i = 0; i < res.data.length; i++) {
              let body = {
                'id': res.data[i]._id,
                'name': res.data[i].name

              }
              temp.push(body)
            }
          }

        }
        this.vendorList = temp
      });
    } else {
      this.commonService.errorToast("Please Select a sub category first")
    }
  }

  selectedBrand = ''
  vendorSelected(e) {

    console.log("vendor:", e)
    this.selectedBrand = e
    this.getAllProduct()
  }

  getAllProduct() {

    this.productList = [];
    let temp = []
    if (this.selectedSubCategory) {
      let body = {
        'categories': [this.selectedCategory],
        'subCategories': [this.selectedSubCategory],

      }

      this.apiService.getProductsforBanner(1, 10000, 'active', true, '', this.sellerId, this.selectedCategory, this.selectedSubCategory, this.selectedBrand).subscribe(res => {

        if (res.success) {
          console.log("ProductList", res);

          if (res.data) {
            for (let i = 0; i < res.data.length; i++) {
              let body = {
                'id': res.data[i].id,
                'name': res.data[i].name,

              }
              temp.push(body)
            }
          }
        }
        this.productList = temp
      });
    } else {
      this.commonService.errorToast("PLease select a vendor First")
    }

  }

  productSelected(id) {
    console.log("product:", id);
    this.selectedProduct = id;

  }

  typeSelected(e) {
    console.log(e);
    this.addDiscountForm.get('bannerImage').enable()

  }

  checkBanner() {

    this.submitted = true
    console.log(this.addDiscountForm);
    let checkOffer = this.addDiscountForm.controls['dicountOn'].value;
    if (checkOffer == "category") {

      if (this.submitted && this.addDiscountForm.valid) {
        if (this.selectedItem.length > 0) {
          this.typeCategory(checkOffer, this.selectedItem);
        } else {
          if (this.selectedCategoryItem.length > 0) {
            let selectedCategory = []
            for (let i = 0; i < this.selectedCategoryItem.length; i++) {
              selectedCategory.push(this.selectedCategoryItem[i].id)
            }
            this.typeCategory(checkOffer, selectedCategory);
          } else {
            this.commonService.errorToast("Please Select a Category ")
          }

        }
      }
    }

    if (checkOffer == 'subCategory') {
      if (this.submitted && this.addDiscountForm.valid) {

        if (this.selectedItem.length > 0) {
          this.typeSubcategory(checkOffer, this.selectedItem);
        } else {
          if (this.selectedCategoryItem.length > 0) {
            let selectedSubCategory = [];
            for (let i = 0; i < this.selectedSubcategoryItem.length; i++) {
              selectedSubCategory.push(this.selectedSubcategoryItem[i].id)
            }
            this.typeSubcategory(checkOffer, selectedSubCategory);
          } else {
            this.commonService.errorToast("Please Select a Sub-category ")
          }
        }
      }

    }
    if (checkOffer == 'brand') {
      if (this.submitted && this.addDiscountForm.valid) {
        if (this.selectedItem.length > 0) {
          this.typeVendor(checkOffer, this.selectedItem);
        } else {
          if (this.selectedVendorItem.length > 0) {
            let selectedVendor = [];
            for (let i = 0; i < this.selectedVendorItem.length; i++) {
              selectedVendor.push(this.selectedVendorItem[i].id)
            }

            this.typeVendor(checkOffer, selectedVendor);
          } else {
            this.commonService.errorToast("Please Select a Brand ")
          }
        }
      }

    }
    if (checkOffer == 'product') {
      if (this.submitted && this.addDiscountForm.valid) {
        if (this.selectedItem.length > 0) {
          this.typeProduct(checkOffer, this.selectedItem);
        } else {
          if (this.selectedProductItem.length > 0) {
            let selectedProduct = [];
            for (let i = 0; i < this.selectedProductItem.length; i++) {
              selectedProduct.push(this.selectedProductItem[i].id)
            }
            this.typeProduct(checkOffer, selectedProduct);
          } else {
            this.commonService.errorToast("Please Select a Product ")
          }
        }
      }

    }


  }


  typeCategory(checkOffer, selectedCategoryItem) {


    let startDate = moment(this.addDiscountForm.controls['startDate'].value).toLocaleString();
    let endDate = moment(this.addDiscountForm.controls['endDate'].value).toLocaleString()
    let offer = {
      'list': selectedCategoryItem, 'type': checkOffer
    }

    const body = new FormData();
    body.append('name', this.addDiscountForm.controls['name'].value);
    body.append('name_ar', this.addDiscountForm.controls['name_ar'].value);
    if (this.images) {
      body.append('image', new Blob([this.images], { type: 'image/*' }), this.images.name);
    }
    body.append('gender', JSON.stringify(this.addDiscountForm.controls['gender'].value));
    body.append('availableLocation', JSON.stringify(this.addDiscountForm.get('availableLocation').value))
    body.append('type', this.addDiscountForm.controls['type'].value);
    body.append('discount', this.addDiscountForm.controls['disount'].value);
    body.append('offer', JSON.stringify(offer));
    body.append('startDate', JSON.stringify(startDate));
    body.append('endDate', JSON.stringify(endDate))


    this.addbanner(body);
  }


  typeSubcategory(checkOffer, selectedSubcategoryItem) {

    let startDate = moment(this.addDiscountForm.controls['startDate'].value).toLocaleString();
    let endDate = moment(this.addDiscountForm.controls['endDate'].value).toLocaleString();
    let offer = {
      'list': selectedSubcategoryItem, 'type': checkOffer
    }

    const body = new FormData();
    body.append('category', this.selectedCategory)
    body.append('name', this.addDiscountForm.controls['name'].value);
    body.append('name_ar', this.addDiscountForm.controls['name_ar'].value);
    body.append('image', this.images, this.images.name);
    body.append('gender', JSON.stringify(this.addDiscountForm.controls['gender'].value));
    body.append('availableLocation', JSON.stringify(this.addDiscountForm.get('availableLocation').value))
    body.append('type', this.addDiscountForm.controls['type'].value);
    body.append('discount', this.addDiscountForm.controls['disount'].value);
    body.append('offer', JSON.stringify(offer));
    body.append('startDate', JSON.stringify(startDate));
    body.append('endDate', JSON.stringify(endDate));

    this.addbanner(body);
  }
  typeVendor(checkOffer, selectedVendorItem) { //vendor is reused as brand

    let startDate = moment(this.addDiscountForm.controls['startDate'].value).toLocaleString();
    let endDate = moment(this.addDiscountForm.controls['endDate'].value).toLocaleString();
    let offer = {
      'list': selectedVendorItem, 'type': 'brand'
    }

    const body = new FormData();
    body.append('category', this.selectedCategory);
    body.append('subCategory', this.selectedSubCategory);
    body.append('name', this.addDiscountForm.controls['name'].value);
    body.append('name_ar', this.addDiscountForm.controls['name_ar'].value);
    body.append('gender', JSON.stringify(this.addDiscountForm.controls['gender'].value));
    body.append('availableLocation', JSON.stringify(this.addDiscountForm.get('availableLocation').value))
    body.append('image', this.images, this.images.name);
    body.append('type', this.addDiscountForm.controls['type'].value);
    body.append('discount', this.addDiscountForm.controls['disount'].value);
    body.append('offer', JSON.stringify(offer));
    body.append('startDate', JSON.stringify(startDate));
    body.append('endDate', JSON.stringify(endDate));

    this.addbanner(body);
  }
  typeProduct(checkOffer, selectedItem) {


    let startDate = moment(this.addDiscountForm.controls['startDate'].value).toLocaleString();
    let endDate = moment(this.addDiscountForm.controls['endDate'].value).toLocaleString();
    let offer = {
      'list': selectedItem, 'type': checkOffer
    }

    const body = new FormData();
    body.append('category', this.selectedCategory);
    body.append('subCategory', this.selectedSubCategory);
    body.append('brand', this.selectedBrand);
    body.append('gender', JSON.stringify(this.addDiscountForm.controls['gender'].value));

    body.append('name', this.addDiscountForm.controls['name'].value);
    body.append('availableLocation', JSON.stringify(this.addDiscountForm.get('availableLocation').value))
    body.append('name_ar', this.addDiscountForm.controls['name_ar'].value);
    body.append('image', this.images, this.images.name);
    body.append('type', this.addDiscountForm.controls['type'].value);
    body.append('discount', this.addDiscountForm.controls['disount'].value);
    body.append('offer', JSON.stringify(offer));
    body.append('startDate', JSON.stringify(startDate));
    body.append('endDate', JSON.stringify(endDate));

    this.addbanner(body);
  }





  addbanner(body) {

    this.tempArray = []
    
    this.tempArray.push(body);
    //  console.log(body)
    body.forEach((value, key) => {
      console.log(key + " " + value)
    });
    this.progress = true
    this.apiService.addBanner(body).subscribe(res => {
      console.log(res)
      if (res.success) {
        this.progress = false
        this.router.navigateByUrl('offerdeals');

      } else {
        this.commonService.errorToast(res.message)
        this.progress = false
      }
    })


  }

}

