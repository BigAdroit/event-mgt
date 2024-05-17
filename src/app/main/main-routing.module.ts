import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { ConfirmAttendanceComponent } from './confirm-attendance/confirm-attendance.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { ProfileComponent } from './profile/profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterAttendanceComponent } from './register-attendance/register-attendance.component';
import { SuccessPageComponent } from './success-page/success-page.component';
import { AttendanceRecordsComponent } from './attendance-records/attendance-records.component';
import { UserRaffleDrawComponent } from './user-raffle-draw/user-raffle-draw.component';
import { QrCodeComponent } from './qr-code/qr-code.component';

const routes: Routes = [
  { path: 'message/:id', component: MainComponent },
  { path: 'invite/:id', component : ConfirmAttendanceComponent},
  { path: 'welcome', component : MenuItemComponent},
  { path: 'profile/:id', component : ProfileComponent},
  { path: 'attendance', component : RegisterAttendanceComponent},
  { path: 'success', component:SuccessPageComponent},
  { path: 'attendance-records', component : AttendanceRecordsComponent},
  { path: 'raffle-draw/:id', component : UserRaffleDrawComponent},
  { path: 'qrcode', component : QrCodeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
