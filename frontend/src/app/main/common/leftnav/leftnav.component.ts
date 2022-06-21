import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'leftnav',
  templateUrl: './leftnav.component.html',
  styleUrls: ['./leftnav.component.css']
})
export class LeftnavComponent implements OnInit {

  viewMode:string = 'dashboard'
  constructor() { }

  ngOnInit(): void {
  }

}
