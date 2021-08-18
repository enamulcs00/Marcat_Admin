import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ChartsModule } from 'ng2-charts';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { AdduserComponent } from './adduser/adduser.component';
import { ProductComponent } from './product/product.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { AddinventoryComponent } from './addinventory/addinventory.component';
import { OrdermanagementComponent } from './ordermanagement/ordermanagement.component';
import { AddordermanagementComponent } from './addordermanagement/addordermanagement.component';
import { PaymentComponent } from './payment/payment.component';
import { MyLineChartComponent } from './my-line-chart/my-line-chart.component';
import { ReportpageComponent } from './reportpage/reportpage.component';
import { InventryManagementComponent } from './inventry-management/inventry-management.component';
import { ViewinventoryComponent } from './viewinventory/viewinventory.component';
import { ManageEarningComponent } from './manage-earning/manage-earning.component';
import { RefundComponent } from './refund/refund.component';
import { ManageReviewsComponent } from './manage-reviews/manage-reviews.component';
import { VenderManagementComponent } from './vender-management/vender-management.component';
import { AddVenderComponent } from './add-vender/add-vender.component';
import { BookingRequestHistoryComponent } from './booking-request-history/booking-request-history.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { ViewOrderComponent } from './view-order/view-order.component';
import { EditVendorComponent } from './edit-vendor/edit-vendor.component';
import { ViewVendorComponent } from './view-vendor/view-vendor.component';
import { DealsComponent } from './deals/deals.component';
import { CategoryComponent } from './category/category.component';
import { BannerComponent } from './banner/banner.component';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { ViewcategoryComponent } from './viewcategory/viewcategory.component';
import { EditcategoryComponent } from './editcategory/editcategory.component';
import { CmsComponent } from './cms/cms.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { AboutComponent } from './about/about.component';
import { FaqComponent } from './faq/faq.component';
import { ViewdiscountComponent } from './viewdiscount/viewdiscount.component';
import { EditdiscountComponent } from './editdiscount/editdiscount.component';
import { OfferdealsComponent } from './offerdeals/offerdeals.component';
import { AddoffersComponent } from './addoffers/addoffers.component';
import { NotificationComponent } from './notification/notification.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { EditsubcategoryComponent } from './editsubcategory/editsubcategory.component';
import { ViewsubcategoryComponent } from './viewsubcategory/viewsubcategory.component';
import { AddsubcategoryComponent } from './addsubcategory/addsubcategory.component';
import { TermconditionComponent } from './termcondition/termcondition.component';
import { ContactusComponent } from './contactus/contactus.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { ReturnpolicyComponent } from './returnpolicy/returnpolicy.component';
import { VentorTComponent } from './ventor-t/ventor-t.component';
import { SalesreportComponent } from './salesreport/salesreport.component';
import { RevenuereportComponent } from './revenuereport/revenuereport.component';
import { ReveuegraphComponent } from './reveuegraph/reveuegraph.component';
import { SalesgraphComponent } from './salesgraph/salesgraph.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { VendorSalesReportComponent } from './vendor-sales-report/vendor-sales-report.component';
import { ReportGraphComponent } from './report-graph/report-graph.component';
import { TermofuseComponent } from './termofuse/termofuse.component';
import { TermofsalesComponent } from './termofsales/termofsales.component';
import { ConsumerprivacypolicyComponent } from './consumerprivacypolicy/consumerprivacypolicy.component';
import { WarrantypolicyComponent } from './warrantypolicy/warrantypolicy.component';
import { ToastrModule } from "ng6-toastr-notifications";
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { DatePipe } from '@angular/common';
import { DeliveryAddressComponent } from './delivery-address/delivery-address.component';
import * as moment from 'moment';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { GraphComponent } from './graph/graph.component';
import { AddbrandComponent } from './addbrand/addbrand.component';
import { EditbrandComponent } from './editbrand/editbrand.component';
import { ViewbrandComponent } from './viewbrand/viewbrand.component';
import { BrandlistComponent } from './brandlist/brandlist.component';
import { NotificationService } from 'src/services/notification.service';
import { BroadcastComponent } from './broadcast/broadcast.component';
import { SettingsComponent } from './settings/settings.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignUpWithMobileComponent } from './sign-up-with-mobile/sign-up-with-mobile.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { ProfileSetUpComponent } from './profile-set-up/profile-set-up.component';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { ManageCelebrityComponent } from './manage-celebrity/manage-celebrity.component';
import { DocumentComponent } from './document/document.component';
import { EndorsementComponent } from './endorsement/endorsement.component';
import { EndorsementProductComponent } from './endorsement-product/endorsement-product.component';
import { EndorsedProductComponent } from './endorsed-product/endorsed-product.component';
import { AddPromoCodeComponent } from './add-promo-code/add-promo-code.component';
import { PromoCodeManagementComponent } from './promo-code-management/promo-code-management.component';
import { EditPromoCodeComponent } from './edit-promo-code/edit-promo-code.component';
import { SubAdminListComponent } from './sub-admin/sub-admin-list/sub-admin-list.component';
import { SubAdminAddComponent } from './sub-admin/sub-admin-add/sub-admin-add.component';
import { GetTranslationsComponent } from './get-translations/get-translations.component';
import { AdminEndormentComponent } from './admin-endorment/admin-endorment.component';
import { AddEndorsementComponent } from './add-endorsement/add-endorsement.component';
import { AgmCoreModule } from '@agm/core';
import { GeofenceListComponent } from './geofence/geofence-list/geofence-list.component';
import { AddGeofenceComponent } from './geofence/add-geofence/add-geofence.component';
import { EditGeofenceComponent } from './geofence/edit-geofence/edit-geofence.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

