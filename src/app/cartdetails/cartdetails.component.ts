import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { IndexedAccessType } from 'typescript';
import { CartServiceService } from '../shared/cart-service.service';
import { AddItem, CartItem } from '../shared/user.model';

@Component({
  selector: 'app-cartdetails',
  templateUrl: './cartdetails.component.html',
  styleUrls: ['./cartdetails.component.css']
})
export class CartdetailsComponent implements OnInit {
  public cartItems: any = [];
  public constructor(public cartService: CartServiceService) { }

  public ngOnInit(): void {
    this.cartService.getCartDetails();
  }

  public clear() {
    this.cartService.clearCart();
  }

  plus(getCart: CartItem) {
   this.cartService.plusProduct(getCart);
  }

  minus(getCart: CartItem) {
   this.cartService.minusProduct(getCart);
  }

  public BuyNow(getCart: CartItem) {
    this.cartService.placeOrder(getCart);
  }

  public savecart(getCart: CartItem) {
    this.cartService.SaveCart(getCart).toPromise();
  }
}
