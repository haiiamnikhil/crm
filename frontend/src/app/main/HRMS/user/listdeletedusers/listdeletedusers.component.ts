import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/HRMS/user.service';

@Component({
  selector: 'app-listdeletedusers',
  templateUrl: './listdeletedusers.component.html',
  styleUrls: ['./listdeletedusers.component.css']
})
export class ListdeletedusersComponent implements OnInit {

  deletedUserList:any;
  uid:any

  constructor(private service: UserService) { }

  ngOnInit(){
    this.service.listDeleatedUser().subscribe(response => {
      if (response.success){
        this.deletedUserList=response.data
      }
    }, err=>console.log(err))
  }

  getUseruid(uid:string){
    this.uid= uid
  }

  confirmRecover(){
    let formData = new FormData();
    formData.append('uid',this.uid)
    this.service.recoverUser(formData).subscribe(response => {
      if (response){
        window.location.reload()
      }
    }, err => console.log(err))
  }

}
