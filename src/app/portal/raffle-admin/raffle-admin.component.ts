import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseServiceService } from 'src/app/services/firebase/firebase-service.service';
import { NotifierServiceService } from 'src/app/services/notification/notifier-service.service';
import { RaffleSuccessModalComponent } from 'src/app/shared/nodals/raffle-success-modal/raffle-success-modal.component';

@Component({
  selector: 'app-raffle-admin',
  templateUrl: './raffle-admin.component.html',
  styleUrls: ['./raffle-admin.component.scss']
})
export class RaffleAdminComponent implements OnInit {
  showLoader = false as boolean;
  randomNumber1!: number;
  randomNumber2!: number;
  generatedNumbers: number[] = [];
  userArray : Array<any> = []
  showSpinner : boolean = false;


  constructor(
    private firebaseService : FirebaseServiceService,
    private matDialog : MatDialog,
    private notifier : NotifierServiceService,
  ) {
    
  }

  ngOnInit(): void {
    this.getAttendanceRecords()
  }

  
  getAttendanceRecords() {
    this.firebaseService.readFromCollection('organisations').subscribe(async (res : any)=> {
      let dataArray = res.events as Array<any> || []
      // console.log(this.getEventByName('corporate_attendance_event_1', dataArray)[0])
       const arrayValue = this.getEventByName('corporate_attendance_event_1', dataArray)[0].users
       await arrayValue.forEach((item :  any, index: number = 0)=> {
        let sn = index + 1
        const dataValue = {...item, serialNumber : sn}
        // if(!item.tableNo) {
        //   this.unAssigned.push(dataValue)
        // }
        this.userArray.push(dataValue)
        localStorage.setItem('guestList', JSON.stringify(this.userArray))
      }) 
    })
  }

  
  getEventByName(eventName : string, data: Array<any> = []) {
    return data.filter((item : any)=> {
      if(item.id == eventName) {
        return item
      }
    })
  }

  spineToGenerateNumber() {
    this.randomNumber1 = this.generateSeatNumber(1,8);
    this.randomNumber2 = this.generateRandomNumber(1, 72)

    let winner : any
    winner = this.userArray.filter((element : any)=> {
      if(element.tableNo == this.randomNumber2 && element.seatNo == this.randomNumber1){
        return element
      }
    })[0]
    console.log(winner)
    if(winner) {
      this.showLoader = true;
      // this.sendMailToWinner()
      const payload = {
        emailTo : winner.emailAddress,
        nameTo : `${winner.firstName} ${winner.lastName}`,
        subject : "Tope Dare's Send-forth Raffle Draw",
        msgContent : "Congratulations on winning the raffle draw at Tope Dare's send forth party! Your luck has truly shone brightly tonight. Wishing you endless joy and excitement as you enjoy your well-deserved prize. Here's to many more wins in the future! Cheers to you",
        solutionName : "TOPE DARE"
      } 
  
      this.firebaseService.sendRaffleDrawMail(payload).subscribe((res: any)=> {
        // if(res.isError == false) {
          
        // }
      })

      setTimeout(()=> {
        this.showLoader = false
      this.matDialog.open(RaffleSuccessModalComponent, {
        data : winner,
        hasBackdrop : false
      })
      }, 2000)
      
    }
  }


  generateRandomNumber(min: number, max: number): number {
    let randomNumber: number;
    do {
      randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (this.generatedNumbers.includes(randomNumber));

    this.generatedNumbers.push(randomNumber);
    return randomNumber;
  }

  generateSeatNumber(min : number, max : number) : number {
    let randomNumber : number;
    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min
    return randomNumber
  }

  // sendMailToWinner() {
    
  // }

}

