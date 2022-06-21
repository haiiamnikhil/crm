import { Component, OnInit } from '@angular/core';
import { EntitlementsService } from 'src/app/service/AUTHO/entitlements.service';
import { UserService } from 'src/app/service/HRMS/user.service';

@Component({
  selector: 'globalentitlements',
  templateUrl: './globalentitlements.component.html',
  styleUrls: ['./globalentitlements.component.css']
})
export class GlobalentitlementsComponent implements OnInit {

  viewMode:string = 'admin'
  userRoles:any
  userRoleEntitlement:any
  selectedRole:any
  changedEnt:any = {}

  constructor(private service:UserService, private entService:EntitlementsService) { }

  ngOnInit(){
    this.service.getUserRoles().subscribe(response => {
      if (response.success){
        this.userRoles = response.role
        this.selectedRole = this.userRoles[0].role
      }
    }, err => console.log(err))
    this.entService.getUserRoleEntitlements().subscribe(response => {
      if (response.success){
        this.userRoleEntitlement = response.data
      }
    }, err => console.log(err))
  }

  renderRoleEntitlement(event:any){
    this.selectedRole = event
  }

  changedEntitlements(event:any){
    let id = event.target.id
    if(event.target.checked){
      this.changedEnt[id] = 'True'
    } else{
      this.changedEnt[id] = 'False'
    }
    console.log(this.changedEnt)
  }

  updateEntitlement(){
    let formData = new FormData();
    formData.append('role',JSON.stringify(this.changedEnt))
    this.entService.updateUserRoleEntitlements(formData).subscribe(response => {
      if (response.success){
        window.location.reload()
      }
    }, err => console.log(err.error.detail))
  }
}
