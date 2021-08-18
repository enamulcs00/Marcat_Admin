import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  goTomanageUser() {
    this.router.navigate(['/manageUser'])
  }
}
