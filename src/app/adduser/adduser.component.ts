import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  goTomanageUser() {
    this.router.navigate(['/manageUser'])
  }
}
