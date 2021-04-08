import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/services/api.service';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'app-broadcast',
  templateUrl: './broadcast.component.html',
  styleUrls: ['./broadcast.component.scss']
})
export class BroadcastComponent implements OnInit {

  broadcastForm: FormGroup
  constructor(private fb: FormBuilder, private apiService: ApiService, private commonService: CommonService) { }

  ngOnInit() {
    this.broadcastForm = this.fb.group({
      type: ['', Validators.required],
      title: ['', Validators.required],
      message: ['', Validators.required],

    })
  }


  sendNotification() {
    console.log(this.broadcastForm.value);
    let body = this.broadcastForm.value
    this.apiService.broadcastNotification(body).subscribe(res => {
      console.log(res);
      if (res.success == true) {
        this.commonService.successToast("Notification sent successfully");
      }
    })

  }




  back() {
    window.history.back()
  }
}
