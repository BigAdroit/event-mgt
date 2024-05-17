import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseServiceService } from 'src/app/services/firebase/firebase-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userProfile : any;
  isLoading = false as boolean;
  userId : any
  userArray = [] as Array<any>
  currentUser : any
  constructor(
    private firbaseService : FirebaseServiceService,
    private activateRoute : ActivatedRoute,

  ) {
    this.isLoading = true;
    // this.userId = sessionStorage.getItem('unixID')
    // this.userProfile = JSON.parse(localStorage.getItem('unixData')!)
    this.userId = String(this.activateRoute.snapshot.paramMap.get('id'))
    localStorage.setItem('unixID', JSON.stringify(this.userId))
    this.firbaseService.readFromCollection('organisations').subscribe((res : any)=> {
      let dataArray = res.events as Array<any> || []
      // console.log(this.getEventByName('corporate_attendance_event_1', dataArray)[0])
      this.userArray = this.getEventByName('corporate_attendance_event_1', dataArray)[0].users
      this.isLoading = false
      this.userProfile = this.userArray.filter((item : any)=> {
        if(item.phoneNumber == this.userId) {
          return item
        }
      })[0]
      
      console.log(this.userProfile)
    })
  }

  ngOnInit(): void {
    
  }

  getEventByName(eventName : string, data: Array<any> = []) {
    return data.filter((item : any)=> {
      if(item.id == eventName) {
        return item
      }
    })
  }
}
