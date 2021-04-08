import { ApiService } from 'src/services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';

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

  constructor(private service: ApiService, private formBuilder: FormBuilder) { }
  data1: any;
  ngOnInit() {

    this.getTransaltion()


    this.dataForm = this.formBuilder.group({
      check:['']
    });
  }





  getTransaltion() {
    this.service.getTranslations().subscribe((d => {

      console.log('check data of translations', d.data);
      let data1 = d.data[0].data;
      this.createGroup(data1)
    }))
  }

  translatiosMethod(): FormGroup {
    return this.dataForm as FormGroup;
  }

  createGroup(data) {
    debugger
    for (let i in data) {
      console.log(data[i].value);
      this.dataForm.addControl(i, this.formBuilder.group({
        name: [data[i].name, Validators.required],
        name_ar: [data[i].name_ar, Validators.required]
      }))
      // i = this.formBuilder.group({
      //   name: [data[i].name, Validators.required],
      //   name_ar: [data[i].name_ar, Validators.required]
      // })
      // this.translatiosMethod().push(i)


    }
    console.log('check', this.dataForm.value);
    this.hasKey = Object.keys(this.dataForm.value).length > 0 ? true : false



  }

  save(){
    debugger
    console.log(this.dataForm.value);
    
    if(this.dataForm.valid){
      console.log(this.dataForm);
      
    }
  }

  createFormGroup(data): FormGroup {
    return
  }


}
