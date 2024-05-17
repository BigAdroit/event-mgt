import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrustedURLPipe } from './core/pipes/trusted-pipe.pipe';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat'
import { NotifierModule } from 'angular-notifier';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RaffleSuccessModalComponent } from './shared/nodals/raffle-success-modal/raffle-success-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    TrustedURLPipe,
    RaffleSuccessModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    NotifierModule.withConfig(
      {
        position: {
          horizontal: {
            position: 'right',
            distance: 12,
          },
          vertical: {
            position: 'top',
            distance: 12,
            gap: 10,
          },
        },
        theme: 'material',
        behaviour: {
          autoHide: 5000,
          onClick: 'hide',
          onMouseover: 'pauseAutoHide',
          showDismissButton: true,
          stacking: 4,
        },
        animations: {
          enabled: true,
          show: {
            preset: 'slide',
            speed: 300,
            easing: 'ease',
          },
          hide: {
            preset: 'fade',
            speed: 300,
            easing: 'ease',
            offset: 50,
          },
          shift: {
            speed: 300,
            easing: 'ease',
          },
          overlap: 150,
        },
      } 
    ),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
