import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { MainComponent } from './main/main.component';
import { InfoComponent } from './info/info.component';
import { DetailComponent } from './detail/detail.component';
import { CartComponent } from './cart/cart.component';
import { LogoutComponent } from './logout/logout.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserAuthService, ROUTER_TOKEN } from './user-auth.service';
import { SettingComponent } from './setting/setting.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    MainComponent,
    InfoComponent,
    DetailComponent,
    CartComponent,
    LogoutComponent,
    TopBarComponent,
    SettingComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: AuthComponent },
      { path: 'login', component: AuthComponent },
      { path: 'logout', component: LogoutComponent },
      { path: 'settings', component: SettingComponent },
      { path: 'products/:productId', component: DetailComponent },
      { path: 'main', component: MainComponent },
      { path: 'cart', component: CartComponent },
      { path: 'logout', component: LogoutComponent },
      { path: 'info', component: InfoComponent },
    ]),
    BrowserAnimationsModule
  ],
  providers: [{ provide: ROUTER_TOKEN, useExisting: Router }, AuthComponent],
  bootstrap: [AppComponent]
})

export class AppModule { }

