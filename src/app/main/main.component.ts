import { Component, OnInit } from '@angular/core';
import { FirebaseServiceService } from '../services/firebase/firebase-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotifierServiceService } from '../services/notification/notifier-service.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  userArray = [] as Array<any>
  userId! : string
  currentUser : any
  messageForm! : FormGroup
  hasErrors = false as boolean;
  isLoading = false as boolean;
  constructor(
    private firbaseService : FirebaseServiceService,
    private activateRoute : ActivatedRoute,
    private router : Router,
    private fb : FormBuilder,
    private notifier : NotifierServiceService
  ){
    this.userId = String(this.activateRoute.snapshot.paramMap.get('id'))
    // sessionStorage.setItem('TD_uxid', this.userId)
    // console.log(this.userId)
  }


  ngOnInit(): void {
    this.messageForm = this.fb.group({
      message : ['', Validators.required]
    })
    this.firbaseService.readFromCollection('organisations').subscribe((res : any)=> {
      // console.log(res)
      // res.forEach((doc : any)=> {
      //   console.log(doc)
      // })
      let dataArray = res.events as Array<any> || []
      console.log(this.getEventByName('corporate_attendance_event_1', dataArray)[0])
      this.userArray = this.getEventByName('corporate_attendance_event_1', dataArray)[0].users
      // console.log('All Users', this.userArray)
      this.currentUser = this.userArray.filter((item : any)=> {
        if(item.phoneNumber == this.userId) {
          return item
        }
      })[0]
      if (this.currentUser.hasOwnProperty('message')) {
        // console.log('Key "key1" exists in the object.');
        // this.notifier.publishMessage('success', "Message already exist")
        this.router.navigateByUrl(`/welcome`);
      } else {
        // console.log('Key "key1" does not exist in the object.');
    ``}

      // console.log(this.currentUser)
    })
  }

  getEventByName(eventName : string, data: Array<any> = []) {
    return data.filter((item : any)=> {
      if(item.id == eventName) {
        return item
      }
    })
  }

  sendMessage() {
    if(this.messageForm.invalid) {
      this.hasErrors = true
    }else {

      this.isLoading = true
      this.firbaseService.sendMessage('corporate_attendance','corporate_attendance_event_1',this.userId, this.messageForm.value.message).then((res)=> {
        // console.log(res)
        this.isLoading = false
        this.notifier.publishMessage('success', 'Your message has been sent ')
        if(res){
          this.router.navigateByUrl('/welcome');
        }
      }).catch((error)=> {
        this.notifier.publishMessage('error', String(error))
          // console.log(error)
          this.isLoading = false
      })
    }
  }
}
