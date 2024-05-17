import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortalRoutingModule } from './portal-routing.module';
import { PortalComponent } from './portal.component';
import { MatMenuModule } from '@angular/material/menu'
import { MatIconModule } from '@angular/material/icon'
import { PaginationComponent } from '../shared/pagination/pagination.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { TableReportComponent } from './component/table-report/table-report.component';
import { RaffleAdminComponent } from './raffle-admin/raffle-admin.component';
import { TableRecordsComponent } from './component/table-records/table-records.component';
import { UnassignedGuestComponent } from './component/unassigned-guest/unassigned-guest.component';
import { PrintTableComponent } from './component/print-table/print-table.component';
import { AttendeeRecordsComponent } from './component/attendee-records/attendee-records.component';

@NgModule({
  declarations: [
    PortalComponent,
    DashboardComponent,
    TableReportComponent,
    RaffleAdminComponent,
    TableRecordsComponent,
    UnassignedGuestComponent,
    PrintTableComponent,
    AttendeeRecordsComponent
  ],
  imports: [
    CommonModule,
    PortalRoutingModule,
    MatMenuModule,
    MatIconModule,
    PaginationComponent,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    MatProgressBarModule
  ]
})
export class PortalModule { }
