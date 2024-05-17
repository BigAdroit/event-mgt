import { Component } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent {
  programEvent = true as boolean;
  directionMap = false as boolean;
  showMenu = false as boolean;
  userId : any;

  url = 'https://www.google.com/';

  // Sanitized URL
  safeUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    // Sanitize the URL
    this.userId = JSON.parse(localStorage.getItem('unixID')!)
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }
}
