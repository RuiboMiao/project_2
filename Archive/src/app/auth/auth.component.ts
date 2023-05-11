import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../user-auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {
  username = '';
  password = '';
  errorMessage = '';
  isLoggedIn = false;

  constructor(private router: Router, private authService: UserAuthService) {}


  ngOnInit() {
    if(this.authService.isLoggedIn) {
      this.router.navigate(['/main']);
    }
  }

  onSubmit() {
    this.isLoggedIn =  this.authService.login(this.username, this.password);
    if (!this.isLoggedIn) {
      this.errorMessage = 'Invalid username or password';
    }
  }
}
