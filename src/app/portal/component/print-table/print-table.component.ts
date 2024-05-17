import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseServiceService } from 'src/app/services/firebase/firebase-service.service';
import { NotifierServiceService } from 'src/app/services/notification/notifier-service.service';

@Component({
  selector: 'app-print-table',
  templateUrl: './print-table.component.html',
  styleUrls: ['./print-table.component.scss']
})
export class PrintTableComponent implements OnInit {
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

  get totalTableCount() : Array<any> {
    return Array(70)
  }

  constructor(
    private firebaseService : FirebaseServiceService,
    private matDialog : MatDialog,
    private notifier : NotifierServiceService,

  ) {}

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

  getBackgroundColor(tableNo: number): string {
    const tableCount = this.userArray.filter(table => table.tableNo == tableNo).length;
    return (tableCount == 8) ? '#54ed54' : '#FFBF00';
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

  print() {
    window.print()
  }
}
