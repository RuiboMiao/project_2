import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../user-auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  items:any = [];
  username = '';

  cardNumber = '';
  expiryDate = '';
  cvv = '';
  cardHolderName = '';
  address = '';

  errorMessage = '';
  isDisabled = false;
  isSubmitted = false;
  hasError = false;

  constructor(private authService: UserAuthService) {}

  ngOnInit() {
    this.authService.checkLogin();
    this.username = this.authService.username;

    const storage = localStorage.getItem(this.username);
    if (storage) {
      const json = JSON.parse(storage);
      this.items = Object.keys(json).map(key => json[key]);
    }
  }

  updateCart(itemId: number) {
    const storage = localStorage.getItem(this.username);
    if (storage) {
      const json = JSON.parse(storage);
      if (itemId >= 0) {
        delete json[itemId];
      } else {
        Object.keys(json).forEach((key, index) => {
          json[key] = this.items[index];
        });
      }

      localStorage.setItem(this.username, JSON.stringify(json));
    }
  }

  get totalPrice() {
    const price = this.items.reduce((t:number, f:any) => t + f.quantity * f.product.price, 0);
    this.updateCart(-1);
    return price;
  }

  removeItem(itemId: number) {
    this.items.splice(itemId, 1);
    this.updateCart(itemId);
  }

  pay() {
    if (!this.cardNumber || !this.expiryDate || !this.cvv || !this.cardHolderName || !this.address) {
      this.hasError = true;
      this.errorMessage = "All information are required.";
      setTimeout(() => this.hasError = false, 3000);
      return;
    }

    this.hasError = false;
    this.isDisabled = true;
    this.isSubmitted = true;
  }

}