import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/HRMS/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  userList:any;
  constructor(private service: UserService) { }

  ngOnInit(){
    this.service.listUser().subscribe(response => {
      this.userList=response.data
    }, err=>console.log(err))
  }

}
