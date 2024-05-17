import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseServiceService } from 'src/app/services/firebase/firebase-service.service';
import { NotifierServiceService } from 'src/app/services/notification/notifier-service.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-attendee-records',
  templateUrl: './attendee-records.component.html',
  styleUrls: ['./attendee-records.component.scss']
})
export class AttendeeRecordsComponent {
  records: Array<any> = []
  userArray = [] as Array<any>
  totalCount! : number;
  itemsPerPage = 25;
  currentPage = 1;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<any>
  constructor(
    private firbaseService : FirebaseServiceService,
    private router : Router,
    private notifier : NotifierServiceService,
    private activateRoute : ActivatedRoute,
    private matDialog : MatDialog

  ) {

  }

  async ngOnInit() {
    this.firbaseService.readFromCollection('organisations').subscribe(async (res : any)=> {
     let dataArray = res.events as Array<any> || []
     // console.log(this.getEventByName('corporate_attendance_event_1', dataArray)[0])
      const arrayValue = this.getEventByName('corporate_attendance_event_1', dataArray)[0].users
      await arrayValue.filter((item :  any, index: number = 0)=> {
        if(item.status == "checked") {
         let sn = index + 1
         const dataValue = {...item, serialNumber : sn}
         this.userArray.push(dataValue)
       }
     })
     
     this.userArray = this.userArray.filter((item)=> {
      if(!/inlaks/i.test(item.organisation.toLowerCase()) && !/inlaks/i.test(item.emailAddress.toLowerCase())){
        return item
      }
    })
     // this.records = this.userArray
     // console.log(this.userArray)
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

 getAllGuestWIthoutInlaksStaff(){
  this.userArray.filter((item)=> {
    if(item.organisation != "inlaks"){
      return 
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

 exportToExcel(): void {
   const data = [] as Array<any>
   const file = this.userArray.forEach((item)=> {
     let val = {
       firstName : item.firstName,
       lastName : item.lastName,
       emailAddress : item.emailAddress,
      //  phoneNumber : item.phoneNumber,
      //  organisation : item.organisation,
      //  designation : item.designation,
      //  message : item.message,
      //  channel : item.channel,
      //  seatNo : item.seatNo,
      //  tableNo : item.tableNo
     }
     data.push(val)
   })
   const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
   const wb: XLSX.WorkBook = XLSX.utils.book_new();
   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
   XLSX.writeFile(wb, "TD_sendforth_attendee_record" + '.xlsx');
 }

 exportEmail(){

   let emails = [] as Array<any>
   let emailArray = this.userArray.map((item)=> `${item.emailAddress}`).join(',')
   const payload = {
     emails : emailArray
   }
   emails.push(payload)

 // console.log(emailArray)
 const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(emails);
 const wb: XLSX.WorkBook = XLSX.utils.book_new();
 XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 XLSX.writeFile(wb, "TD_sendforth_email_record" + '.xlsx');
 }

 search(val : any){
   const searchParam = val.target.value;
   if(searchParam) {
     console.log(searchParam)
   const data = this.userArray.filter(item =>
     this.firbaseService.matchSearch(item, searchParam, ['firstName', 'lastName', 'organisation', 'designation', 'emailAddress'])
     // this.matchSearch(item, param.searchParam)
   );
   this.userArray = data
   this.totalCount = this.userArray.length
   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
   const endIndex = startIndex + this.itemsPerPage;

  this.records =  data.slice(startIndex, endIndex);
   }else {
     this.userArray = []
     this.firbaseService.readFromCollection('organisations').subscribe(async (res : any)=> {
       let dataArray = res.events as Array<any> || []
       // console.log(this.getEventByName('corporate_attendance_event_1', dataArray)[0])
        const arrayValue = this.getEventByName('corporate_attendance_event_1', dataArray)[0].users
        await arrayValue.filter((item :  any, index: number = 0)=> {
          if(item.status == "checked") {
           let sn = index + 1
           const dataValue = {...item, serialNumber : sn}
           this.userArray.push(dataValue)
         }
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
}
