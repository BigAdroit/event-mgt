import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { FirebaseServiceService } from 'src/app/services/firebase/firebase-service.service';

@Component({
  selector: 'app-unassigned-guest',
  templateUrl: './unassigned-guest.component.html',
  styleUrls: ['./unassigned-guest.component.scss']
})
export class UnassignedGuestComponent implements OnInit {
  userArray : Array<any> = []
  records: Array<any> = []
  totalCount! : number;
  itemsPerPage = 25;
  currentPage = 1;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  searchForm = new FormGroup({
    searchPhrase: new FormControl(''),
  });
  constructor(
    private firebaseService : FirebaseServiceService,

  ) {}

  ngOnInit(): void {
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
      let allUser : Array<any> = []
      // console.log(this.getEventByName('corporate_attendance_event_1', dataArray)[0])
       const arrayValue = this.getEventByName('corporate_attendance_event_1', dataArray)[0].users
       await arrayValue.forEach((item :  any, index: number = 0)=> {
        let sn = index + 1
        const dataValue = {...item, serialNumber : sn}
        // if(!item.tableNo) {
        //   this.unAssigned.push(dataValue)
        // }
        allUser.push(dataValue)
      }) 
      this.userArray = allUser.filter((item)=> {
        if(!item.seatNo && !item.tableNo) {
          return item
        }
      })

      // console.log(this.userArray)
      this.totalCount = this.userArray.length
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    this.records =   this.userArray.slice(startIndex, endIndex);
      
      localStorage.setItem('guestList', JSON.stringify(this.userArray))
    })
  }

  
  getEventByName(eventName : string, data: Array<any> = []) {
    return data.filter((item : any)=> {
      if(item.id == eventName) {
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
      this.getAttendanceRecords()
    }
  }

}
