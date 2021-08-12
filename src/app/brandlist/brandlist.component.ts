import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/services/api.service';
import { CommonService } from 'src/services/common.service';
import Swal from 'sweetalert2';
import { UrlService } from 'src/services/url.service';

@Component({
  selector: 'app-brandlist',
  templateUrl: './brandlist.component.html',
  styleUrls: ['./brandlist.component.scss']
})
export class BrandlistComponent implements OnInit {
  length = 100;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = 10;
  page: number = 1
  addBrandForm: FormGroup;
  editBrandForm: FormGroup
  submitted: boolean
  brandList = []
  result: import("sweetalert2").SweetAlertResult<unknown>;
  editableBrandId: any;
  imageUrl: string;
  categoryList: any;
  subcategoryList: any;
  imageFile: any;
  id: any;
  flagImage: boolean;
  previewImage: any;
  brandImage: any;
  picUploader: boolean;
  progress: boolean;
  user: any;
  constructor(private apiService: ApiService, private fb: FormBuilder, private commonService: CommonService, private urlService: UrlService) {
    this.getBrandList()
    this.getCategoryList()
    this.imageUrl = this.urlService.imageUrl;
    this.user = JSON.parse(this.apiService.getUser())
  }

  ngOnInit() {
    this.addBrandForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(25)]],
      name_ar: ['', [Validators.required, Validators.maxLength(25)]],
      category: ['', [Validators.required, Validators.maxLength(25)]],
      subCategory: ['', [Validators.required, Validators.maxLength(25)]],
      image: ['', [Validators.required]],
    });
    this.editBrandForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(25)]],
      name_ar: ['', [Validators.required, Validators.maxLength(25)]],
      category: ['', [Validators.required, Validators.maxLength(25)]],
      subCategory: ['', [Validators.required, Validators.maxLength(25)]],
      image: ['',],
    })
  }

  getBrandList() {
    //Pagination is applied in the backend. just not using in the front end because of design same as category
    this.apiService.getApi(`admin/getAllBrand?page=${this.page}&count=${this.pageSize}`).subscribe(res => {
      if (res.success == true) {
        this.brandList = res.data
        this.length = res.total
      }
    })
  }

  getCategoryList() {
    this.apiService.getAllCategories().subscribe(res => {
      if (res.success == true) {
        this.categoryList = res.data
      }
    })
  }


  categorySelected(e) {

    // let id = e
    this.apiService.getSubcategoryList(e).subscribe(res => {
      if (res.success == true) {
        this.subcategoryList = res.data
      }
    })

  }





  async profilePic(event) {

    this.picUploader = true
    if (event.target.files && event.target.files[0]) {
      this.imageFile = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        if (this.id) {
          this.flagImage = true;
          this.previewImage = event.target.result;
          this.editBrandForm.controls['image'].setValue(this.imageFile);
        } else {
          this.brandImage = event.target.result;
          this.addBrandForm.controls['image'].setValue(this.imageFile);

        }

      };
    }
  }

  editBrand(id) {
    this.id = id

    this.apiService.viewBrand(id).subscribe((res) => {
      if (res.data) {
        this.flagImage = false;
        this.apiService.getSubcategoryList(res.data.category._id).subscribe(res => {
          if (res.success == true) {
            this.subcategoryList = res.data
          }
        })
        this.editableBrandId = res.data._id
        this.editBrandForm.controls['name'].setValue(res.data.name);

        this.editBrandForm.controls['name_ar'].setValue(res.data.name_ar);
        this.editBrandForm.controls['category'].setValue(res.data.category.id);

        this.editBrandForm.controls['subCategory'].setValue(res.data.subCategory.id);
        this.editBrandForm.controls['image'].setValue(res.data.image.name)

        let data = res.data
        //  this.image = data.image
        this.brandImage = data.image;
        //   this.imageName = data.image.name
        //  console.log(this.image);
      }
    })

  }

  deleteBrand(id) {

    // Swal.clickCancel();
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Brand!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085D6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      allowOutsideClick: false
    }).then(result => {
      if (result.value) {
        this.result = result;
        const data = {
          "id": id,
          "model": "Brand"
        }

        this.apiService.delete(data).subscribe(res => {
          if (res.success) {
            // this.getAllCategories()
            this.commonService.successToast(res.message);
            this.getBrandList()
          } else {
            this.commonService.errorToast(res.message)
          }

        });
      } else {
      }
    });

  }


  onAddBrand() {

    this.submitted = true
    if (this.submitted && this.addBrandForm.valid) {
      let body = this.addBrandForm.value

      let formData = new FormData();
      formData.append('name', this.addBrandForm.get('name').value);
      formData.append('name_ar', this.addBrandForm.get('name_ar').value);
      formData.append('category', this.addBrandForm.get('category').value);
      formData.append('subCategory', this.addBrandForm.get('subCategory').value);
      formData.append('image', this.imageFile, this.imageFile.name);
      this.progress = true
      this.apiService.addBrand(formData).subscribe(res => {
        if (res.success == true) {
          this.progress = false
          this.commonService.successToast('SuccessFully Added')
          this.getBrandList()
          this.addBrandForm.reset();
          this.imageFile = ''
          this.submitted = false
        } else {
          this.progress = false
          this.commonService.errorToast(res.message)
          this.submitted = false
        }
      })
    }

  }

  cancelClicked() {
    this.addBrandForm.reset();
    this.editBrandForm.reset();
    this.imageFile = ''
    this.brandImage = ''

  }

  onUpdateBrand() {

    this.submitted = true
    if (this.submitted && this.editBrandForm.valid) {
      let formData = new FormData();
      formData.append('id', this.editableBrandId)
      formData.append('name', this.editBrandForm.get('name').value);
      formData.append('name_ar', this.editBrandForm.get('name_ar').value);
      formData.append('category', this.editBrandForm.get('category').value);
      formData.append('subCategory', this.editBrandForm.get('subCategory').value);
      if (this.imageFile) {
        formData.append('image', this.imageFile, this.imageFile.name);
      }
      this.progress = true
      this.apiService.editBrand(formData).subscribe(res => {
        if (res.success == true) {
          this.progress = false
          this.commonService.successToast('SuccessFully Edited')
          this.getBrandList()
          this.submitted = false
        } else {
          this.progress = false
          this.commonService.errorToast(res.message)
          this.submitted = false
        }
      })
    }

  }

  UserListAfterPageSizeChanged(e): any {
    if (e.pageIndex == 0) {
      this.page = 1;
      this.pageSize = e.pageSize
    } else {
      if (e.previousPageIndex < e.pageIndex) {
        this.page = e.pageIndex + 1;
        this.pageSize = e.pageSize
      } else {
        this.page = e.pageIndex;
        this.pageSize = e.pageSize
      }
   }
    this.getBrandList();
  }

  back() {
    window.history.back()
  }
}
