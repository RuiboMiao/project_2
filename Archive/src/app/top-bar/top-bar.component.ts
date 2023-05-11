import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../user-auth.service';
import { NavigationStart, Router } from '@angular/router';
import { NavigationEvent } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-view-model';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})

export class TopBarComponent implements OnInit {
  route!: string;

  constructor(private authService: UserAuthService, router: Router) {
    router.events
      .subscribe(
        (event) => {
          if(event instanceof NavigationStart) {
            this.route = event.url
          }
        });
  }

  ngOnInit() {
    this.authService.checkLogin();
  }

  checkLoggedIn() {
    return this.authService.isLoggedIn;
  }
}
