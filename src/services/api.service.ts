import { Injectable, forwardRef } from "@angular/core";
import { HttpClient, HttpEventType, HttpHeaders, HTTP_INTERCEPTORS } from "@angular/common/http";
import { UrlService } from "./url.service";
//import { LoginBody } from "../../requests/login-body";
import { CommonService } from "./common.service";
import { Observable } from 'rxjs/internal/Observable';
import { HttpRequest } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/internal/operators';
import { Router } from '@angular/router';
import { of, pipe, Subject } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class ApiService {
  BASE_URL: any = this.url.SERVER_URL + '/api/';
  apiEndPoints: any;
  countryCode: any;
  userData = new Subject<any>()

  constructor(
    private http: HttpClient,
    private url: UrlService,
    private comm: CommonService,
    private router: Router,
  ) {
    this.apiEndPoints = {
      //Admin Account
      signUp: 'panel/signup',
      verifyPhoneNo: 'app/verifyPhone',
      adminLogin: 'panel/signin',
      forgotPassword: 'panel/forgotPassword',
      resetPasswordPhone: 'panel/resetPasswordPhone',
      getCategoryList: 'admin/getAllCategories',
      setProfile: 'panel/profileSetup',
      updateProfile: 'app/updateProfile',
      getProfile: 'app/getProfile',
      getAllCategory: 'admin/categories',
      addCategory: 'admin/category',
      addSubCategory: 'admin/subCategory',
      softdelete: 'common/delete',
      hardDelete: 'common/hardDelete',
      getList: 'admin/getUsers',
      getVendorListForEndorsement: 'panel/getMerchantList',
      viewDocument: 'admin/documents',
      getBrandList: 'admin/getAllBrand',
      getsubcategoryList: 'admin/subCategories',
      addBrand: 'admin/addBrand',
      viewBrand: 'admin/viewBrand',
      editBrand: 'admin/editBrand',
      approveReject: 'admin/approveReject',
      editUser: 'admin/editUser',
      changePassword: 'panel/changePassword',
      getProducts: 'admin/product',
      editProduct: 'admin/product',
      addProduct: 'admin/product',
      getUser: 'admin/viewUser',
      userAddress: 'admin/address',
      addCelebrityVendor: 'admin/addCelebrityVendor',
      getSubcategory: 'admin/subCategories',
      getCatByUser: 'admin/getUserCatAndSubCat',
      getBrandBySubcat: 'admin/getBrands',
      viewProduct: 'admin/viewProduct',
      deleteImage: 'admin/deleteImage',
      endorsementRequest: 'panel/endorseProduct',
      endorsementProduct: 'panel/getSellerEndorsements',
      approveEndorsementRequest: 'panel/approveEndorsement',
      getEndorsedProduct: 'panel/getCelebrityEndorsements',
      getAllBanner: 'admin/banner',
      getAllCategoriesforDiscount: 'admin/subCategories',
      getBrandListByCat: 'admin/getBrands',
      getAllCategoryForDiscount: 'admin/categoryByVendor',
      addBanner: 'admin/banner',
      viewBanner: 'admin/viewBanner',
      getAllPromo: 'admin/promoCode',
      addPromoCode: 'admin/promoCode',
      getPromoCode: 'admin/promoCode',
      salesList: 'admin/adminSales',
      processOrder: 'admin/processOrder',
      getSale: 'admin/viewSales',
      adminReview: 'admin/reviews',
      getShippingChargesList: 'admin/shippingCharges',
      viewSingleShippingCharges: 'admin/viewShippingCharges',
      getCountry: 'admin/countries',
      getTax: 'admin/settings',
      revenuereport: 'admin/revenueReport',
      revenueReportVendor: 'admin/revenueReportVendor',
      getDashboard: 'admin/adminDashboard',
      getVendorDashboard: 'admin/vendorDashboard',
      viewOrderHistory: 'admin/getOrderHistory',
      updateUserAddress: 'app/address',
      deleteDocument: 'admin/deleteDocument',
      subadmin: 'admin/admin',
      getEndorsementAdmin: 'admin/getEndorse',
      deleteEndorsement:'admin/deleteEndorse/',
      postEndorsement:'admin/endorse',
      geoFenceList:'admin/getAllGeofence',
      addGeofence:'admin/geoFence',
      viewGeoFence:'admin/geoFence',
      refundPayment:'app/refund',

      //commonApi to change status of, any user type
      status: 'common/status',


    }
    for (let key in this.apiEndPoints) {
      this.apiEndPoints[key] = this.BASE_URL + this.apiEndPoints[key];
    }
    this.getCountryCode();
  }

  protected getHeaders(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': this.getToken(),
        'enctype': 'multipart/form-data'
      })
    };
  }


  getCountryCode() {
    return this.http
      .get<Response>("assets/data.json")
      .pipe(map(response => response));
  }


  singIn(body: any): Observable<any> {
    return this.http
      .post<any>(this.apiEndPoints.adminLogin, body)
      .pipe(
        catchError(this.handleError<any>('Login'))
      );
  }


  signUp(body): Observable<any> {
    return this.http.post<any>(this.apiEndPoints.signUp, body).pipe(catchError(this.handleError<any>('Sign-Up')))
  }

  setUserDetails(body) {
    localStorage.setItem('User', body);
  }

  getUserDetails() {
    let data = localStorage.getItem('User')
    return data
  }

  verifyPhone(body): Observable<any> {
    return this.http.post<any>(this.apiEndPoints.verifyPhoneNo, body).pipe(catchError(this.handleError('verify phone')))
  }

  singOut(): Observable<any> {
    return this.http
      .post<any>(this.apiEndPoints.adminLogout, {}, this.getHeaders())
      .pipe(
        catchError(this.handleError<any>('Logout'))
      );
  }


  changePassword(body: any): Observable<any> {
    console.log(body);
    return this.http
      .put<any>(this.apiEndPoints.changePassword, body, this.getHeaders())
      .pipe(
        catchError(this.handleError<any>('Login'))
      );
  }
  resetPasswordByPhone(data): Observable<any> {

    return this.http.
      post<any>(this.apiEndPoints.resetPasswordPhone, data)
      .pipe(
        catchError(this.handleError<any>('Forgot Password'))
      );
  }

  forgetPassword(data): Observable<any> {

    return this.http.
      post<any>(this.apiEndPoints.forgotPassword, data)
      .pipe(
        catchError(this.handleError<any>('Forgot Password'))
      );
  }

  setProfile(data): Observable<any> {
    return this.http.post<any>(this.apiEndPoints.setProfile, data, this.getHeaders()).pipe(catchError(this.handleError()))

  }

  approveReject(body): Observable<any> {
    return this.http.post<any>(this.apiEndPoints.approveReject, body, this.getHeaders()).pipe(catchError(this.handleError()))
  }


  getList(body): Observable<any> {
    return this.http.post<any>(this.apiEndPoints.getList, body, this.getHeaders()).pipe(catchError(this.handleError()))
  }

  getVendorListForEndorsement(body): Observable<any> {
    return this.http.post<any>(this.apiEndPoints.getVendorListForEndorsement, body, this.getHeaders()).pipe(catchError(this.handleError()))
  }
  getCelebList(search, roles): Observable<any> {
    return this.http.get<any>(`${this.apiEndPoints.getList}?search=${search}&roles=${roles}`, this.getHeaders()).pipe(catchError(this.handleError()))
  }

  getCategoryByUser(id): Observable<any> {
    return this.http.get<any>(`${this.apiEndPoints.getCatByUser}?id=${id}`, this.getHeaders()).pipe(catchError(this.handleError()))
  }
  getBrandListBySubcat(catId): Observable<any> {
    return this.http.get<any>(`${this.apiEndPoints.getBrandBySubcat}?category=${catId}`, this.getHeaders()).pipe(catchError(this.handleError()))
  }

  getDocument(body): Observable<any> {
    return this.http.post<any>(this.apiEndPoints.viewDocument, body, this.getHeaders()).pipe(catchError(this.handleError()))
  }


  // Method start of Soft Delete
  // async  deleteData(url = '', data = {}) {
  //   const response = await fetch(url, {
  //     method: 'delete',
  //     mode: 'cors',
  //     cache: 'no-cache',
  //     credentials: 'same-origin',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': this.getToken(),

  //     },
  //     redirect: 'follow',
  //     referrerPolicy: 'no-referrer',
  //     body: JSON.stringify(data)
  //   });
  //   return response.json(); // parses JSON response into native JavaScript objects
  // }




  // flagDelete: boolean
  // data: any
  // async  deletemethod(body) {
  //   // this.flagDelete = false;

  //   await this.deleteData(this.apiEndPoints.softdelete, body)
  //     .then(data => {
  //       if (data.success) {
  //         console.log("passed")
  //         this.flagDelete = true;
  //         this.data = data
  //       } else {
  //         console.log("Failed")
  //         this.flagDelete == false
  //       }


  //     });

  // }

  delete(body): Observable<any> {

    return this.http.post<any>(this.apiEndPoints.softdelete, body, this.getHeaders()).pipe(catchError(this.handleError()))
  }

  hardDelete(body): Observable<any> {

    return this.http.post<any>(this.apiEndPoints.hardDelete, body, this.getHeaders()).pipe(catchError(this.handleError()))
  }

  deleteImage(body): Observable<any> {
    return this.http.post<any>(this.apiEndPoints.deleteImage, body, this.getHeaders()).pipe(catchError(this.handleError))
  }


  //Method End For Soft Delete

  back() {
    window.history.back()
  }


  //Method End For hard Delete
  // async  hardDeleteData(url = '', data = {}) {
  //   const response = await fetch(url, {
  //     method: 'delete',
  //     mode: 'cors',
  //     cache: 'no-cache',
  //     credentials: 'same-origin',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': this.getToken(),

  //     },
  //     redirect: 'follow',
  //     referrerPolicy: 'no-referrer',
  //     body: JSON.stringify(data)
  //   });
  //   return response.json(); // parses JSON response into native JavaScript objects
  // }




  // flaghardDelete: boolean
  // harddata: any
  // async deleteHard(body) {
  //   // this.flagDelete = false;

  //   await this.hardDeleteData(this.apiEndPoints.hardDelete, body)
  //     .then(data => {
  //       if (data.success) {
  //         console.log("passed")
  //         this.flagDelete = true;
  //         this.data = data
  //       } else {
  //         console.log("Failed")
  //         this.flagDelete == false
  //       }


  //     });

  // }
  //method end for hard delete



  setUser(user: any) {
    sessionStorage.setItem("Markat_User", user);
  }

  getUser() {
    return sessionStorage.getItem('Markat_User')
  }

  sendToken(token: string) {
    sessionStorage.setItem("token", token);
  }


  getToken() {
    return sessionStorage.getItem("token");
  }


  isLoggedIn() {
    return this.getToken() !== null;
  }


  addVendorCelebrity(body): Observable<any> {
    return this.http.post<any>(this.apiEndPoints.addCelebrityVendor, body, this.getHeaders()).pipe(catchError(this.handleError()))
  }


  //Products
  AddProduct(body): Observable<any> {
    return this.http.post<any>(this.apiEndPoints.addProduct, body, this.getHeaders()).pipe(catchError(this.handleError()))
  }

  updateProduct(body): Observable<any> {
    return this.http.put<any>(this.apiEndPoints.addProduct, body, this.getHeaders()).pipe(catchError(this.handleError()))
  }


  getAllPromoCode(page, count, filter, search): Observable<any> {
    return this.http.get<any>(`${this.apiEndPoints.getAllPromo}?page=${page}&count=${count}&filter=${filter}&search=${search}`, this.getHeaders()).pipe(catchError(this.handleError()))
  }


  addPromoCode(body): Observable<any> {
    return this.http.post<any>(this.apiEndPoints.addPromoCode, body, this.getHeaders()).pipe(catchError(this.handleError()))
  }

  getPromoCode(id): Observable<any> {
    return this.http.get<any>(`${this.apiEndPoints.getPromoCode}/${id}`, this.getHeaders()).pipe(catchError(this.handleError()))
  }

  updatePromoCode(body, id): Observable<any> {
    return this.http.put<any>(`${this.apiEndPoints.addPromoCode}/${id}`, body, this.getHeaders()).pipe(catchError(this.handleError()))
  }

  getAllProduct(page, count, search) {
    return this.http
      .get<any>(`${this.apiEndPoints.getAllProduct}?page=${page}&count=${count}&search=${search}`, this.getHeaders())
      .pipe(
        catchError(this.handleError<any>('All Product'))
      );
  }

  viewProduct(id: any) {
    return this.http
      .get<any>(`${this.apiEndPoints.viewProduct}/${id}`, this.getHeaders())
      .pipe(
        catchError(this.handleError<any>('All Product'))
      );
  }

  getProductByVendor(body): Observable<any> {
    return this.http.post<any>(this.apiEndPoints.getProductByVendor, body, this.getHeaders())
      .pipe(
        catchError(this.handleError<any>('get product by vendor')))

  }

  addBanner(body): Observable<any> {
    return this.http.post<any>(this.apiEndPoints.addBanner, body, this.getHeaders()).
      pipe(
        catchError(this.handleError<any>("add bannner")))
  }

  editBanner(body): Observable<any> {
    return this.http.put<any>(this.apiEndPoints.addBanner, body, this.getHeaders()).
      pipe(
        catchError(this.handleError<any>("add bannner")))
  }

  EditBanner(body): Observable<any> {
    return this.http.put<any>(this.apiEndPoints.addBanner, body, this.getHeaders()). //using end point add banner because of same end point
      pipe(
        catchError(this.handleError<any>("add bannner")))
  }
  updateBanner(body): Observable<any> {
    return this.http.put<any>(this.apiEndPoints.addBanner, body, this.getHeaders()).
      pipe(
        catchError(this.handleError<any>("add bannner")))
  }

  getDisountDetails(id): Observable<any> {
    return this.http.get<any>(`${this.apiEndPoints.viewBanner}?id=${id}`, this.getHeaders()).
      pipe(
        catchError(this.handleError<any>('get discount details')))
  }

  getAllUser(page, count, search, filter) {

    return this.http.get<any>(`${this.apiEndPoints.getAllUser}?page=${page}&count=${count}&search=${search}&filter=${filter}`,
      this.getHeaders()
    ).pipe(
      catchError(this.handleError<any>('No user'))
    );

  }

  changeUserStatus(body) {

    return this.http.put<any>(`${this.apiEndPoints.status}`, body, this.getHeaders()
    ).pipe(
      catchError(this.handleError<any>('User status')))

  }

  approveEndorsementRequest(body): Observable<any> {
    return this.http.post<any>(this.apiEndPoints.approveEndorsementRequest, body, this.getHeaders()).pipe(catchError(this.handleError()))
  }

  getEndorsedProduct(body): Observable<any> {
    return this.http.post<any>(this.apiEndPoints.getEndorsedProduct, body, this.getHeaders()).pipe(catchError(this.handleError()))

  }

  editCelebrity(body) {

    return this.http.put<any>(`${this.apiEndPoints.editUser}`, body, this.getHeaders()
    ).pipe(
      catchError(this.handleError<any>('User status')))

  }
  // 

  changeCelebrityStatus(body) {

    return this.http.put<any>(`${this.apiEndPoints.status}`, body, this.getHeaders()
    ).pipe(
      catchError(this.handleError<any>('User status')))

  }

  getProfile() {
    return this.http.get<any>(`${this.apiEndPoints.getProfile}`, this.getHeaders())
      .pipe(catchError(this.handleError<any>('Get Profile')))
  }


  getUserAddress(id) {
    return this.http.get<any>(`${this.apiEndPoints.userAddress}/${id}`, this.getHeaders())
      .pipe(
        catchError(this.handleError<any>('user address')))
  }

  updateAddress(body) {
    return this.http.put<any>(`${this.apiEndPoints.updateUserAddress}`, body, this.getHeaders())
      .pipe(
        catchError(this.handleError<any>('user address')))
  }


  deleteDocument(id): Observable<any> {
    return this.http.post<any>(this.apiEndPoints.deleteDocument, { 'id': id }, this.getHeaders()).pipe(catchError(this.handleError()))
  }



  getVendorList(body, page, count, change) {

    return this.http.post<any>(this.apiEndPoints.getAllVendor, body,
      this.getHeaders()
    ).pipe(
      catchError(this.handleError<any>('No user'))
    );
  }

  getProducts(page, count, filter, isApproved, search, seller, view) {
    // console.log(id);
    return this.http.get<any>(`${this.apiEndPoints.getProducts}?page=${page}&count=${count}&filter=${filter}&isApproved=${isApproved}&search=${search}&seller=${seller}&view=${view}`,
      this.getHeaders()
    ).pipe(
      catchError(this.handleError<any>('Get Vendor Products'))
    );

  }


  getProductsforBanner(page, count, filter, isApproved, search, seller, category, subCategory, brand) {
    // console.log(id);
    return this.http.get<any>(`${this.apiEndPoints.getProducts}?page=${page}&count=${count}&filter=${filter}&isApproved=${isApproved}&search=${search}&seller=${seller}&category=${category}&subCategory=${subCategory}&brand=${brand}`,
      this.getHeaders()
    ).pipe(
      catchError(this.handleError<any>('Get Vendor Products'))
    );

  }

  getProductsForEndorsement(page, count, filter, isApproved, search, seller, isEndorse) {
    // console.log(id);
    return this.http.get<any>(`${this.apiEndPoints.getProducts}?page=${page}&count=${count}&filter=${filter}&isApproved=${isApproved}&search=${search}&seller=${seller}&isEndorse=${isEndorse}`,
      this.getHeaders()
    ).pipe(
      catchError(this.handleError<any>('Get Vendor Products'))
    );

  }

  endorsementRequest(body): Observable<any> {
    return this.http.post<any>(this.apiEndPoints.endorsementRequest, body, this.getHeaders()).pipe(catchError(this.handleError()))
  }

  getEndorsement(body): Observable<any> {
    return this.http.post<any>(this.apiEndPoints.endorsementProduct, body, this.getHeaders()).pipe(catchError(this.handleError()))
  }

  getProductsWithoutApproved(page, count, filter, search, seller) {
    // console.log(id);
    return this.http.get<any>(`${this.apiEndPoints.getProducts}?page=${page}&count=${count}&filter=${filter}&search=${search}&seller=${seller}`,
      this.getHeaders()
    ).pipe(
      catchError(this.handleError<any>('Get Vendor Products'))
    );

  }

  editProduct(body): Observable<any> {
    return this.http.put<any>(this.apiEndPoints.editProduct, body, this.getHeaders()).pipe(catchError(this.handleError()))

  }

  getVendorsCategory(id) {

    return this.http.get<any>(`${this.apiEndPoints.vendorsCategory}?id=${id}`, this.getHeaders())
      .pipe(
        catchError(this.handleError<any>('get vendors category')))

  }

  getVendorSubcategory(vendorId, categoryId) {
    return this.http.get<any>(`${this.apiEndPoints.vendorSubcategory}?id=${vendorId}&category=${categoryId}`, this.getHeaders())
      .pipe(
        catchError(this.handleError<any>('get vendors category')))

  }

  getBrandListbyCat(selectedCategory, selectedSubCategory) {
    return this.http.get<any>(`${this.apiEndPoints.getBrandListByCat}?category=${selectedCategory}&subCategory=${selectedSubCategory}`, this.getHeaders())
      .pipe(
        catchError(this.handleError<any>("list of vendor by category and sub-category")))
  }

  viewUser(id) {
    return this.http.get<any>(`${this.apiEndPoints.getUser}?id=${id}`,
      this.getHeaders()).
      pipe(catchError(this.handleError<any>('No user')));
  }

  getSubcategoryList(id): Observable<any> {
    return this.http.get<any>(`${this.apiEndPoints.getsubcategoryList}?parentId=${id}`, this.getHeaders()).pipe(catchError(this.handleError()))
  }

  viewBrand(id): Observable<any> {
    return this.http.get<any>(`${this.apiEndPoints.viewBrand}?id=${id}`, this.getHeaders()).pipe(catchError(this.handleError()))
  }

  editUser(userUpdate): Observable<any> {
    console.log(userUpdate)
    return this.http.put<any>(this.apiEndPoints.editUser, userUpdate, this.getHeaders()).pipe(
      catchError(this.handleError<any>('Edit User'))
    )
  }

  viewPurchaseHistory(page, count, id, filter, search) {
    console.log(id);
    return this.http.get<any>(`${this.apiEndPoints.viewOrderHistory}?page=${page}&count=${count}&id=${id}&filter=${filter}&search=${search}`,
      this.getHeaders()
    ).pipe(
      catchError(this.handleError<any>('No user'))
    );

  }

  //Categories
  getAllCategories() {
    return this.http
      .get<any>(this.apiEndPoints.getAllCategory, this.getHeaders())
      .pipe(
        catchError(this.handleError<any>('All Product'))
      );
  }

  getAllCategoriesForPanel() {
    return this.http
      .get<any>(this.apiEndPoints.getAllCategoryForDiscount, this.getHeaders())
      .pipe(
        catchError(this.handleError<any>('All Product'))
      );
  }

  getAllSubCategoriesForDiscount(parentId) {

    return this.http.get<any>(`${this.apiEndPoints.getAllCategoriesforDiscount}?parentId=${parentId}`, this.getHeaders()).pipe(catchError(this.handleError("get all category for discount")))

  }



  // 

  addCategory(data) {
    return this.http
      .post<any>(this.apiEndPoints.addCategory, data, this.getHeaders())
      .pipe(
        catchError(this.handleError<any>('Add Category'))
      );
  }



  editCategory(data) {
    // const data: FormData = new FormData();
    // data.append('id', category.id);
    // data.append('name', category.name);
    // data.append('name_ar', category.name_ar);
    // data.append('image', category.img);

    return this.http
      .put<any>(this.apiEndPoints.addCategory, data, this.getHeaders())
      .pipe(
        catchError(this.handleError<any>('Edit Category'))
      );
  }

  viewCategory(id) {
    return this.http
      .get<any>(`${this.apiEndPoints.addCategory}?id=${id}`, this.getHeaders())
      .pipe(
        catchError(this.handleError<any>('View Category'))
      );
  }


  //Sub Category
  addSubCategory(data) {
    return this.http
      .post<any>(this.apiEndPoints.addSubCategory, data, this.getHeaders())
      .pipe(
        catchError(this.handleError<any>('Add Category'))
      );

  }

  addVendor(data) {

    console.log(data);

    return this.http
      .post<any>(this.apiEndPoints.addVendor, data, this.getHeaders())
      .pipe(
        catchError(this.handleError<any>('Add Vendor'))
      );

  }

  updateProfile(body) {
    console.log(body)

    return this.http.put<any>(`${this.apiEndPoints.updateProfile}`, body, this.getHeaders())
      .pipe(
        catchError(this.handleError<any>("update profile")))
  }


  getAllDiscount(bannerType, sellerId, isApproved, page, pageSize, search, filterBy) {
    return this.http.get<any>(`${this.apiEndPoints.getAllBanner}?bannerType=${bannerType}&seller=${sellerId}&isApproved=${isApproved}&page=${page}&count=${pageSize}&search=${search}&filter=${filterBy}`, this.getHeaders())
      .pipe(
        catchError(this.handleError<any>("get discount(banner)"))
      )
  }

  //Sales Module
  getSaleList(page, pageSize, search, filterBy, vendor): Observable<any> {
    return this.http.get<any>(`${this.apiEndPoints.salesList}?page=${page}&count=${pageSize}&filter=${filterBy}&search=${search}&vendor=${vendor}`, this.getHeaders()).pipe(catchError(this.handleError()))
  }

  updateStatus(body, id): Observable<any> {
    return this.http.post<any>(`${this.apiEndPoints.processOrder}/${id}`, body, this.getHeaders()).pipe(catchError(this.handleError))
  }



  getSale(id): Observable<any> {
    return this.http.get<any>(`${this.apiEndPoints.getSale}/${id}`, this.getHeaders()).pipe(catchError(this.handleError))

  }



  getSalesGraph(body): Observable<any> {
    return this.http.post<any>(this.apiEndPoints.salesGraph, body, this.getHeaders()).pipe(catchError(this.handleError))
  }

  getVendortSalesGraph(body): Observable<any> {
    return this.http.post<any>(this.apiEndPoints.vendorSales, body, this.getHeaders()).pipe(catchError(this.handleError))
  }


  getReviewList(page, pageSize, search, filterBy): Observable<any> {
    return this.http.get<any>(`${this.apiEndPoints.adminReview}?page=${page}&count=${pageSize}&search=${search}&filter=${filterBy}`, this.getHeaders()).pipe(catchError(this.handleError))
  }


  updateCMS(body): Observable<any> {// method to update CMS Pages
    return this.http.post<any>(this.apiEndPoints.updateCms, body, this.getHeaders()).pipe(catchError(this.handleError()));
  }


  getAllCMs(): Observable<any> { // Method  to get All CMS Pages
    return this.http.get<any>(this.apiEndPoints.getTax, this.getHeaders()).pipe(catchError(this.handleError));
  }


  getDashboardData(page, pageSize, search, filterBy, type, revenueFilter): Observable<any> {
    return this.http.get<any>(`${this.apiEndPoints.getDashboard}?page=${page}&count=${pageSize}&search=${search}&filter=${filterBy}&salesGraphType=${type}&revenueGraphType=${revenueFilter}`, this.getHeaders()).pipe(catchError(this.handleError));

  }

  getVednorDashboardData(page, pageSize, search, filterBy, type, revenueFilter): Observable<any> {
    return this.http.get<any>(`${this.apiEndPoints.getVendorDashboard}?page=${page}&count=${pageSize}&search=${search}&filter=${filterBy}&salesGraphType=${type}&revenueGraphType=${revenueFilter}`, this.getHeaders()).pipe(catchError(this.handleError));

  }

  getBrandList(): Observable<any> {

    return this.http.get<any>(`${this.apiEndPoints.getBrandList}?page=1&count=10000`, this.getHeaders()).pipe(catchError(this.handleError()))

  }

  addBrand(body): Observable<any> {
    return this.http.post<any>(this.apiEndPoints.addBrand, body, this.getHeaders()).pipe(catchError(this.handleError()))
  }

  editBrand(body): Observable<any> {
    return this.http.put<any>(this.apiEndPoints.editBrand, body, this.getHeaders()).pipe(catchError(this.handleError()))
  }

  getNotification(type, page, count): Observable<any> {
    return this.http.get<any>(`${this.apiEndPoints.getNotificationList}?page=${page}&count=${count}&type=${type}`, this.getHeaders()).pipe(catchError(this.handleError))
  }

  broadcastNotification(value): Observable<any> {
    return this.http.post<any>(this.apiEndPoints.broadcast, value, this.getHeaders()).pipe(catchError(this.handleError()))
  }
  getCountryList(data): Observable<any> {
    return this.http.get<any>(`${this.apiEndPoints.getCountry}?page=1&count=10&search=${data}`, this.getHeaders()).pipe(catchError(this.handleError()))
  }

  addShippingRate(body): Observable<any> {
    return this.http.post<any>(this.apiEndPoints.getShippingChargesList, body, this.getHeaders()).pipe(catchError(this.handleError()))
  }

  getShippingRateList(): Observable<any> {
    return this.http.get<any>(this.apiEndPoints.getShippingChargesList, this.getHeaders()).pipe(catchError(this.handleError()))
  }


  getSingleShippingCharge(id): Observable<any> {
    return this.http.get<any>(`${this.apiEndPoints.viewSingleShippingCharges}?id=${id}`, this.getHeaders()).pipe(catchError(this.handleError()))
  }


  updateShippingRate(body) {
    return this.http.put<any>(this.apiEndPoints.getShippingChargesList, body, this.getHeaders()).pipe(catchError(this.handleError()))

  }

  getTax(): Observable<any> {
    return this.http.get<any>(this.apiEndPoints.getTax, this.getHeaders()).pipe(catchError(this.handleError))
  }

  updateTax(body): Observable<any> {
    return this.http.put<any>(this.apiEndPoints.getTax, body, this.getHeaders()).pipe(catchError(this.handleError))
  }

  getRevenueReport(page, count, search, filter): Observable<any> {
    return this.http.get<any>(`${this.apiEndPoints.revenuereport}?page=${page}&count=${count}&search=${search}&topSeller=${filter}`, this.getHeaders()).pipe(catchError(this.handleError()))
  }
  getRevenueReportVendor(page, count, search, filter): Observable<any> {
    return this.http.get<any>(`${this.apiEndPoints.revenueReportVendor}?page=${page}&count=${count}&search=${search}&filter=${filter}`, this.getHeaders()).pipe(catchError(this.handleError()))
  }

  getPaymentDaTA(page, count, search, filter): Observable<any> {
    return this.http.get<any>(`${this.apiEndPoints.getPaymentOfvendor}?page=${page}&count=${count}&search=${search}&filter=${filter}`, this.getHeaders()).pipe(catchError(this.handleError()))
  }

  getSubAdminList(page, count, search, filter): Observable<any> {
    return this.http.get<any>(`${this.apiEndPoints.subadmin}?page=${page}&count=${count}&search=${search}&filter=${filter}`, this.getHeaders()).pipe(catchError(this.handleError()))
  }

  getSingleSubAdmin(id): Observable<any> {
    return this.http.get<any>(`${this.apiEndPoints.subadmin}/${id}`, this.getHeaders())
  }

  putSubAdmin(body, id): Observable<any> {
    return this.http.put<any>(`${this.apiEndPoints.subadmin}/${id}`, body, this.getHeaders())
  }

  postSubAdmin(body): Observable<any> {
    return this.http.post<any>(`${this.apiEndPoints.subadmin}`, body, this.getHeaders())
  }

  getTranslations(): Observable<any> {
    // implemented by prabhjot
    return this.http.get(this.BASE_URL + "/admin/translation", this.getHeaders());
  }


  postTranlastions(body): Observable<any> {
    // implemented by prabhjot
    return this.http.post(this.BASE_URL + "/admin/translation/6064bc2c1b5c5e46e0007f61", body, this.getHeaders());
  }


  getEndorsementAdmin(body): Observable<any> {
    return this.http.post<any>(this.apiEndPoints.getEndorsementAdmin, body, this.getHeaders());
  }


  deleteEndorse(id):Observable<any>{
    return this.http.delete(this.apiEndPoints.deleteEndorsement+id,this.getHeaders())
  }


  addEndorsement(body):Observable<any>{
    return this.http.post<any>(this.apiEndPoints.postEndorsement, body,this.getHeaders())
  }

  getAllGeofence(body):Observable<any>{
    return this.http.post<any>(this.apiEndPoints.geoFenceList,body,this.getHeaders()).pipe(catchError(this.handleError()))
  }


  createGeoFencing(body):Observable<any>{
    return this.http.post<any>(this.apiEndPoints.addGeofence, body,this.getHeaders())
  }


  getGeofencing(id):Observable<any>
  {
    return this.http.get<any>(`${this.apiEndPoints.viewGeoFence}?id=`+id,this.getHeaders() )
  }
   
  updateGeofencing(body):Observable<any>{
    return this.http.put<any>(this.apiEndPoints.viewGeoFence,body,this.getHeaders())
  }


  deleteGeofence(id):Observable<any>{
    return this.http.delete(this.apiEndPoints.viewGeoFence+'/'+id, this.getHeaders())
  }


  refundPayment(body):Observable<any>{
    return this.http.post(this.apiEndPoints.refundPayment,body,this.getHeaders())
  }


  // Error handling
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if (error.status == 400) {
        this.comm.errorToast(error.error.message)
        // localStorage.clear();
        this.router.navigateByUrl("/login");

      }
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      return;
    };
  }
}
