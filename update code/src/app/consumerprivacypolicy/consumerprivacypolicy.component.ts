import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api.service';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'app-consumerprivacypolicy',
  templateUrl: './consumerprivacypolicy.component.html',
  styleUrls: ['./consumerprivacypolicy.component.scss']
})
export class ConsumerprivacypolicyComponent implements OnInit {

  name = 'ng4-ckeditor';
  ckeConfig: any;
  mycontent: string;
  log: string = '';
  title: string = "Privacy Policy"
  slugName = "privacy-policy";
  termsAndCondition: any;
  constructor(private apiService: ApiService, private commonService: CommonService) {

  }

  getAllCms() {
    let allCms = []
    this.apiService.getAllCMs().subscribe(res => {
      if (res.success == true) {
        allCms = res.data;
        this.termsAndCondition = allCms.find(ele => ele.slugName == this.slugName);
        this.mycontent = this.termsAndCondition.description;


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

    this.termsAndCondition.description = this.mycontent


    this.apiService.updateCMS(this.termsAndCondition).subscribe(res => {

      if (res.success == true) {
        this.commonService.successToast("Updated Successfully")
      }

    })

  }


  onChange($event: any): void {
    //this.log += new Date() + "<br />";
  }

  onPaste($event: any): void {
    //this.log += new Date() + "<br />";
  }


  back() {
    window.history.back()
  }
}