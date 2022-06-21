import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/AUTH/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form:any
  message:any

  constructor(private router:Router, private service:AuthService, private formBuilder:FormBuilder) { 
    this.form = FormData;
    this.form = this.formBuilder.group({
      email:[null,[Validators.required, Validators.email]],
      password:[null,Validators.required]
    })
  }

  ngOnInit(){
    
  }

  loginUser(){
    let formValue = this.form.getRawValue()
    let formData = new FormData();
    formData.append('username',formValue['email'])
    formData.append('password',formValue['password'])
    this.service.loginUser(formData).subscribe(response => {
      if(response.access){
        this.service.updateData(response['access'])
        window.location.href = '/user/list-user'
      }else{
        this.message = "Please Enter the Credentials Correctly"
      }
    }, err => console.log(err))
  }
}
