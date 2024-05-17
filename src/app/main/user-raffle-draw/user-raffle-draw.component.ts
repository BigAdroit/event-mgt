import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseServiceService } from 'src/app/services/firebase/firebase-service.service';
import { NotifierServiceService } from 'src/app/services/notification/notifier-service.service';
import { SuccessModalComponent } from 'src/app/shared/nodals/success-modal/success-modal.component';

@Component({
  selector: 'app-user-raffle-draw',
  templateUrl: './user-raffle-draw.component.html',
  styleUrls: ['./user-raffle-draw.component.scss']
})
export class UserRaffleDrawComponent implements OnInit {
  userId! : string
  isLoading = false;
  isLoadingDecline = false;
  currentUser : any
  userArray = [] as Array<any>
  showLoader = false;

  constructor(
    private firbaseService : FirebaseServiceService,
    private router : Router,
    private notifier : NotifierServiceService,
    private activateRoute : ActivatedRoute,
    private matDialog : MatDialog
  ){
    this.userId = String(this.activateRoute.snapshot.paramMap.get('id'))

    this.firbaseService.readFromCollection('organisations').subscribe((res : any)=> {
      let dataArray = res.events as Array<any> || []
      // console.log(this.getEventByName('corporate_attendance_event_1', dataArray)[0])
      this.userArray = this.getEventByName('corporate_attendance_event_1', dataArray)[0].users
      this.showLoader = false
      this.currentUser = this.userArray.filter((item : any)=> {
        if(item.phoneNumber == this.userId) {
          return item
        }
      })[0]
      if(!this.currentUser) {
        this.showLoader = false;
        this.notifier.publishMessage('error', "User not found")
      }
      localStorage.setItem('unixData', JSON.stringify(this.currentUser));
      sessionStorage.setItem('unixID', this.userId) 
      if (this.currentUser.hasOwnProperty('ticketNumber')) {
        // console.log('Key "key1" exists in the object.');
        this.router.navigateByUrl(`/profile/${this.userId}`)
    } else {
        // console.log('Key "key1" does not exist in the object.');
    }
      console.log(this.currentUser)
    })
  }
  numberRange : number[] = []

  ngOnInit(): void {
    
  }

  getEventByName(eventName : string, data: Array<any> = []) {
    return data.filter((item : any)=> {
      if(item.id == eventName) {
        return item
      }
    })
  }

  getNumberRange(start : number, end : number) {
    // this.numberRange = Array.from(Array(range))
    for(let i = start; i<= end; i++) {
      this.numberRange.push(i)
    }
  }

  selectNumber(num : number) {
    console.log(num)
    this.isLoading = true;
    
    this.firbaseService.addRaffleTicket('corporate_attendance','corporate_attendance_event_1',this.userId, num).then((res)=> {
      // console.log(res)
      this.isLoading = false;
      if(res){
      
        // this.toggleModal()
        this.notifier.publishMessage('success', `Ticket booked successfully`)
        this.router.navigateByUrl(`/profile/${this.userId}`)
      }
    }).catch((error)=> {
      this.isLoading = false;
      this.notifier.publishMessage('error', error)
        // console.log(error)
    })
  }

  
  toggleModal() {
    // this.showModal = true;
    this.matDialog.open(SuccessModalComponent, {
      data : {
        userId : this.userId
      },
      hasBackdrop : false
    })
  }
}
