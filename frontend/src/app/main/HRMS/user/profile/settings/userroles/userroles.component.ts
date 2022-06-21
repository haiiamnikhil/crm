import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/HRMS/user.service';

@Component({
  selector: 'userroles',
  templateUrl: './userroles.component.html',
  styleUrls: ['./userroles.component.css'],
  providers:[TitleCasePipe]
})
export class UserrolesComponent implements OnInit {

  form:FormGroup
  userRoles:any = []
  presentUserRoles:any = []
  removeUserRoles:any = []
  username:any
  buttonState:boolean = false

  constructor(private formBuilder:FormBuilder, private titleCasePipe:TitleCasePipe, private service:UserService, private router:Router, private route:ActivatedRoute) {
    this.form = this.formBuilder.group({
      role : [null, Validators.required]
    })
  }

  ngOnInit(){
    this.service.getUserRoles().subscribe(response => {
      if (response.success){
        this.presentUserRoles = response.role
      }
    }, err => console.log(err))
  }

  addUserRoles(){
    let role = this.titleCasePipe.transform(this.form.controls['role'].value)
    this.userRoles.push(role)
    this.form.reset()
  }

  removeUserRole(index:number){
    this.userRoles.splice(index,1)
  }

  saveUserRoles(){
    this.username = this.route.snapshot.paramMap.get('uid')
    let formData = new FormData();
    formData.append('role',this.userRoles)
    this.service.addUserRoles(formData).subscribe(resposne => {
      if (resposne.success){
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/user/profile/',this.username]);
      }
    }, err => console.log(err))
  }

  removeExistingUserRoles(index:number){
    this.buttonState = true
    this.removeUserRoles.push(this.presentUserRoles.splice(index, 1)[0]['id'])
  }

  updatePresentUserRoles(){
    let formData = new FormData();
    formData.append('role',this.removeUserRoles)
    this.service.updateUserRoles(formData).subscribe(response => {
      if (response.success){
        window.location.reload()
      }
    }, err => console.log(err))
  }
}
