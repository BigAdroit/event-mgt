import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FirebaseServiceService } from 'src/app/services/firebase/firebase-service.service';
import { NotifierServiceService } from 'src/app/services/notification/notifier-service.service';

@Component({
  selector: 'app-add-seat',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatSelectModule, MatFormFieldModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-seat.component.html',
  styleUrls: ['./add-seat.component.scss']
})
export class AddSeatComponent implements OnInit {
  seatNo : any = ''
  bookedSeat : Array<any> = []
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notifier : NotifierServiceService,
    private firebaseService : FirebaseServiceService,
    private matDialogRef : MatDialogRef<AddSeatComponent>
  ){
    this.bookedSeat = this.data.records
  }
  seats = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8"
  ]

  ngOnInit(): void {
    console.log(this.data)
  }

  close() {
    this.matDialogRef.close(false)
  }

  isSeatBooked(seat: string): boolean {
    return this.bookedSeat.some(bookedSeat => bookedSeat.seatNo === seat);
  }

  updateSeatNumber() {
    const payload = {
      ...this.data,
      seatNo : this.seatNo
    }
    this.matDialogRef.close(payload)
  }


}
