import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewinventory',
  templateUrl: './viewinventory.component.html',
  styleUrls: ['./viewinventory.component.scss']
})
export class ViewinventoryComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  goToinventry(){
    this.router.navigate(['inventryManagement'])
  }
}
