import { Component, OnInit } from '@angular/core';
import { CartServiceService } from '../shared/cart-service.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  constructor(public cartService: CartServiceService  ) { }

  ngOnInit(): void {
    this.cartService.getOrderDetails();
  }

}
