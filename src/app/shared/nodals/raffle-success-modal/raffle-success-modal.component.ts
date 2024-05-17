import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-raffle-success-modal',
  templateUrl: './raffle-success-modal.component.html',
  styleUrls: ['./raffle-success-modal.component.scss']
})
export class RaffleSuccessModalComponent implements OnInit {
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private matDialogRef : MatDialogRef<RaffleSuccessModalComponent>
  ) {}

  ngOnInit(): void {
    console.log(this.data)
  }

  closeModal(){
    this.matDialogRef.close()
  }
}
