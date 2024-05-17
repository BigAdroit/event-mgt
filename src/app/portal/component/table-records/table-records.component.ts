import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseServiceService } from 'src/app/services/firebase/firebase-service.service';
import { NotifierServiceService } from 'src/app/services/notification/notifier-service.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-table-records',
  templateUrl: './table-records.component.html',
  styleUrls: ['./table-records.component.scss']
})
export class TableRecordsComponent implements OnInit {
  showloader = false as boolean
  userArray : Array<any> = []
  selectedTable : any = ''
  seatPerTable : any[] = []
  records : any[] = []
  
  constructor(
    private firebaseService : FirebaseServiceService,
    private matDialog : MatDialog,
    private notifier : NotifierServiceService,
  ){}
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
  
    // this.records = this.userArray
    // console.log(this.userArray)
    // this.showloader = false;
    // this.totalCount = this.userArray.length
    // const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  // const endIndex = startIndex + this.itemsPerPage;

  // this.records =   this.userArray.slice(startIndex, endIndex);
  })
}

getEventByName(eventName : string, data: Array<any> = []) {
  return data.filter((item : any)=> {
    if(item.id == eventName) {
      return item
    }
  })
}

getTotalSeatInATable(tableNo : number) : number {
  let count = this.userArray.filter((item)=> {
    if(item.tableNo == tableNo) {
      return item
    }
  }).length
  return count
}

  get totalTableCount() : Array<any> {
    return Array(70)
  }

  getGuestOnTable(tableNo : number) : Array<any> {
    let list = this.userArray.filter((item)=> {
      if(item.tableNo == tableNo) {
        return item
      }
    })
    return list
  }

  getSummary() {
    let summary = [] as Array<any>
    for(let i = 1; i <=70; i++) {
      let guest = this.getGuestOnTable(i) 
      let namesArray = guest.map((item) => `${item.firstName} ${item.lastName}`).join(',');
      const payload = {
        tableNo : `Table ${i}`,
        totalAssignedSeat : guest.length,
        unassignedSeat : (8 - guest.length),
        guests : namesArray
      }
      summary.push(payload);
    }

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(summary);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, "TD_sendforth_table_record" + '.xlsx');
    // console.log(summary)
  }
}
