
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.scss']
})

export class CmsComponent implements OnInit {
name = 'ng4-ckeditor';
  ckeConfig: any;
  mycontent: string;
  log: string = '';
  
 
  constructor() {
     this.mycontent = `<p>My html content</p>`;
   }

 ngOnInit() {
    this.ckeConfig = {
      allowedContent: false,
      extraPlugins: 'divarea',
      forcePasteAsPlainText: true
    };
  }

 
}


