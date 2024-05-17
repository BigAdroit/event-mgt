import { Component, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAnalytics } from 'firebase/analytics'
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'TD';

  ngOnInit(): void {
    const init = initializeApp(environment.firebaseConfig)
    // console.log(init)
    const analytics = getAnalytics(init)
    console.log(analytics)
  }
}
