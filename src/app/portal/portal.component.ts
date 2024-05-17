import { Component, OnInit } from '@angular/core';
import { FirebaseServiceService } from '../services/firebase/firebase-service.service';
import { FormGroup, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddSeatComponent } from '../shared/nodals/add-seat/add-seat.component';
import { NotifierServiceService } from '../services/notification/notifier-service.service';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {
  userArray : Array<any> = []
  seatMax : number = 8;
  totalTable : number = 0;
  selectedTable : any = ''
  itemsPerPage = 25;
  currentPage = 1;
  totalCount! : number;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  records: Array<any> = []
  seatPerTable : any[] = []
  showloader = false as boolean
  asideVisible = false as boolean;
  unAssigned = [] as Array<any>



  searchForm = new FormGroup({
    searchPhrase: new FormControl(''),
  });

  constructor(
    private firebaseService : FirebaseServiceService,
    private matDialog : MatDialog,
    private notifier : NotifierServiceService,

  ) {}

  ngOnInit(): void {
    this.showloader = true
    this.searchForm.controls.searchPhrase.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((term) => {
        this.search(term as string);
      });
      
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
    
      // this.records = this.userArray
      // console.log(this.userArray)
      this.showloader = false;
      this.totalCount = this.userArray.length
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    this.records =   this.userArray.slice(startIndex, endIndex);
    })
  }

  getEventByName(eventName : string, data: Array<any> = []) {
    return data.filter((item : any)=> {
      if(item.id == eventName) {
        return item
      }
    })
  }

  get totalTableCount() : Array<any> {
    return Array(70)
  }

  selectTable(i : any) {
    this.selectedTable = i
    const array = JSON.parse(localStorage.getItem('guestList')!) as Array<any>
    this.seatPerTable = array.filter((item : any) => {
      if(item.tableNo == i) {
        return item
      }
    })
  }

  pagination(event : any){
    this.currentPage = Number(event)
    const startIndex = (event - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.records =  this.userArray.slice(startIndex, endIndex);
    }

  
  getLastPage(event : any) {
    this.pagination(event)
    
  }

  getFirstPage(event : any) {
    this.pagination(event)
  }

  search(val : any){
    const searchParam = val;
    if(searchParam) {
      console.log(searchParam)
    const data = this.userArray.filter(item =>
      this.firebaseService.matchSearch(item, searchParam, ['firstName', 'lastName', 'organisation', 'designation', 'emailAddress'])
      // this.matchSearch(item, param.searchParam)
    );
    this.userArray = data
    this.totalCount = this.userArray.length
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

   this.records =  data.slice(startIndex, endIndex);
    }else {
      this.userArray = []
      this.firebaseService.readFromCollection('organisations').subscribe(async (res : any)=> {
        let dataArray = res.events as Array<any> || []
        // console.log(this.getEventByName('corporate_attendance_event_1', dataArray)[0])
         const arrayValue = this.getEventByName('corporate_attendance_event_1', dataArray)[0].users
         await arrayValue.forEach((item :  any, index: number = 0)=> {
          let sn = index + 1
          const dataValue = {...item, serialNumber : sn}
          this.userArray.push(dataValue)
          // if(!item.tableNo) {
          //   this.unAssigned.push(dataValue)
          // }
        })
        // this.records = this.userArray
        // console.log(this.userArray)
        this.totalCount = this.userArray.length
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
  
      this.records =   this.userArray.slice(startIndex, endIndex);
      })
    }
  }

  openAddSeatModal(data : any) {
    let openModal = this.matDialog.open(AddSeatComponent, {
      data : {
        val : data,
        table : this.selectedTable,
        records : this.seatPerTable
      }
    })

    openModal.afterClosed().subscribe((res)=> {
      if(res) {
        console.log(res)
        this.showloader = true
        this.firebaseService.SetTableAndSeatNo('corporate_attendance','corporate_attendance_event_1', res.val.phoneNumber, String(res.table), res.seatNo).then(async(response)=> {
          this.showloader = false;
          if(response) {
            const newData = {...data, seatNo : res.seatNo, tableNo : res.table  }
            this.seatPerTable.push(newData)
            // await this.getAttendanceRecords()
            // this.seatPerTable = this.userArray.filter((item) => {
            //   if(item.tableNo == this.selectedTable) {
            //     return item
            //   }
            // })
            this.notifier.publishMessage('success', `Seat assigned`)
            const payload = {
              firstName : data.firstName,
              lastName : data.lastName,
              phoneNumber : data.phoneNumber,
              email : data.emailAddress,
              seatNumber : res.seatNo,
              tableNumber : String(res.table)
            }
            this.sendNotification(payload)

    
          }else {
            this.notifier.publishMessage('error', "An error occur while proccess your request")
          }
        }).catch((error)=> {
          this.showloader = false;
          this.notifier.publishMessage('error', error)
            // console.log(error)
        })
      }
    })
  }


  getBackgroundColor(tableNo: number): string {
    const tableCount = this.userArray.filter(table => table.tableNo == tableNo).length;
    return (tableCount == 8) ? '#54ed54' : '#FFBF00';
  }

  isAssigned(data : any): boolean {
    return this.seatPerTable.some(value => value.phoneNumber === data.phoneNumber);
  }

  sendNotification(payload : any) {
    this.showloader = true
    this.firebaseService.sendSittingNotification(payload).subscribe((res : any)=> {
      this.showloader = false
      if(res.isError == false){
        this.notifier.publishMessage('success', `Notification sent`)
      }else {
        this.notifier.publishMessage('error', `An error occur`)
      }
    })
  }
  
}