// import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';



// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http);
// }
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    DashboardComponent,
    SidebarComponent,
    NavbarComponent,
    ManageUserComponent,
    AdduserComponent,
    ProductComponent,
    AddproductComponent,
    NotificationComponent,
    AddinventoryComponent,
    OrdermanagementComponent,
    AddordermanagementComponent,
    PaymentComponent,
    MyLineChartComponent,
    ReportpageComponent,
    InventryManagementComponent,
    ViewinventoryComponent,
    ManageEarningComponent,
    RefundComponent,
    ManageReviewsComponent,
    VenderManagementComponent,
    AddVenderComponent,
    BookingRequestHistoryComponent,
    ViewUserComponent,
    EditUserComponent,
    EditProductComponent,
    ViewProductComponent,
    EditOrderComponent,
    ViewOrderComponent,
    EditVendorComponent,
    ViewVendorComponent,
    DealsComponent,
    CategoryComponent,
    BannerComponent,
    AddcategoryComponent,
    ViewcategoryComponent,
    EditcategoryComponent,
    CmsComponent,
    ViewdiscountComponent,
    EditdiscountComponent,
    AddoffersComponent,
    OfferdealsComponent,
    SalesreportComponent,
    RevenuereportComponent,
    ReveuegraphComponent,
    SalesgraphComponent,
    ProfileComponent,
    ChangepasswordComponent,
    AboutComponent,
    FaqComponent,
    SubcategoryComponent,
    EditsubcategoryComponent,
    ViewsubcategoryComponent,
    AddsubcategoryComponent,
    TermconditionComponent,
    ContactusComponent,
    PrivacypolicyComponent,
    ReturnpolicyComponent,
    VentorTComponent,
    EditprofileComponent,
    VendorSalesReportComponent,
    ReportGraphComponent,
    TermofuseComponent,
    TermofsalesComponent,
    ConsumerprivacypolicyComponent,
    WarrantypolicyComponent,
    DeliveryAddressComponent,
    GraphComponent,
    AddbrandComponent,
    EditbrandComponent,
    ViewbrandComponent,
    BrandlistComponent,
    BroadcastComponent,
    SettingsComponent,
    SignUpComponent,
    SignUpWithMobileComponent,
    ProfileSetUpComponent,
    ManageCelebrityComponent,
    DocumentComponent,
    EndorsementComponent,
    EndorsementProductComponent,
    EndorsedProductComponent,
    AddPromoCodeComponent,
    PromoCodeManagementComponent,
    EditPromoCodeComponent,
    SubAdminListComponent,
    SubAdminAddComponent,
    GetTranslationsComponent,
    AdminEndormentComponent,
    AddEndorsementComponent,
    GeofenceListComponent,
    AddGeofenceComponent,
    EditGeofenceComponent
    
    



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    GooglePlaceModule,
    ChartsModule, CKEditorModule, FormsModule, ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgOtpInputModule,
    InfiniteScrollModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBCNuSINklJM6YkiIYG9ixuWviIkJtCD5U'
    }),
    NgMultiSelectDropDownModule.forRoot(),
    // TranslateModule.forRoot({
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: HttpLoaderFactory,
    //     deps: [HttpClient]
    //   }
    // })


  ],
  providers: [DatePipe, NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule {


}
