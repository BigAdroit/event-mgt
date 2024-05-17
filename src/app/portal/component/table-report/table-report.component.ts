import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseServiceService } from 'src/app/services/firebase/firebase-service.service';
import { NotifierServiceService } from 'src/app/services/notification/notifier-service.service';

@Component({
  selector: 'app-table-report',
  templateUrl: './table-report.component.html',
  styleUrls: ['./table-report.component.scss']
})
export class TableReportComponent implements OnInit {
  showloader = false as boolean
  userArray : Array<any> = []
  selectedTable : any = ''
  seatPerTable : any[] = []
  records : any[] = []
  selectDetails : any
  tableManualName = [
    {
      name : "VALUE DRIVER",
      tableList : ["70", "71", "72"]
    },
    {
      name : "IN-LAKS",
      tableList : ["35", "36", "37", "38", "39", "40", "41", "42"]
    },
    {
      name : "NCR",
      tableList : ["49", "50"]
    },
    {
      name : "SPUSSA",
      tableList : ["47", "48"]
    },
    {
      name : "OAU",
      tableList : ["27", "28"]
    },
    {
      name : "OCEANIC",
      tableList : ["47", "48"]
    },
    {
      name : "COMERCIO",
      tableList : ["15"]
    },
    {
      name : "CIOs",
      tableList : ["10", "11"]
    },
    {
      name : "IN-LAKS EXCOS",
      tableList : ["6"]
    },
    {
      name : "LOTUS",
      tableList : ["13", "12"]
    },

    {
      name : "CEOs",
      tableList : ["9", "8"]
    },
  ]
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

  get totalTableCount() : Array<any> {
    return Array(70)
  }

  getTotalSeatInATable(tableNo : number) : number {
    let count = this.userArray.filter((item)=> {
      if(item.tableNo == tableNo) {
        return item
      }
    }).length
    return count
  }

  selectTable(i : any){
    console.log(i);
    this.selectedTable = i
    const array = JSON.parse(localStorage.getItem('guestList')!) as Array<any>
    this.records = array.filter((item : any) => {
      if(item.tableNo == i) {
        return item
      }
    })
  }

  // getTableDetails(data: Array<any>): void {
  //   this.records = this.userArray.filter(element => data.includes(element.tableNo));
  //   console.log(this.records)
  // }

  getTableDetails(table:  {name : string, tableList : any[]}){
    // console.log(tableNumbers)
    this.selectDetails = table
    this.records =  this.userArray.filter(user => table.tableList.includes(user.tableNo));
    // console.log(this.records)
  }
  
}
