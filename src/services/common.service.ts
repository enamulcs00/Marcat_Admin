import { Injectable } from "@angular/core";
//import { NgxSpinnerService } from "ngx-spinner";
import { ToastrManager } from "ng6-toastr-notifications";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class CommonService {
  baseUrl = "https://appgrowthcompany.com:3000/v1/admin";
  imageUrl = "https://appgrowthcompany.com:3000";
  // https://appgrowthcompany.com:3000/
  //http://192.168.1.98:3000
  constructor(
    // private spinner: NgxSpinnerService,
    private toaster: ToastrManager,
    // private api: ApiService,
    private http: HttpClient
  ) { }
  //   showSpinner() {
  //     this.spinner.show();
  //   }
  //   hideSpinner() {
  //     this.spinner.hide();
  //   }
  successToast(message) {
    this.toaster.successToastr(message, "", {
      maxShown: 1
    });
  }
  errorToast(message) {
    this.toaster.errorToastr(message, "", {
      maxShown: 1
    });
  }


  isNewNotification = new BehaviorSubject<boolean>(false);
  notificationCount = new BehaviorSubject<number>(0)

  getNotification(): Observable<boolean> {
    return this.isNewNotification.asObservable();
  }
  setNotification(value: boolean) {
    console.log(value);

    // this.notificationCount.next()
    console.log(this.notificationCount);

    this.isNewNotification.next(value);
  }

  getNotificationCount() {
    return this.notificationCount.asObservable();
  }


}
