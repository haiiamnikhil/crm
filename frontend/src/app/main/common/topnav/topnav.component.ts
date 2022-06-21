import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/AUTH/auth.service';
import { UserService } from 'src/app/service/HRMS/user.service';

@Component({
  selector: 'topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {

  userDetails:any
  constructor(private service:AuthService, private router:Router, private presentUser:UserService) { 
  }
  
  ngOnInit(){
    this.presentUser.user.subscribe(user => {
      this.userDetails = user
      sessionStorage.setItem('user',JSON.stringify(this.userDetails))
    })
  }

  logoutUser(){
    this.service.logoutUser().subscribe(response => {
      if (response.success){
        this.service.removeToken()
        this.router.navigate(['auth/user/login'])
      }
    }, err => console.log(err))
  }

}
