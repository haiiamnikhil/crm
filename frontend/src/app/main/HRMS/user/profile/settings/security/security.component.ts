import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/AUTH/auth.service';

@Component({
  selector: 'security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {

  form:any

  constructor(private formBuilder:FormBuilder, private authService:AuthService) {
    this.form = FormGroup;
  }

  ngOnInit(){
    this.form = this.formBuilder.group({
      oldPassword : [null, Validators.required],
      newPassword : [null, Validators.required],
      confirmPassword : [null, Validators.required],
    })
  }

  updatePassword(){
    let formValue = this.form.getRawValue()
    let formData = new FormData();
    formData.append('old_password',formValue['oldPassword'])
    formData.append('new_password',formValue['newPassword'])
    this.authService.updatePassword(formData).subscribe(response => {
      console.log(response)
      // if (response.success){

      // }
    })
  }

}
