import { GetTranslationsComponent } from './get-translations/get-translations.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { AdduserComponent } from './adduser/adduser.component';
import { ProductComponent } from './product/product.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { AddinventoryComponent } from './addinventory/addinventory.component';
import { OrdermanagementComponent } from './ordermanagement/ordermanagement.component';
import { AddordermanagementComponent } from './addordermanagement/addordermanagement.component';
import { PaymentComponent } from './payment/payment.component';
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
import { ViewVendorComponent } from './view-vendor/view-vendor.component';
import { EditVendorComponent } from './edit-vendor/edit-vendor.component';
import { CategoryComponent } from './category/category.component';
import { DealsComponent } from './deals/deals.component';
import { BannerComponent } from './banner/banner.component';
import { EditcategoryComponent } from './editcategory/editcategory.component';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { ViewcategoryComponent } from './viewcategory/viewcategory.component';
import { CmsComponent } from './cms/cms.component';
import { AboutComponent } from './about/about.component';
import { FaqComponent } from './faq/faq.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { EditsubcategoryComponent } from './editsubcategory/editsubcategory.component';
import { ViewsubcategoryComponent } from './viewsubcategory/viewsubcategory.component';
import { AddsubcategoryComponent } from './addsubcategory/addsubcategory.component';
import { ViewdiscountComponent } from './viewdiscount/viewdiscount.component';
import { EditdiscountComponent } from './editdiscount/editdiscount.component';
import { OfferdealsComponent } from './offerdeals/offerdeals.component';
import { AddoffersComponent } from './addoffers/addoffers.component';
import { NotificationComponent } from './notification/notification.component';
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

import { DeliveryAddressComponent } from './delivery-address/delivery-address.component';
import { AuthGuard } from 'src/services/auth.guard';
import { GraphComponent } from './graph/graph.component';
import { BrandlistComponent } from './brandlist/brandlist.component';
import { AddbrandComponent } from './addbrand/addbrand.component';
import { EditbrandComponent } from './editbrand/editbrand.component';
import { ViewbrandComponent } from './viewbrand/viewbrand.component';
import { BroadcastComponent } from './broadcast/broadcast.component';
import { SettingsComponent } from './settings/settings.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignUpWithMobileComponent } from './sign-up-with-mobile/sign-up-with-mobile.component';
import { ProfileSetUpComponent } from './profile-set-up/profile-set-up.component';
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
import { AdminEndormentComponent } from './admin-endorment/admin-endorment.component';

const routes: Routes = [
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   component: LoginComponent
  // },

  {
    path: "",
    redirectTo: "/login",
    pathMatch: "full",
  },
  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'sign-Up',
    component: SignUpComponent
  },
  {
    path: 'sign-UpWithMobile',
    component: SignUpWithMobileComponent
  },
  {
    path: 'setUpProfile',
    component: ProfileSetUpComponent
  },

  {
    path: 'forgotPassword',
    component: ForgotPasswordComponent
  },
  {
    path: 'resetPassword',
    component: ResetPasswordComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'sidebar',
    component: SidebarComponent
  },
  {
    path: 'navbar',
    component: NavbarComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'document',
    component: DocumentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'manageUser',
    component: ManageUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'manageCelebrity',
    component: ManageCelebrityComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'adduser',
    component: AdduserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'product',
    component: ProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'addproduct',
    component: AddproductComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'addinventory',
    component: AddinventoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ordermanagement',
    component: OrdermanagementComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'addordermanagement',
    component: AddordermanagementComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'addPromoCode',
    component: AddPromoCodeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'promoCodeList',
    component: PromoCodeManagementComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'editPromoCode',
    component: EditPromoCodeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'payment',
    component: PaymentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reportpage',
    component: ReportpageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'inventryManagement',
    component: InventryManagementComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'brandList',
    component: BrandlistComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'addBrand',
    component: AddbrandComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'editBrand',
    component: EditbrandComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'viewBrand',
    component: ViewbrandComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'viewinventory',
    component: ViewinventoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'manageEarning',
    component: ManageEarningComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'refund',
    component: RefundComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'manageReviews',
    component: ManageReviewsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'venderManagement',
    component: VenderManagementComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add',
    component: AddVenderComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'endorsement',
    component: EndorsementComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'endorsedProduct',
    component: EndorsedProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'endorsmentProduct',
    component: EndorsementProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'bookingRequestHistory',
    component: BookingRequestHistoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'viewUser',
    component: ViewUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'editUser',
    component: EditUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'editProduct',
    component: EditProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'viewProduct',
    component: ViewProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'editOrder',
    component: EditOrderComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'viewOrder',
    component: ViewOrderComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'view',
    component: ViewVendorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit',
    component: EditVendorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'category',
    component: CategoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'transaltions',
    component: GetTranslationsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'transaltions',
    component: GetTranslationsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin-endorment',
    component: AdminEndormentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'deals',
    component: DealsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'banner',
    component: BannerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'editcategory',
    component: EditcategoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'addcategory',
    component: AddcategoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'viewcategory',
    component: ViewcategoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cms',
    component: CmsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'about',
    component: AboutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'faq',
    component: FaqComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'subcategory',
    component: SubcategoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'editsubcategory',
    component: EditsubcategoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'viewsubcategory',
    component: ViewsubcategoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'addsubcategory',
    component: AddsubcategoryComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'viewdiscount',
    component: ViewdiscountComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'editdiscount',
    component: EditdiscountComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'offerdeals',
    component: OfferdealsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'addoffers',
    component: AddoffersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'notification',
    component: NotificationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'termcondition',
    component: TermconditionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'contactus',
    component: ContactusComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'privacypolicy',
    component: PrivacypolicyComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'returnpolicy',
    component: ReturnpolicyComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ventorT',
    component: VentorTComponent,
    canActivate: [AuthGuard]
  },


  {
    path: 'salesreport',
    component: SalesreportComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'revenuereport',
    component: RevenuereportComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reveuegraph',
    component: ReveuegraphComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'salesgraph',
    component: SalesgraphComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'changepassword',
    component: ChangepasswordComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'editprofile',
    component: EditprofileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'vendorSalesReport',
    component: VendorSalesReportComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'reportGraph',
    component: ReportGraphComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'termofuse',
    component: TermofuseComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'termofsales',
    component: TermofsalesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'consumerprivacypolicy',
    component: ConsumerprivacypolicyComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'warrantypolicy',
    component: WarrantypolicyComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'deliveryAddress',
    component: DeliveryAddressComponent,
    canActivate: [AuthGuard]

  }, {
    path: 'graph',
    component: GraphComponent,
    canActivate: [AuthGuard]


  },
  {
    path: 'push-notification',
    component: BroadcastComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'Settings',
    component: SettingsComponent,
    canActivate: [AuthGuard]
  }
  ,
  {
    path: 'sub-admin-list',
    component: SubAdminListComponent,

    canActivate: [AuthGuard]
  }
  ,
  {
    path: 'sub-admin-add',
    component: SubAdminAddComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'get-translations',
    component: GetTranslationsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
