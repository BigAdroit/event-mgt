import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.scss']
})
export class SuccessModalComponent {
  constructor(
    private matDialogRef : MatDialogRef<SuccessModalComponent>,
    private router : Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){}
  directMessage(){
    this.matDialogRef.close()
    this.router.navigateByUrl(`/message/${this.data.userId}`)
  }

  cancle() {
    this.matDialogRef.close()
    this.router.navigateByUrl(`/welcome`)
    // this.toggleModal()
  }
}
