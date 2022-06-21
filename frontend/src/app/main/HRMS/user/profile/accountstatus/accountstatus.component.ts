import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/HRMS/user.service';

@Component({
  selector: 'accountstatus',
  templateUrl: './accountstatus.component.html',
  styleUrls: ['./accountstatus.component.css']
})
export class AccountstatusComponent implements OnInit {

  form: any
  isBusy: any
  uid: any

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, public router: Router, private service: UserService) {
    this.form = FormGroup
    this.isBusy = Boolean
    this.uid = String
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      confirm: [null, Validators.required]
    })
    this.uid = this.route.snapshot.paramMap.get('uid')
    console.log(this.uid)
  }
  
  accountStatus() {
    let formValue = this.form.getRawValue()
    let formData = new FormData;

    let activate: string = '/user/profile/'+this.uid+'/activate';
    let deactivate: string = '/user/profile/'+this.uid+'/deactivate';
    
    if (formValue['confirm'] && this.router.url == activate) {
      formValue['confirm'] = true
    } else if (formValue['confirm'] && this.router.url == deactivate) {
      formValue['confirm'] = false
    }

    formData.append('uid', this.uid)
    formData.append('status', formValue['confirm'])

    this.service.changeAccountStatus(formData).subscribe(response => {
      if (response.success) {
        this.router.navigate(['/user/profile/',this.uid])
      }
    }, err => console.log(err))
  }
}
