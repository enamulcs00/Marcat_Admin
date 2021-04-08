import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { UrlService } from 'src/services/url.service';
import { NotificationService } from 'src/services/notification.service';
import { CommonService } from 'src/services/common.service';

interface Ready {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  imagePath: any
  profileData: any
  id: any;
  badge: number = 0;
  message: any;
  notificationList: any;



  constructor(private router: Router, private apiService: ApiService, private urlService: UrlService, private notificationService: NotificationService, private commonService: CommonService) {

    if (localStorage.getItem('User') != null || localStorage.getItem('User') != undefined) {
      this.id = JSON.parse(localStorage.getItem('User'))._id
      console.log(this.id)
    }
  }
  pick: Ready[] = [
    { value: '10 Min-0', viewValue: 'Arabic' },
    { value: '10 Min-1', viewValue: 'English' },
  ];
  ngOnInit() {

    this.imagePath = this.urlService.imageUrl;
    console.log(this.imagePath);

    // this.notificationService.setupSocketConnection()
    // this.notificationService.socket.on(`admin-notification`, (data) => {
    //   console.log(data);
    //   console.log("new Notification", data)
    //   // this.badge = data.badge
    //   this.commonService.setNotification(true);
    //   this.commonService.notificationCount.next(data.badge)
    //   this.commonService.notificationCount.subscribe(value => {
    //     console.log('count', value);

    //     this.badge = value
    //   })
    //   this.message = data.title;
    //   var option = {
    //     'body': data.body,
    //     'silent': false,


    //   }
    //   var notification = new Notification(this.message, option);
    // });

    this.profileData = JSON.parse(this.apiService.getUser());


  }

  getNotificationList() {
    let type = "admin"
    let page = 1;
    let count = 5
    this.apiService.getNotification(type, page, count).subscribe(res => {
      console.log(res);
      if (res.success == true) {

        this.commonService.notificationCount.next(0)
        this.notificationList = res.data;
        // this.notificationService.socket.emit('clearBadge', { 'userId': this.id })
      }
    })


  }

  filterSelected(e) {


    console.log(e.target.value)
  }

  // getProfile() {
  //   this
  // }
  goTologin() {
    sessionStorage.clear();

    this.router.navigate(['/login'])
  }
  goTonotification() {
    this.router.navigate(['notification'])
  }
  goToprofile() {
    this.router.navigate(['profile'])
  }
  goTochangepassword() {
    this.router.navigate(['changepassword'])
  }
}
