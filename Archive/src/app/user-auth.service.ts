import { Injectable, Inject, InjectionToken, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { users } from './users';

export const ROUTER_TOKEN = new InjectionToken<Router>('Router');

@Injectable({
  providedIn: 'root'
})

export class UserAuthService implements OnInit {
  isLoggedIn = false;
  username = '';
  nickname = '';
  user:any;

  private readonly USERNAME_KEY = 'username';
  private readonly NICKNAME_KEY = 'nickname';
  private readonly IS_LOGGED_IN_KEY = 'isLoggedIn';

  constructor(@Inject(ROUTER_TOKEN) private router: Router, private cookieService: CookieService) { 
    this.username = this.cookieService.get(this.USERNAME_KEY);
    this.getNickname();
  }

  ngOnInit() {
    this.checkLogin();
    this.getNickname();
  }

  getNickname() {
    if (this.cookieService.check(this.NICKNAME_KEY)) {
      const info = JSON.parse(decodeURIComponent(this.cookieService.get(this.NICKNAME_KEY)));
      this.nickname = info[this.username] || '';
    }

    if (this.user && this.nickname.length === 0) {
      this.nickname = this.user.nickname;
      this.updateNickname(this.nickname);
    }
  }

  updateNickname(nickname: string) {
    let nicknameInfo = ''

    if (this.cookieService.check(this.NICKNAME_KEY)) {
      const info = JSON.parse(decodeURIComponent(this.cookieService.get(this.NICKNAME_KEY)));
      info[this.username] = nickname;
      nicknameInfo = JSON.stringify(info);
    } else {
      nicknameInfo = JSON.stringify({
        [this.username]: nickname
      });
    }

    this.cookieService.set(this.NICKNAME_KEY, nicknameInfo);
    this.nickname = nickname;
  }

  login(username: string, password: string): boolean {
    this.user = users.find(u => u.username === username && u.password === password);
    console.log(username, password);
    console.log(this.user);

    if (this.user) {
      this.getNickname();
      this.username = username;
      this.isLoggedIn = true;
      this.cookieService.set(this.USERNAME_KEY, this.user.username);
      this.cookieService.set(this.IS_LOGGED_IN_KEY, 'true');
      this.router.navigate(['/main']);
      return true;
    }
    return false;
  }

  logout(): void {
    this.isLoggedIn = false;

    this.cookieService.delete(this.USERNAME_KEY);
    this.cookieService.delete(this.IS_LOGGED_IN_KEY);
    this.user = null;

    this.router.navigate(['/logout']);
  }

  checkLogin():boolean {
    this.isLoggedIn = this.cookieService.get(this.IS_LOGGED_IN_KEY) === 'true';
    if (!this.isLoggedIn) {
      this.logout();
      return false;
    }

    return true;
  }
}
