import { ApiService } from 'src/services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'app-get-translations',
  templateUrl: './get-translations.component.html',
  styleUrls: ['./get-translations.component.scss']
})
export class GetTranslationsComponent implements OnInit {
  dataForm: FormGroup;

  hasKey: boolean = false;
  // sample={
  //   "name": "Phone Number",
  //   "name_ar": "Phone Number"
  // }

  constructor(private service: ApiService, private formBuilder: FormBuilder, private commonService: CommonService) { }
  data1: any;
  ngOnInit() {

    this.getTransaltion()


    this.dataForm = this.formBuilder.group({

    });
  }





  getTransaltion() {
    this.service.getTranslations().subscribe((d => {

      // console.log('check data of translations', d.data);
      let data1 = d.data[0].data;
      this.createGroup(data1)
    }))
  }

  translatiosMethod(): FormGroup {
    return this.dataForm as FormGroup;
  }

  createGroup(data) {

    for (let i in data) {
      console.log(data[i].value);
      this.dataForm.addControl(i, this.formBuilder.group({
        name: [data[i].name, Validators.required],
        name_ar: [data[i].name_ar, Validators.required]
      }))

      this.dataForm.updateValueAndValidity()
    }
    console.log('check', this.dataForm.value);
    this.hasKey = Object.keys(this.dataForm.value).length > 0 ? true : false



  }

  save() {

    let body
    if (this.dataForm.valid) {
      console.log(this.dataForm);
      console.log(this.dataForm.value);
      body = {
        'data': this.dataForm.value
      }

      this.service.postTranlastions(body).subscribe(res => {
        console.log(res);
        if (res.success) {
          this.commonService.successToast(res.message);
          this.getTransaltion()
        } else {
          this.commonService.errorToast(res.message)
        }
      })
    }
  }



}
