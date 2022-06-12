import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/AUTH/auth.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form:any;
  inputType:any = "password"
  showPassword:boolean = true;

  constructor(private formBuilder:FormBuilder, private service:AuthService, private router:Router) {
    this.form = FormGroup;
   }

  ngOnInit(){
    this.form = this.formBuilder.group({
      email:[null, [Validators.required, Validators.email]],
      password:[null,Validators.required],
      confirmpassword:[null,Validators.required],
      agree_terms:[null,Validators.required]
    })
  }

  registerUser(){
    let formValue = this.form.getRawValue()
    let formData = new FormData();

    formData.append('email',formValue['email'])
    formData.append('password',formValue['password'])

    this.service.registerUser(formData).subscribe(response => {
      if(response.status){
        this.router.navigate(['/auth/login'])
      }
    }, err => console.log(err))
  }

  changePasswordState(src:any){
    console.log(src)
    this.showPassword = !this.showPassword
    if(this.showPassword){
      this.inputType = 'text'
    } else {
      this.inputType = 'password'
    }
  }

}
