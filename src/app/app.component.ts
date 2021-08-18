import { Component } from '@angular/core';
import { NotificationService } from 'src/services/notification.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'nunuAdminPanel';

  constructor(private notification: NotificationService) {
    // this.id = JSON.parse(localStorage.getItem('User')).id

  }
}
