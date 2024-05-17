import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortalComponent } from './portal.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { TableReportComponent } from './component/table-report/table-report.component';
import { RaffleAdminComponent } from './raffle-admin/raffle-admin.component';
import { TableRecordsComponent } from './component/table-records/table-records.component';
import { UnassignedGuestComponent } from './component/unassigned-guest/unassigned-guest.component';
import { PrintTableComponent } from './component/print-table/print-table.component';
import { AttendeeRecordsComponent } from './component/attendee-records/attendee-records.component';

const routes: Routes = [
  { path: 'assign-seat', component: PortalComponent },
  { path: '', component : DashboardComponent},
  { path: 'table-report', component : TableReportComponent},
  { path: 'raffle-draw', component : RaffleAdminComponent},
  { path: 'table-records', component : TableRecordsComponent},
  { path: 'unassigned-guest', component : UnassignedGuestComponent},
  { path: 'print', component : PrintTableComponent },
  { path: 'attendee', component : AttendeeRecordsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalRoutingModule { }
