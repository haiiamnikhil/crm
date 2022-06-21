import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  
  @Input() userDetails:any

  constructor() { }

  ngOnInit(){
  }
}
