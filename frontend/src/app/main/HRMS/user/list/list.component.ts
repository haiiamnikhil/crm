import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/HRMS/user.service';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  userList:any;
  uid:any

  constructor(private service: UserService) {}

  ngOnInit(){
    this.service.listUser().subscribe(response => {
      if (response.success){
        this.userList=response.data
      }
    }, err=>console.log(err))
  }

  passUserUid(uid:string){
    this.uid= uid
  }

  confirmDelete(){
    let formData = new FormData();
    formData.append('uid',this.uid)
    this.service.deleteUser(formData).subscribe(response => {
      if (response){
        window.location.reload()
      }
    }, err => console.log(err))
  }

}
