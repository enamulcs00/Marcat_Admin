import { Injectable } from "@angular/core";
//import { NgxSpinnerService } from "ngx-spinner";
import { ToastrManager } from "ng6-toastr-notifications";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { UrlService } from "./url.service";
import * as io from 'socket.io-client';

@Injectable({
    providedIn: "root"
})
export class NotificationService {


    // socket;
    // constructor(private UrlService: UrlService) { }
    // setupSocketConnection() {
    //     this.socket = io(this.UrlService.SERVER_URL);
    //     console.log("socket connected");


    // }
}
