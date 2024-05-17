import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./main/main.module').then(m => m.MainModule) },
  { path: 'portal', loadChildren: () => import('./portal/portal.module').then(m => m.PortalModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration : 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
