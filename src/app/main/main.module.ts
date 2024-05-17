import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { ConfirmAttendanceComponent } from './confirm-attendance/confirm-attendance.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MatDialogModule} from '@angular/material/dialog';
import { RegisterAttendanceComponent } from './register-attendance/register-attendance.component';
import { SuccessPageComponent } from './success-page/success-page.component'
// import { DataTablesModule } from 'angular-datatables';
import { AttendanceRecordsComponent } from './attendance-records/attendance-records.component';
import { MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { PaginationComponent } from '../shared/pagination/pagination.component';
import { UserRaffleDrawComponent } from './user-raffle-draw/user-raffle-draw.component';
import { QrCodeComponent } from './qr-code/qr-code.component';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [
    MainComponent,
    ConfirmAttendanceComponent,
    MenuItemComponent,
    ProfileComponent,
    PageNotFoundComponent,
    RegisterAttendanceComponent,
    SuccessPageComponent,
    AttendanceRecordsComponent,
    UserRaffleDrawComponent,
    QrCodeComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    // DataTablesModule,
    MatTableModule,
    MatPaginatorModule,
    PaginationComponent,
    QRCodeModule

  ]
})
export class MainModule { }
