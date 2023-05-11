import { Component, OnInit } from '@angular/core';
import { products } from '../products';
import { UserAuthService } from '../user-auth.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})

export class InfoComponent implements OnInit {
  products = products;
  addedToCart = false;

  constructor(private authService: UserAuthService) {}

  ngOnInit() {
    this.authService.checkLogin();
  }

  addToCart(productId: number) {
    const username = this.authService.username;
    const cartData = JSON.parse(localStorage.getItem(username)!) || {};
    const product = this.products[productId];

    if (cartData[productId]) {
      cartData[productId].quantity += 1;
    } else {
      cartData[productId] = {
        quantity: 1,
        product
      };
    }

    localStorage.setItem(username, JSON.stringify(cartData));
    this.addedToCart = true; 
    setTimeout(() => this.addedToCart = false, 3000);
  }
}
