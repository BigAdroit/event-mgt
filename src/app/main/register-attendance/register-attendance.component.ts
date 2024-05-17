import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseServiceService } from 'src/app/services/firebase/firebase-service.service';
import { NotifierServiceService } from 'src/app/services/notification/notifier-service.service';

@Component({
  selector: 'app-register-attendance',
  templateUrl: './register-attendance.component.html',
  styleUrls: ['./register-attendance.component.scss']
})
export class RegisterAttendanceComponent implements OnInit {
  attendanceForm! : FormGroup;
  hasErrors = false as boolean;
  phoneNumberPattern = /^[0-9+\-\s()]{6,20}$/;
  showLoader = false as boolean
  constructor(
    private fb : FormBuilder,
    private firebaseService : FirebaseServiceService,
    private notifier : NotifierServiceService,
    private router : Router
  ){}

  ngOnInit(): void {
    this.attendanceForm = this.fb.group({
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      emailAddress : ['', [Validators.required, Validators.email]],
      phoneNumber : ['', [Validators.required, Validators.pattern(this.phoneNumberPattern)]],
      organisation : ['', Validators.required],
      designation : ['', Validators.required],
      message : [''],
      channel : ['Web']
    })
  }

  submitAttendance(){

    // console.log('clicked')
    if(this.attendanceForm.valid) {
      this.showLoader = true;
      this.firebaseService.addUser('corporate_attendance','corporate_attendance_event_1', this.attendanceForm.value).then((res)=> {
        // console.log('success', res)
        this.showLoader = false;

        if(res){
          sessionStorage.setItem('unixName', this.attendanceForm.value.firstName)
          // this.sendSMSMessage(this.attendanceForm.value.phoneNumber, Welcome)
          // this.sendSMSMessage()
          // this.notifier.publishMessage('success', 'Attendance sent')
          this.sendEmailMessage()
          // this.router.navigateByUrl('/success')
        }
      }).catch((error)=> {
        this.showLoader = false;

        this.notifier.publishMessage('error', error)
        // console.log('error',error)
      })
    }
  }

  sendSMSMessage(){
    const num = this.attendanceForm.value.phoneNumber
    const message = `Dear ${this.attendanceForm.value.firstName},  thank you for confirming your attendance of Tope Dare' sendforth party holding on Thursday, 28th March 2024, from 5pm at Harbour Point, Victoria Island, Lagos.
    We also appreciate the submission of your goodwill message.
    We shall frequently keep you updated as the event draws nearer.
    Thank you`
    
    this.firebaseService.sendSMS(num, message).subscribe((res)=> {
      console.log(res)
    })
  }

  sendEmailMessage(){

    const payload = {
      email: this.attendanceForm.value.emailAddress,
      lastName: this.attendanceForm.value.lastName,
      firstName: this.attendanceForm.value.firstName,
      message: this.attendanceForm.value.message || "nill",
      placeOfWork: this.attendanceForm.value.organisation,
      designation: this.attendanceForm.value.designation,
      mobileNumber: this.attendanceForm.value.phoneNumber
    }

    this.firebaseService.sendEmail(payload).subscribe((res)=> {
      // console.log(res);
      if(res.isError == false) {
        this.notifier.publishMessage('success', 'Attendance sent')
        this.router.navigateByUrl('/success')
        this.showLoader = false;
      }else {
        this.notifier.publishMessage('error', 'An error occur while processing your request');
        this.showLoader = false;
      }

    })
  }
  
}
