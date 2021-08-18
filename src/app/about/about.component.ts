import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api.service';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  name = 'ng4-ckeditor';
  ckeConfig: any;
  mycontent: string;
  log: string = '';
  title: string = "About Us"
  slugName = "terms-of-sales";
  termsAndCondition: any;
  id: any;
  constructor(private apiService: ApiService, private commonService: CommonService) {

  }

  getAllCms() {
    let allCms
    this.apiService.getAllCMs().subscribe(res => {
      
      if (res.success == true) {
        allCms = res.data[0];
        this.id=allCms._id
        this.termsAndCondition = allCms.aboutUs;
        this.mycontent = this.termsAndCondition;
        

      }

    })
  }


  ngOnInit() {
    this.getAllCms();
    this.ckeConfig = {
      allowedContent: false,
      extraPlugins: 'divarea',
      forcePasteAsPlainText: true
    };
  }
  updateTermAndCondition() {
let body={
   'aboutUs': this.mycontent,
   'id':this.id
  }

    this.apiService.updateTax(body).subscribe(res => {
     
      if (res.success == true) {
        this.commonService.successToast("Updated Successfully")
        this.getAllCms()
      }

    })

  }


  onChange($event: any): void {
    //this.log += new Date() + "<br />";
  }

  onPaste($event: any): void {
    //this.log += new Date() + "<br />";
  }
}
