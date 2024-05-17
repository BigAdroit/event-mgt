import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class NotifierServiceService {

  constructor(
    private notifier : NotifierService

  ) { }

  publishMessage(style : string, content : string) {
    this.notifier.notify(style, content)
    setTimeout(()=> {
      this.dismissMessage()
    }, 10000)
  }
  
  dismissMessage() {
    this.notifier.hideAll()
  }
  
}
