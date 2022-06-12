import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './service/HRMS/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontend';


  constructor(public router:Router, private service:UserService){
    if (localStorage.getItem('currentUser')){
      this.service.presentUser().subscribe(response => {
        if (response.success){
          this.service.user.next([response.user])
        }
      }, err => console.log(err))
    }
  }

  ngOnInit(){
    
  }
}
