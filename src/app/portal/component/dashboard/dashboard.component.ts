import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseServiceService } from 'src/app/services/firebase/firebase-service.service';
import { NotifierServiceService } from 'src/app/services/notification/notifier-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userArray : Array<any> = []
  seatMax : number = 4;
  totalTable : number = 0;
  selectedTable : any = ''
  itemsPerPage = 10;
  currentPage = 1;
  totalCount! : number;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  records: Array<any> = []
  seatPerTable : any[] = []
  showloader = false as boolean
  asideVisible = false as boolean;
  incompleteCount : number = 0;
  completedTableCount: number = 0;
  totalNumber : number = 0;
  totalNumberOfAssignedSeat : number = 0



  tableCounts: number[] = new Array(64).fill(0);


  // tableCounts: { [tableNo: string]: number } = {};
  tablesWithEightSeats: string[] = [];
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
        this.userArray.push(dataValue)
        this.totalNumber = this.userArray.length
        
        this.totalNumberOfAssignedSeat = this.userArray.filter((item)=> {
          if(item.tableNo && item.seatNo) {
            return item
          }
        }).length

      })
      this.countCompletedTables()
      // this.records = this.userArray
      // console.log(this.userArray)
      this.showloader = false;
      this.totalTable = Math.floor(this.userArray.length / this.seatMax)
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

  countCompletedTables(): void {
    const tableNoCounts: { [key: number]: number } = {};

    // Count occurrences of each tableNo
    this.userArray.forEach(table => {
      const tableNo = table.tableNo;
      tableNoCounts[tableNo] = (tableNoCounts[tableNo] || 0) + 1;
    });

    // Check if any table has 8 seats
    Object.values(tableNoCounts).forEach(count => {
      if (count === 8) {
        this.completedTableCount++;
      }
    });
    // console.log(this.completedTableCount)
  }
}
