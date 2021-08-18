import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api.service';
import { CommonService } from 'src/services/common.service';
import { NotificationService } from 'src/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  notificationList: any;
  id: any;

  constructor(private apiService: ApiService, private commonService: CommonService, private notification: NotificationService) {

    this.id = JSON.parse(localStorage.getItem('User'))._id
    console.log(this.id)

  }

  ngOnInit() {

    this.getNotificationList()
  }


  getNotificationList() {
    let type = "admin"
    let page = '';
    let count = ''
    this.apiService.getNotification(type, page, count).subscribe(res => {
      console.log(res);
      if (res.success == true) {

        this.commonService.notificationCount.next(0)
        this.notificationList = res.data;
        // this.notification.socket.emit('clearBadge', { 'userId': this.id })
      }
    })


  }


  back() {
    window.history.back()
  }

}
