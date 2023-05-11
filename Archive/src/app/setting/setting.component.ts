import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../user-auth.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})

export class SettingComponent implements OnInit {
  nickname = '';
  isUpdated = false;

  constructor(private authService: UserAuthService) {}

  ngOnInit(): void {
    this.authService.checkLogin();
    console.log(this.authService)
    this.nickname = this.authService.nickname;
  }

  saveNickname(): void {
    this.authService.updateNickname(this.nickname);
    this.isUpdated = true;
    setTimeout(() => this.isUpdated = false, 3000);
  }
}
