import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api.service';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'app-privacypolicy',
  templateUrl: './privacypolicy.component.html',
  styleUrls: ['./privacypolicy.component.scss']
})
export class PrivacypolicyComponent implements OnInit {

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
      console.log(res);
      if (res.success == true) {
        allCms = res.data;
        this.termsAndCondition = allCms.find(ele => ele.slugName == this.slugName);
        this.mycontent = this.termsAndCondition.description;
        console.log(this.termsAndCondition);


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
      console.log(res)

      if (res.success == true) {
        this.commonService.successToast("Updated Successfully")
      } else {

      }

    })

  }


  onChange($event: any): void {
    console.log("onChange");
    //this.log += new Date() + "<br />";
  }

  onPaste($event: any): void {
    console.log("onPaste");
    //this.log += new Date() + "<br />";
  }
}
