import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-success-page',
  templateUrl: './success-page.component.html',
  styleUrls: ['./success-page.component.scss']
})
export class SuccessPageComponent implements OnInit {
  firstName! : string
  constructor(){
  this.firstName = String(sessionStorage.getItem('unixName')!)
  }
  ngOnInit(): void {
    
  }
}
