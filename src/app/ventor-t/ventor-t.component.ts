import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api.service';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'app-ventor-t',
  templateUrl: './ventor-t.component.html',
  styleUrls: ['./ventor-t.component.scss']
})
export class VentorTComponent implements OnInit {

  name = 'ng4-ckeditor';
  ckeConfig: any;
  mycontent: string;
  log: string = '';
  title: string = "Vendor Terms and Conditions"
  slugName = "vendor-terms-and-conditions";
  CmsData: any;
  constructor(private apiService: ApiService, private commonService: CommonService) {

  }

  getAllCms() {
    let allCms = []
    this.apiService.getAllCMs().subscribe(res => {
      console.log(res);
      if (res.success == true) {
        allCms = res.data;
        this.CmsData = allCms.find(ele => ele.slugName == this.slugName);
        this.mycontent = this.CmsData.description;
        console.log(this.CmsData);
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

    this.CmsData.description = this.mycontent


    this.apiService.updateCMS(this.CmsData).subscribe(res => {
      console.log(res)
      if (res.success == true) {
        this.commonService.successToast("Updated Successfully")
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


  back() {
    window.history.back()
  }
}
