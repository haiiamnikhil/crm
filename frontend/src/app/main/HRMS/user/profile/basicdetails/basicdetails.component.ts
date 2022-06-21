import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'basicdetails',
  templateUrl: './basicdetails.component.html',
  styleUrls: ['./basicdetails.component.css']
})
export class BasicdetailsComponent implements OnInit {

  @Input() userDetails:any

  constructor() { }

  ngOnInit(){
  }

}
