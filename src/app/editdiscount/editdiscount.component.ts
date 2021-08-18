import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import * as moment from "moment";

import { IDropdownSettings } from "ng-multiselect-dropdown";
import { ApiService } from "src/services/api.service";
import { CommonService } from "src/services/common.service";
import { UrlService } from "src/services/url.service";

interface Ready {
	value: string;
	viewValue: string;
}
@Component({
	selector: "app-editdiscount",
	templateUrl: "./editdiscount.component.html",
	styleUrls: ["./editdiscount.component.scss"],
})
export class EditdiscountComponent implements OnInit {
	showCategory: boolean = false;
	showSubcategory: boolean;
	showVendor: boolean;
	showProduct: boolean;
	categoryList = [];
	subCategoryList = [];
	vendorList = [];
	productList = [];
	selectedItem = [];
	selectedCategoryItem = [];
	editDiscountForm: FormGroup;
	parentId = "";
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
	imageNotAccepted: boolean = true;
	tempArray: any[];
	images: any = "";
	sub: any;
	id: any;
	discountDetails: any;
	imageUrl: string;
	urlImage: boolean;
	progress: boolean;
	geofenceList: any;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private apiService: ApiService,
		private fb: FormBuilder,
		private urlService: UrlService,
		private commonService: CommonService
	) {
		this.userDetails = JSON.parse(sessionStorage.getItem("Markat_User"));
		this.imageUrl = this.urlService.imageUrl;
	}

	showMultiCategory: boolean = false;

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
				this.showProduct = false;
				console.log("category");
				break;
			case "subcategory":
				this.singleSubCategorySelection = false;
				this.showCategory = true;
				this.showSubcategory = true;
				this.showVendor = false;
				this.showProduct = false;
				console.log("subcategory");
				break;
			case "brand":
				this.singleVendorSelection = false;
				this.showCategory = true;
				this.showSubcategory = true;
				this.showVendor = true;
				this.showProduct = false;
				// this.selectedCategory = '';
				// this.selectedSubCategory = '';
				// console.log("brand");
				break;
			case "product":
				this.singleProductSelection = false;
				this.showCategory = true;
				this.showSubcategory = true;
				this.showVendor = true;
				this.showProduct = true;
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
		return this.categoryList.filter((option) =>
			option.toLowerCase().startsWith(filter)
		);
	}
	searchSubcategory(value: string) {
		let filter = value.toLowerCase();
		return this.subCategoryList.filter((option) =>
			option.toLowerCase().startsWith(filter)
		);
	}
	searchVendor(value: string) {
		let filter = value.toLowerCase();
		return this.vendorList.filter((option) =>
			option.toLowerCase().startsWith(filter)
		);
	}
	searchProduct(value: string) {
		let filter = value.toLowerCase();
		return this.productList.filter((option) =>
			option.toLowerCase().startsWith(filter)
		);
	}
	today;
	endTommorow;

	ngOnInit() {
		this.sub = this.route.queryParams.subscribe((params) => {
			// Defaults to 0 if no query param provided.
			this.id = params["id"];
		});

		this.today = moment(new Date()).format("YYYY-MM-DD");
		// let currentDate = new Date().getDate();
		// let currentMonth = new Date().getMonth();
		// let year = new Date().getFullYear();
		// //console.log(new Date(year, currentMonth, currentDate + 1))

		// this.endTommorow = moment(new Date(year, currentMonth, currentDate + 1)).format('YYYY-MM-DD');

		this.editDiscountForm = this.fb.group({
			disount: ["", [Validators.required, Validators.min(0)]],
			startDate: ["", Validators.required],
			endDate: ["", Validators.required],
			type: ["", Validators.required],
			dicountOn: [""],
			name: ["", [Validators.required, Validators.maxLength(25)]],
			availableLocation: ["", Validators.required],
			name_ar: [""],
			gender: ["", Validators.required],
			bannerImage: [""],
		});

		if (this.userDetails.roles == "admin") {
			this.getAllCategoryForAdmin();
			this.sellerId = "";
		} else {
			this.getAllCategory();
			this.sellerId = this.userDetails._id;
			//  this.setradio('product');
			this.editDiscountForm.get("dicountOn").setValue("product");
		}
		this.getAllGeofence();
		this.editDiscountForm.get("bannerImage").disable();

		this.categoryDropDownSettings = {
			singleSelection: this.singleCategorySelection,
			idField: "id",
			textField: "name",
			selectAllText: "Select All",
			unSelectAllText: "UnSelect All",
			itemsShowLimit: 10,
			allowSearchFilter: true,
		};

		this.subcategoryDropDownSettings = {
			singleSelection: this.singleSubCategorySelection,
			idField: "id",
			textField: "name",
			selectAllText: "Select All",
			unSelectAllText: "UnSelect All",
			itemsShowLimit: 10,
			allowSearchFilter: true,
		};

		this.vendorDropDownSettings = {
			singleSelection: this.singleVendorSelection,
			idField: "id",
			textField: "name",
			selectAllText: "Select All",
			unSelectAllText: "UnSelect All",
			itemsShowLimit: 10,
			allowSearchFilter: true,
		};

		this.productDropDownSettings = {
			singleSelection: this.singleProductSelection,
			idField: "id",
			textField: "name",
			selectAllText: "Select All",
			unSelectAllText: "UnSelect All",
			itemsShowLimit: 10,
			allowSearchFilter: true,
		};
	}

	getAllGeofence() {
		let body = {
			page: 1,
			count: 999999999,
		};

		this.apiService.getAllGeofence(body).subscribe((res) => {
			if (res.success) {
				this.geofenceList = res.data;
				console.log(this.geofenceList);
			}
		});
	}

	getDiscount() {
		let id = this.id;
		this.apiService.getDisountDetails(id).subscribe((res) => {
			if (res.success) {
				this.discountDetails = res.data;
				console.log(this.discountDetails);
				// this.editDiscountForm.controls['dicountOn'].setValue(this.discountDetails.onModel);
				if (this.discountDetails.offer.type === "category") {
					let lookForCategory = [];
					for (let i = 0; i < this.discountDetails.offer.list.length; i++) {
						lookForCategory.push(this.discountDetails.offer.list[i].id);
					}

					this.lookUpForCategory(lookForCategory);
				}
				if (this.discountDetails.offer.type === "subCategory") {
					let lookForSubCategory = [];
					for (let i = 0; i < this.discountDetails.offer.list.length; i++) {
						lookForSubCategory.push(this.discountDetails.offer.list[i].id);
					}
					this.lookUpForSubCategory(
						lookForSubCategory,
						this.discountDetails.category
					);
				}
				if (this.discountDetails.offer.type === "brand") {
					let lookForVendor = [];
					for (let i = 0; i < this.discountDetails.offer.list.length; i++) {
						lookForVendor.push(this.discountDetails.offer.list[i]._id);
					}

					this.lookUpForVendor(
						lookForVendor,
						this.discountDetails.subCategory.id,
						this.discountDetails.category.id
					);
				}
				if (this.discountDetails.offer.type === "product") {
					let lookForProduct = [];
					for (let i = 0; i < this.discountDetails.offer.list.length; i++) {
						lookForProduct.push(this.discountDetails.offer.list[i].id);
					}
					this.lookUpForProduct(
						lookForProduct,
						this.discountDetails.subCategory.id,
						this.discountDetails.category.id,
						this.discountDetails.brand._id
					);
				}

				this.editDiscountForm.controls["endDate"].setValue(
					moment(this.discountDetails.endDate).format("YYYY-MM-DD")
				);
				this.editDiscountForm.controls["type"].setValue(
					this.discountDetails.type
				);
				this.imageNotAccepted = false;
				this.editDiscountForm.get("bannerImage").enable();

				this.editDiscountForm.controls["startDate"].setValue(
					moment(this.discountDetails.startDate).format("YYYY-MM-DD")
				);
				this.editDiscountForm.controls["disount"].setValue(
					this.discountDetails.discount
				);
				this.editDiscountForm.controls["availableLocation"].setValue(
					this.discountDetails.availableLocation
				);

				this.editDiscountForm.controls["name_ar"].setValue(
					this.discountDetails.name_ar
				);
				this.editDiscountForm.controls["name"].setValue(
					this.discountDetails.name
				);
				this.editDiscountForm.controls["gender"].setValue(
					this.discountDetails.gender
				);

				this.editDiscountForm.controls["dicountOn"].setValue(
					this.discountDetails.offer.type
				);
				// this.editDiscountForm.controls['dicountOn'].setValue(this.discountDetails.onModel);
				this.setradio(this.discountDetails.offer.type);
				this.urlImage = true;
				this.previewImage = this.discountDetails.image;
				this.imageFile = this.discountDetails.image;
			}
		});
	}
	typeSelected(e) {
		console.log(e);
		this.editDiscountForm.get("bannerImage").enable();
		//  this.previewImage = ''
		this.urlImage = false;
	}

	lookUpForCategory(selectedList) {
		console.log(selectedList);
		let temp = [];

		for (let i = 0; i < this.categoryList.length; i++) {
			for (let j = 0; j < selectedList.length; j++) {
				if (selectedList[j] === this.categoryList[i].id) {
					let body = {
						id: this.categoryList[i].id,
						name: this.categoryList[i].name,
					};
					temp.push(body);
				}
			}
		}
		this.selectedCategoryItem = temp;
	}

	categoryId: any;
	selectedSubcategoryList: any;
	lookUpForSubCategory(ls, la) {
		this.selectedSubcategoryList = ls;
		if (la) {
			this.categoryId = la.id;
			this.selectedCategory = this.categoryId;
		}

		this.getAllSubcategory(this.categoryId);
	}
	subCategoryId: any;
	selectedVendorList: any;
	lookUpForVendor(ls, subcategoryId, categoryId) {
		console.log(ls);
		this.selectedVendorList = ls;
		this.categoryId = categoryId;
		this.subCategoryId = subcategoryId;
		this.selectedCategory = this.categoryId;
		this.selectedSubCategory = subcategoryId;

		this.getAllSubcategory(this.categoryId);
		this.getAllVendor();
	}
	selectedProductList: any;
	lookUpForProduct(ls, subcategoryId, categoryId, brandId) {
		console.log(ls);
		this.selectedProductList = ls;
		this.selectedCategory = categoryId;
		this.selectedSubCategory = subcategoryId;
		this.selectedBrand = brandId;
		this.getAllSubcategory(categoryId);
		this.getAllVendor();
		this.getAllProduct();
		// this.selectedCategory = categoryId;
		// this.selectedSubCategory = subcategoryId;
	}

	ngAfterViewChecked(): void {
		let done = moment(this.editDiscountForm.controls["startDate"].value);
		let today = done.date();
		let thisMonth = done.month();
		let thisYear = done.year();
		let temp = new Date(thisYear, thisMonth, today + 1);
		this.endTommorow = moment(temp).format("YYYY-MM-DD");
	}

	ngAfterContentChecked() {
		this.categoryDropDownSettings = {
			singleSelection: this.singleCategorySelection,
			idField: "id",
			textField: "name",
			selectAllText: "Select All",
			unSelectAllText: "UnSelect All",
			itemsShowLimit: 10,
			allowSearchFilter: true,
		};

		this.subcategoryDropDownSettings = {
			singleSelection: this.singleSubCategorySelection,
			idField: "id",
			textField: "name",
			selectAllText: "Select All",
			unSelectAllText: "UnSelect All",
			itemsShowLimit: 10,
			allowSearchFilter: true,
		};

		this.vendorDropDownSettings = {
			singleSelection: this.singleVendorSelection,
			idField: "id",
			textField: "name",
			selectAllText: "Select All",
			unSelectAllText: "UnSelect All",
			itemsShowLimit: 10,
			allowSearchFilter: true,
		};

		this.productDropDownSettings = {
			singleSelection: this.singleProductSelection,
			idField: "id",
			textField: "name",
			selectAllText: "Select All",
			unSelectAllText: "UnSelect All",
			itemsShowLimit: 10,
			allowSearchFilter: true,
		};
	}
	async bannerImageEvent(event) {
		this.urlImage = false;
		let tempfile: any;
		let imageOk: boolean = true;
		var img = new Image();
		let sefl = this;
		if (event.target.files && event.target.files[0]) {
			tempfile = event.target.files[0];
			let name = event.target.files[0].name;
			var reader = new FileReader();
			reader.readAsDataURL(event.target.files[0]);
			reader.onload = (event: any) => {
				img.src = event.target.result;

				let temp = {
					name: name,
					image: event.target.result,
				};
				img.onload = () => {
					var height = img.height;
					var width = img.width;
					if (this.editDiscountForm.get("type").value == "Home Banner") {
						if (width !== 1920 || height !== 1080) {
							this.commonService.errorToast("Image size should be 1920*1080");
							imageOk = false;
							// this.pushImage();
							return imageOk;
						} else {
							this.commonService.successToast("Image Size is Ok");
							imageOk = true;
							this.previewImage = temp.image;
							this.images = tempfile;
							return imageOk;
						}
					}
					if (this.editDiscountForm.get("type").value == "Home") {
						// width / height != 16 / 4
						if (height !== 360 || width != 1280) {
							this.commonService.errorToast("Image size should be 1280*360");
							imageOk = false;
							// this.pushImage();
							return imageOk;
						} else {
							this.commonService.successToast("Image Size is Ok");
							imageOk = true;
							this.previewImage = temp.image;
							this.images = tempfile;
							return imageOk;
						}
					}
					if (
						this.editDiscountForm.get("type").value == "Offer" ||
						this.editDiscountForm.get("type").value == "Popup"
					) {
						if (height !== 360 || width !== 360) {
							this.commonService.errorToast("Image size should be a 360*360");
							imageOk = false;
							// this.pushImage();
							return imageOk;
						} else {
							this.commonService.successToast("Image Size is Ok");
							imageOk = true;
							this.previewImage = temp.image;
							this.images = tempfile;

							return imageOk;
						}
					}
				};
			};
		}
	}
	goToofferdeals() {
		this.router.navigate(["offerdeals"]);
	}

	onCategorySelect(item: any) {
		console.log(item.id);

		const index = this.selectedCategoryItem.findIndex(
			(o) => o.id.toString() == item.id.toString()
		);
		if (index < 0) this.selectedCategoryItem.push(item);
	}

	onSubcategorySelect(item: any) {
		const index = this.selectedSubcategoryItem.findIndex(
			(o) => o.id.toString() == item.id.toString()
		);
		if (index < 0) this.selectedSubcategoryItem.push(item);
	}

	onVendorSelect(item: any) {
		const index = this.selectedVendorItem.findIndex(
			(o) => o.id.toString() == item.id.toString()
		);
		if (index < 0) this.selectedVendorItem.push(item);
	}

	onProductSelect(item: any) {
		const index = this.selectedProductItem.findIndex(
			(o) => o.id.toString() == item.id.toString()
		);
		if (index < 0) this.selectedProductItem.push(item);
	}

	onSelectAll(items: any) {
		console.log("selectedAll", items);
		for (let i = 0; i < items.length; i++) {
			this.selectedItem.push(items[i].id);
		}
	}
	type: Ready[] = [
		{ value: "Home Banner", viewValue: "Home Banner" },
		{ value: "Home", viewValue: "Banner" },
		{ value: "Offer", viewValue: "Offer" },
		{ value: "Popup", viewValue: "Pop-Up" },

		// { value: 'Deal', viewValue: 'Deal' },
		// { value: 'Deal Slider', viewValue: 'Deal Slider' }
	];

	getAllCategoryForAdmin() {
		let temp = [];
		this.categoryList = [];

		this.apiService.getAllCategories().subscribe((res) => {
			if (res.success) {
				console.log(res);
				if (res.data) {
					for (let i = 0; i < res.data.length; i++) {
						let body = {
							id: res.data[i].id,
							name: res.data[i].name,
						};
						temp.push(body);
					}
					// this.editDiscountForm.controls['disount'].setValue('category');
					this.categoryList = temp;
					// this.setradio('category')
					this.getDiscount();
					// this.editDiscountForm.controls['disountOn'].setValue('category');
				}
			}
		});
	}

	getAllCategory() {
		let temp = [];
		this.categoryList = [];

		this.apiService.getAllCategoriesForPanel().subscribe((res) => {
			if (res.success) {
				console.log("categoryList", res);
				if (res.data) {
					for (let i = 0; i < res.data.length; i++) {
						let body = {
							id: res.data[i]._id,
							name: res.data[i].name,
						};
						temp.push(body);
					}

					this.setradio("product");
				}
			}
		});

		this.categoryList = temp;
		this.getDiscount();
	}

	selectedCategory: any = "";
	categorySelected(id) {
		console.log("category :", id);
		this.selectedCategory = id;
		this.getAllSubcategory(id);
	}

	getAllSubcategory(id) {
		let temp = [];
		this.subCategoryList = [];
		if (this.selectedCategory) {
			this.apiService.getAllSubCategoriesForDiscount(id).subscribe((res) => {
				if (res.success) {
					console.log("subCategoryList", res);
					if (res.data) {
						for (let i = 0; i < res.data.length; i++) {
							let body = {
								id: res.data[i].id,
								name: res.data[i].name,
							};
							temp.push(body);
						}
					}
				}
				this.subCategoryList = temp;
				if (this.categoryId) {
					let temp1 = [];

					for (let i = 0; i < this.subCategoryList.length; i++) {
						for (let j = 0; j < this.selectedSubcategoryList.length; j++) {
							if (
								this.selectedSubcategoryList[j] === this.subCategoryList[i].id
							) {
								let body = {
									id: this.subCategoryList[i].id,
									name: this.subCategoryList[i].name,
								};
								temp1.push(body);
							}
						}
					}
					this.selectedSubcategoryItem = temp1;
				}
			});
		} else {
			this.commonService.errorToast("Please Select a category.");
		}
	}

	selectedSubCategory = "";
	subCategorySelected(id) {
		console.log("subcategory:", id);
		this.selectedSubCategory = id;

		this.getAllVendor();
	}

	getAllVendor() {
		this.vendorList = [];
		let temp = [];
		if (this.selectedSubCategory) {
			this.apiService
				.getBrandListbyCat(this.selectedCategory, this.selectedSubCategory)
				.subscribe((res) => {
					if (res.success) {
						console.log("brnadlist", res);
						if (res.data) {
							for (let i = 0; i < res.data.length; i++) {
								let body = {
									id: res.data[i]._id,
									name: res.data[i].name,
								};
								temp.push(body);
							}
						}
					}
					this.vendorList = temp;
					if (this.subCategoryId) {
						let temp1 = [];

						for (let i = 0; i < this.vendorList.length; i++) {
							for (let j = 0; j < this.selectedVendorList.length; j++) {
								if (this.selectedVendorList[j] === this.vendorList[i].id) {
									let body = {
										id: this.vendorList[i].id,
										name: this.vendorList[i].name,
									};
									temp1.push(body);
								}
							}
						}
						this.selectedVendorItem = temp1;
					}
				});
		} else {
			this.commonService.errorToast("Please Select a sub category first");
		}
	}

	selectedBrand = "";
	vendorSelected(e) {
		console.log("vendor:", e);
		this.selectedBrand = e;
		this.getAllProduct();
	}

	getAllProduct() {
		this.productList = [];
		let temp = [];
		if (this.selectedSubCategory) {
			let body = {
				categories: [this.selectedCategory],
				subCategories: [this.selectedSubCategory],
			};
			this.apiService
				.getProductsforBanner(
					1,
					10000,
					"active",
					true,
					"",
					this.sellerId,
					this.selectedCategory,
					this.selectedSubCategory,
					this.selectedBrand
				)
				.subscribe((res) => {
					if (res.success) {
						console.log("ProductList", res);

						if (res.data) {
							for (let i = 0; i < res.data.length; i++) {
								let body = {
									id: res.data[i].id,
									name: res.data[i].name,
								};
								temp.push(body);
							}
						}
					}
					this.productList = temp;
					if (this.selectedBrand) {
						let temp1 = [];

						for (let i = 0; i < this.productList.length; i++) {
							for (let j = 0; j < this.selectedProductList.length; j++) {
								if (this.selectedProductList[j] === this.productList[i].id) {
									let body = {
										id: this.productList[i].id,
										name: this.productList[i].name,
									};
									temp1.push(body);
								}
							}
						}
						this.selectedProductItem = temp1;
					}
				});
		} else {
			this.commonService.errorToast("PLease select a vendor First");
		}
	}

	productSelected(id) {
		console.log("product:", id);
		this.selectedProduct = id;
	}

	checkBanner() {
		console.clear();
		this.submitted = true;
		let checkOffer = this.editDiscountForm.controls["dicountOn"].value;
		console.log("Type", checkOffer);
		if (checkOffer == "category") {
			if (this.submitted && this.editDiscountForm.valid) {
				if (this.selectedItem.length > 0) {
					console.log("selectedItem", this.selectedItem);
					this.typeCategory(checkOffer, this.selectedItem);
				} else {
					console.log("selectedItem",this.selectedCategoryItem);
					if (this.selectedCategoryItem.length > 0) {
						let selectedCategory = [];
						for (let i = 0; i < this.selectedCategoryItem.length; i++) {
							selectedCategory.push(this.selectedCategoryItem[i].id);
						}
						this.typeCategory(checkOffer, selectedCategory);
					} else {
						this.commonService.errorToast("Please Select a category ");
					}
				}
			}
		}

		if (checkOffer == "subCategory") {
			if (this.submitted && this.editDiscountForm.valid) {
				if (this.selectedItem.length > 0) {
					console.log("selectedItem", this.selectedItem);
					this.typeSubcategory(checkOffer, this.selectedItem);
				} else {
					let selectedSubCategory = [];
					console.log("selectedItem",this.selectedSubcategoryItem);
					for (let i = 0; i < this.selectedSubcategoryItem.length; i++) {
						selectedSubCategory.push(this.selectedSubcategoryItem[i].id);
					}
					this.typeSubcategory(checkOffer, selectedSubCategory);
				}
			}
		}
		if (checkOffer == "brand") {
			if (this.submitted && this.editDiscountForm.valid) {
				if (this.selectedItem.length > 0) {
					this.typeVendor(checkOffer, this.selectedItem);
				} else {
					let selectedVendor = [];
					for (let i = 0; i < this.selectedVendorItem.length; i++) {
						selectedVendor.push(this.selectedVendorItem[i].id);
					}

					this.typeVendor(checkOffer, selectedVendor);
				}
			}
		}
		if (checkOffer == "product") {
			if (this.submitted && this.editDiscountForm.valid) {
				if (this.selectedItem.length > 0) {
					this.typeProduct(checkOffer, this.selectedItem);
				} else {
					let selectedProduct = [];
					for (let i = 0; i < this.selectedProductItem.length; i++) {
						selectedProduct.push(this.selectedProductItem[i].id);
					}
					this.typeProduct(checkOffer, selectedProduct);
				}
			}
		}
	}

	typeCategory(checkOffer, selectedCategoryItem) {
		let startDate = moment(
			this.editDiscountForm.controls["startDate"].value
		).toLocaleString();
		let endDate = moment(
			this.editDiscountForm.controls["endDate"].value
		).toLocaleString();
		let offer = {
			list: selectedCategoryItem,
			type: checkOffer,
		};

		const body = new FormData();
		body.append("id", this.id);
		body.append("name", this.editDiscountForm.controls["name"].value);
		body.append("name_ar", this.editDiscountForm.controls["name_ar"].value);
		if (this.images) {
			body.append(
				"image",
				new Blob([this.images], { type: "image/*" }),
				this.images.name
			);
		}
		body.append(
			"gender",
			JSON.stringify(this.editDiscountForm.controls["gender"].value)
		);
		body.append(
			"availableLocation",
			JSON.stringify(this.editDiscountForm.get("availableLocation").value)
		);
		body.append("type", this.editDiscountForm.controls["type"].value);
		body.append("discount", this.editDiscountForm.controls["disount"].value);
		body.append("offer", JSON.stringify(offer));
		body.append("startDate", JSON.stringify(startDate));
		body.append("endDate", JSON.stringify(endDate));

		this.editBanner(body);
	}

	typeSubcategory(checkOffer, selectedSubcategoryItem) {
		console.log("this.selectedCategory",this.selectedCategory);
		let startDate = moment(
			this.editDiscountForm.controls["startDate"].value
		).toLocaleString();
		let endDate = moment(
			this.editDiscountForm.controls["endDate"].value
		).toLocaleString();
		let offer = {
			list: selectedSubcategoryItem,
			type: checkOffer,
		};

		const body = new FormData();
		
		body.append("id", this.id);
		body.append(
			"category",this.selectedCategory
		);
		body.append("name", this.editDiscountForm.controls["name"].value);
		body.append("name_ar", this.editDiscountForm.controls["name_ar"].value);
		if (this.images) {
			body.append("image", this.images, this.images.name);
		}
		body.append(
			"gender",
			JSON.stringify(this.editDiscountForm.controls["gender"].value)
		);
		body.append(
			"availableLocation",
			JSON.stringify(this.editDiscountForm.get("availableLocation").value)
		);
		body.append("type", this.editDiscountForm.controls["type"].value);
		body.append("discount", this.editDiscountForm.controls["disount"].value);
		body.append("offer", JSON.stringify(offer));
		body.append("startDate", JSON.stringify(startDate));
		body.append("endDate", JSON.stringify(endDate));

		this.editBanner(body);
	}
	typeVendor(checkOffer, selectedVendorItem) {
		//vendor is reused as brand

		let startDate = moment(
			this.editDiscountForm.controls["startDate"].value
		).toLocaleString();
		let endDate = moment(
			this.editDiscountForm.controls["endDate"].value
		).toLocaleString();
		let offer = {
			list: selectedVendorItem,
			type: "brand",
		};

		const body = new FormData();
		body.append("id", this.id);
		body.append("category", this.selectedCategory);
		body.append("subCategory", this.selectedSubCategory);
		body.append("name", this.editDiscountForm.controls["name"].value);
		body.append("name_ar", this.editDiscountForm.controls["name_ar"].value);
		body.append(
			"gender",
			JSON.stringify(this.editDiscountForm.controls["gender"].value)
		);
		body.append(
			"availableLocation",
			JSON.stringify(this.editDiscountForm.get("availableLocation").value)
		);
		if (this.images) {
			body.append("image", this.images, this.images.name);
		}
		body.append("type", this.editDiscountForm.controls["type"].value);
		body.append("discount", this.editDiscountForm.controls["disount"].value);
		body.append("offer", JSON.stringify(offer));
		body.append("startDate", JSON.stringify(startDate));
		body.append("endDate", JSON.stringify(endDate));

		this.editBanner(body);
	}
	typeProduct(checkOffer, selectedItem) {
		let startDate = moment(
			this.editDiscountForm.controls["startDate"].value
		).toLocaleString();
		let endDate = moment(
			this.editDiscountForm.controls["endDate"].value
		).toLocaleString();
		let offer = {
			list: selectedItem,
			type: checkOffer,
		};

		const body = new FormData();
		body.append("id", this.id);
		body.append("category", this.selectedCategory);
		body.append("subCategory", this.selectedSubCategory);
		body.append("brand", this.selectedBrand);
		body.append(
			"gender",
			JSON.stringify(this.editDiscountForm.controls["gender"].value)
		);
		body.append(
			"availableLocation",
			JSON.stringify(this.editDiscountForm.get("availableLocation").value)
		);
		body.append("name", this.editDiscountForm.controls["name"].value);
		body.append("name_ar", this.editDiscountForm.controls["name_ar"].value);
		if (this.images) {
			body.append("image", this.images, this.images.name);
		}
		body.append("type", this.editDiscountForm.controls["type"].value);
		body.append("discount", this.editDiscountForm.controls["disount"].value);
		body.append("offer", JSON.stringify(offer));
		body.append("startDate", JSON.stringify(startDate));
		body.append("endDate", JSON.stringify(endDate));

		this.editBanner(body);
	}

	editBanner(body) {
		this.tempArray = [];
		this.tempArray.push(body);
		//  console.log(body)
		body.forEach((value, key) => {
			console.log(key + " " + value);
		});
		this.progress = true;
		this.apiService.editBanner(body).subscribe((res) => {
			console.log(res);
			if (res.success) {
				this.progress = false;
				this.router.navigateByUrl("offerdeals");
			} else {
				this.progress = false;
				this.commonService.errorToast(res.message);
			}
		});
	}
}
