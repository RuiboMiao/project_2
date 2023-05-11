import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserAuthService } from '../user-auth.service';
import { products } from '../products';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})

export class DetailComponent implements OnInit {
  product:any;

  constructor(private router: ActivatedRoute, private authService: UserAuthService) { }

  ngOnInit() {
    this.authService.checkLogin();
    
    this.router.paramMap.subscribe(p => {
      this.product = products[+p.get('productId')!];
    });
  }

}