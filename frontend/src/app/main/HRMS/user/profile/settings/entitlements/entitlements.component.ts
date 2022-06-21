import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EntitlementsService } from 'src/app/service/AUTHO/entitlements.service';

@Component({
  selector: 'entitlements',
  templateUrl: './entitlements.component.html',
  styleUrls: ['./entitlements.component.css']
})
export class EntitlementsComponent implements OnInit {

  form:any
  user:any
  entitlements:any
  checkValueDict:any = {}

  constructor(private formBuilder:FormBuilder, private entSevice:EntitlementsService, private route:ActivatedRoute, public element: ElementRef) {
    this.form = FormGroup
    this.user = this.route.snapshot.paramMap.get('uid')
    this.form = this.formBuilder.group({
      create:[null,[Validators.required]],
      update:[null,[Validators.required]],
      delete:[null,[Validators.required]],
    })
  }

  ngOnInit(){
    let formData = new FormData()
    formData.append('user', this.user)
    this.entSevice.getUserEntitlements().subscribe(response => {
      if(response.success){
        this.entitlements = response.data
        console.log(this.entitlements)
      }
    }, err => console.log(err))
  }

  getChangedValue(event:any){
    this.checkValueDict[event.target.id] = event.target.checked
  }
  
  switchAllButtons(event:any){
    console.log(this.checkValueDict)
    let formData = new FormData();
    for (let key in this.checkValueDict){
      console.log(key)
      let value = this.checkValueDict[key]
      formData.append(key, value)
    }
    formData.append('user',this.user)
    this.entSevice.setUserEntitlements(formData).subscribe(response => {
      if (response.success){
        console.log(response)
      }
    })
  }

}
