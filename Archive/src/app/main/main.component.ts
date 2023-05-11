import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../user-auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  username = '';
  nickname = '';

  constructor(private authService: UserAuthService) {}

  ngOnInit() {
    this.authService.checkLogin();
    this.authService.getNickname();
    console.log(this.authService);
    this.username = this.authService.username;
    this.nickname = this.authService.nickname;
  }
}
