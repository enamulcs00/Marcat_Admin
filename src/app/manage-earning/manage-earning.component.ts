import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-earning',
  templateUrl: './manage-earning.component.html',
  styleUrls: ['./manage-earning.component.scss']
})
export class ManageEarningComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  goTopayment() {
    this.router.navigate(['payment']);
  }
}
