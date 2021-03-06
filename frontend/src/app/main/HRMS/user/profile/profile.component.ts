import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UserService } from 'src/app/service/HRMS/user.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  imageSrc: any = '../assets/img/profile/default-profile.png';
  userDetails:any
  viewMode:string ='basic-details'
  user:any

  constructor(private router:ActivatedRoute, private service: UserService, private route:Router) {
  }

  ngOnInit(){
    this.user = this.router.snapshot.paramMap.get('uid')
  
    this.service.fetchUserDetails(this.user).subscribe(response => {
      if (response.success){
        this.userDetails = [response.user]
        this.imageSrc = this.service.BASE_URL + response.user['profile_image']
      }
    }, err => console.log(err))
  }

}
