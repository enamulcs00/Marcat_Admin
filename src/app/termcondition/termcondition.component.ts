import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api.service';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'app-termcondition',
  templateUrl: './termcondition.component.html',
  styleUrls: ['./termcondition.component.scss']
})
export class TermconditionComponent implements OnInit {

  name = 'ng4-ckeditor';
  ckeConfig: any;
  mycontent: string;
  log: string = '';
  title: string = "Term and Condition"
  slugName = "tnc";
  termsAndCondition: any;
  id: any;
  constructor(private apiService: ApiService, private commonService: CommonService) {

  }

  getAllCms() {
    let allCms
    this.apiService.getAllCMs().subscribe(res => {
      console.log(res);
      if (res.success) {
        debugger
        allCms = res.data[0];
        this.id = allCms._id
        this.termsAndCondition = allCms.tnc;
        this.mycontent = this.termsAndCondition;
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
    let body = {
      'tnc': this.mycontent,
      'id': this.id

    }



    this.apiService.updateTax(body).subscribe(res => {
      console.log(res)

      if (res.success == true) {
        this.commonService.successToast("Updated Successfully");
        this.getAllCms();
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
