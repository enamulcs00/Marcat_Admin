import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CommonService } from 'src/services/common.service';
import Swal from "sweetalert2";
import { UrlService } from 'src/services/url.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categories: any;
  imageFile: any;
  addCategoryForm: FormGroup;
  editCategoryForm: FormGroup;
  addSubcategoryForm: FormGroup;
  editSubcategoryForm: FormGroup
  categoryImage: any;
  subCategoryImage: any;
  submitted: any;
  id: any;
  image: any;
  imageUrl: any
  flagImage: boolean;
  previewImage: any;
  page: number = 1
  count: number = 100
  subCatId: any;
  progress: boolean;
  user: any;




  constructor(private router: Router,
    private apiService: ApiService,
    private commonService: CommonService,
    private formBuilder: FormBuilder, private serverUrl: UrlService) {
    this.imageUrl = this.serverUrl.imageUrl
    this.user = JSON.parse(this.apiService.getUser())
    this.getAllCategories();
  }

  ngOnInit() {
    this.addCategoryForm = this.formBuilder.group({
      name: new FormControl("", [Validators.required, Validators.maxLength(20),]),
      name_ar: new FormControl("", [Validators.required, Validators.maxLength(20)]),
      commission: new FormControl("", [Validators.required, Validators.maxLength(20)]),
      image: new FormControl("", [Validators.required]),
    });
    this.editCategoryForm = this.formBuilder.group({
      name: new FormControl("", [Validators.required, Validators.maxLength(20),]),
      name_ar: new FormControl("", [Validators.required, Validators.maxLength(20)]),
      commission: new FormControl("", [Validators.required, Validators.maxLength(20)]),
      image: new FormControl(""),
    });
    this.addSubcategoryForm = this.formBuilder.group({
      name: new FormControl("", [Validators.required, Validators.maxLength(20),]),
      name_ar: new FormControl("", [Validators.required, Validators.maxLength(20)]),
      image: new FormControl("", [Validators.required]),
    });
    this.editSubcategoryForm = this.formBuilder.group({
      name: new FormControl("", [Validators.required, Validators.maxLength(20),]),
      name_ar: new FormControl("", [Validators.required, Validators.maxLength(20)]),
      image: new FormControl(""),
    });
  }
  getAllCategories() {
    this.apiService.getAllCategories().subscribe(res => {
      this.categories = res.data;
      this.submitted = false;
    })
  }

  goToaddcategory() {
    this.router.navigate(['addcategory'])
  }
  goToviewcategory() {
    this.router.navigate(['viewcategory'])
  }
  goToeditcategory() {
    this.router.navigate(['editcategory'])
  }

  picUploader: boolean;
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
          this.editCategoryForm.controls['image'].setValue(this.imageFile);
        } else {
          this.categoryImage = event.target.result;
          this.addCategoryForm.controls['image'].setValue(this.categoryImage);

        }

      };
    }
  }
  async subCategoryPic(event) {
    if (event.target.files && event.target.files[0]) {
      this.imageFile = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {

        this.subCategoryImage = event.target.result;
        this.addSubcategoryForm.controls['image'].patchValue(this.imageFile);
      };

    }
  }
  onAddCategory() {
    this.submitted = true;
    if (this.submitted && this.addCategoryForm.valid) {
      const data = new FormData();
      data.append('name', this.addCategoryForm.get('name').value);
      data.append('name_ar', this.addCategoryForm.get('name_ar').value);
      data.append('commission', this.addCategoryForm.get('commission').value);
      data.append('image', this.imageFile, this.imageFile.name);
      this.progress = true
      this.apiService.addCategory(data).subscribe(res => {
        if (res.success) {
          this.progress = false
          this.getAllCategories();
          this.commonService.successToast("Category added successfully");
          this.submitted = false;
          this.addCategoryForm.reset();
          this.imageFile = null;

          this.categoryImage = null



        } else {
          this.progress = false
          this.commonService.errorToast(res.message)
        }
      });
    } else {
      this.submitted = false
    }
  }

  onUpdateCategory() {
    this.submitted = true;
    if (this.submitted && this.editCategoryForm.valid) {
      const data = new FormData();
      data.append('id', this.id)
      data.append('name', this.editCategoryForm.get('name').value);
      data.append('name_ar', this.editCategoryForm.get('name_ar').value);
      data.append('commission', this.editCategoryForm.get('commission').value);
      if (this.picUploader == true) {
        data.append('image', this.imageFile, this.imageFile.name);

      }
    
      this.progress = true
      this.apiService.editCategory(data).subscribe(res => {
        if (res.success) {
          this.progress = false
          this.previewImage = null
          this.getAllCategories();
          this.commonService.successToast(res.message);
          this.submitted = false;
          this.editCategoryForm.reset();
          this.image = null;

          this.imageFile = null
        } else {
          this.progress = false
          this.commonService.errorToast(res.message)
        }
      });
    }
  }

  onAddSubCategory() {
    this.submitted = true;
    if (this.submitted && this.addSubcategoryForm.valid) {
      const data = new FormData();
      data.append('parentId', this.id)
      data.append('name', this.addSubcategoryForm.get('name').value);
      data.append('name_ar', this.addSubcategoryForm.get('name_ar').value);
      data.append('image', this.imageFile, this.imageFile.name);
      this.progress = true
      this.apiService.addSubCategory(data).subscribe(res => {
        if (res.success) {
          this.progress = false
          this.getAllCategories();
          this.commonService.successToast(res.message);
          this.submitted = false;
          this.addSubcategoryForm.reset();
          this.imageFile = null;
          this.subCategoryImage = null

        } else {
          this.progress = false
          this.commonService.errorToast(res.message)

        }
      });
    }
    else {
      this.submitted = false
    }
  }

  imageName: string

  viewCategory(id) {
    this.picUploader = false

    this.apiService.viewCategory(id).subscribe((res) => {
      if (res.data) {
        this.flagImage = false;
        this.editCategoryForm.controls['name'].setValue(res.data.name);

        this.editCategoryForm.controls['name_ar'].setValue(res.data.name_ar);
        this.editCategoryForm.controls['commission'].patchValue(res.data.commission)

        let data = res.data
        this.image = data.image
        this.imageFile = data.image;
        this.imageName = data.image.name

      }
    })

  }
  editCategory(id) {
    this.id = id;
    this.viewCategory(id);

  }

  result: any

  deleteCategory(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Category!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085D6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",

      allowOutsideClick: true
    }).then(result => {
      if (result.value) {
        this.result = result;
        const data = {
          "id": id,
          "model": "Category"
        }

        this.apiService.delete(data).subscribe(res => {
          if (res.success) {
            this.getAllCategories()
            this.commonService.successToast(res.message);

          } else {
            this.commonService.errorToast(res.message)
          }

        });


      } else {
        console.warn("cancelled");
      }
    });
  }

  cancelClicked() {
    this.addCategoryForm.reset()
  }

  deleteSubcategory(id) {
    Swal.clickCancel();
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Subcategory!",
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
          "model": "Category"
        }



        this.apiService.delete(data).subscribe(res => {
          if (res.success) {
            this.getAllCategories()
            this.commonService.successToast(res.message);

          } else {
            this.commonService.errorToast(res.message)
          }

        });

      } else {
        console.warn("cancelled");
      }
    });
  }



  deleteFromList(i) {

    this.getAllCategories()
    this.commonService.successToast("Cateogry Deleted");


  }


  onAddSubCategoryBtn(id) {
    this.id = id;
  }

  editSubCategory(id) {
    // alert(id);
    this.subCatId = id
    this.viewSubCategory(id);
  }

  viewSubCategory(id) {
    this.picUploader = false

    this.apiService.viewCategory(id).subscribe((res) => {
      if (res.data) {
        this.flagImage = false;
        this.editSubcategoryForm.controls['name'].setValue(res.data.name);

        this.editSubcategoryForm.controls['name_ar'].setValue(res.data.name_ar);
        let data = res.data
        this.image = data.image
        this.imageFile = data.image;
        this.imageName = data.image.name

      }
    })

  }



  updateSubcategory() {



    this.submitted = true;
    if (this.submitted && this.editSubcategoryForm.valid) {
      const data = new FormData();
      data.append('id', this.subCatId)
      data.append('name', this.editSubcategoryForm.get('name').value);
      data.append('name_ar', this.editSubcategoryForm.get('name_ar').value);
      if (this.picUploader == true) {
        data.append('image', this.imageFile, this.imageFile.name);

      }
      // console.log(" form data");
      // data.forEach((value, key) => {
      //   console.log(key + " " + value)
      // });
      this.progress = true
      this.apiService.editCategory(data).subscribe(res => {
        if (res.success) {
          this.progress = false
          this.previewImage = null
          this.getAllCategories();
          this.commonService.successToast(res.message);
          this.submitted = false;
          this.editSubcategoryForm.reset();
          this.image = null;

          this.imageFile = null
        } else {
          this.progress = false
          this.commonService.errorToast(res.message)
        }
      });
    }
  }



  back() {
    window.history.back()
  }

}
