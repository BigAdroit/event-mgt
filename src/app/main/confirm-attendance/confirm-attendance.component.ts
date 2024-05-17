import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseServiceService } from 'src/app/services/firebase/firebase-service.service';
import { NotifierServiceService } from 'src/app/services/notification/notifier-service.service';
import { SuccessModalComponent } from 'src/app/shared/nodals/success-modal/success-modal.component';

@Component({
  selector: 'app-confirm-attendance',
  templateUrl: './confirm-attendance.component.html',
  styleUrls: ['./confirm-attendance.component.scss']
})
export class ConfirmAttendanceComponent implements OnInit {
  userId! : string
  isLoading = false;
  isLoadingDecline = false;
  currentUser : any
  userArray = [] as Array<any>
  showLoader = false;
  @ViewChild('modalElement') modalElement!: ElementRef;
  showModal = false as boolean;

  // ngAfterViewInit(): void {
  //   if(this.modalElement)
  // }

  constructor(
    private firbaseService : FirebaseServiceService,
    private router : Router,
    private notifier : NotifierServiceService,
    private activateRoute : ActivatedRoute,
    private matDialog : MatDialog

    // private 
  ){
    this.userId = String(this.activateRoute.snapshot.paramMap.get('id'))
    this.showLoader = true

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
      if (this.currentUser.hasOwnProperty('confirmAttendance')) {
        // console.log('Key "key1" exists in the object.');
        this.router.navigateByUrl(`/welcome`)
    } else {
        // console.log('Key "key1" does not exist in the object.');
    }
      console.log(this.currentUser)
    })
  }

  ngOnInit(): void {
    // this.toggleModal()
   
    // if(this.currentUser.confirmAttendance !== null || undefined) {
    // }
  }

  getEventByName(eventName : string, data: Array<any> = []) {
    return data.filter((item : any)=> {
      if(item.id == eventName) {
        return item
      }
    })
  }

  confirmInvite() {
    this.isLoading = true;
    
    this.firbaseService.UpdateInvite('corporate_attendance','corporate_attendance_event_1',this.userId, true).then((res)=> {
      // console.log(res)
      this.isLoading = false;
      if(res){
      
        this.toggleModal()
        this.notifier.publishMessage('success', `Attendance confirmed`)
      }
    }).catch((error)=> {
      this.isLoading = false;
      this.notifier.publishMessage('error', error)
        // console.log(error)
    })
  }

  declineInvite() {
    this.isLoadingDecline = true;
    this.firbaseService.UpdateInvite('corporate_attendance','corporate_attendance_event_1',this.userId, false).then((res)=> {
      // console.log(res)
      this.isLoadingDecline = false;
      if(res){
        this.notifier.publishMessage('success', `Attendance declined`)
        this.toggleModal()
        // this.router.navigateByUrl('/items')
      }
    }).catch((error)=> {
      this.isLoadingDecline = false
        // console.log(error)
        this.notifier.publishMessage('error', error)

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
  
  

  // sendMessage() {
  //   this.firbaseService.sendMessage('corporate_attendance','corporate_attendance_event_1',this.userId, this.messageForm.value.message).then((res)=> {
  //     // console.log(res)
  //     if(res){
  //       this.router.navigateByUrl('/confirm')
  //     }
  //   }).catch((error)=> {
  //       console.log(error)
  //   })
  // }
}
