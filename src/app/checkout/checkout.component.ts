import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CartServiceService } from '../shared/cart-service.service';
import { CartItem, PlaceOrder } from '../shared/user.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  public order: PlaceOrder;
  public cartItems: any = [];
  cartTotal = 0;
  public card: boolean;

  onChange(event: any) {
    if (event.target.value == "CARD") {
      this.card = true;
    }
    else {
      this.card = false;
    }
  }

  public constructor(public router: Router,public cartService: CartServiceService) { }

  public ngOnInit(): void {
    this.resetForm();
  }

  public resetForm(form?: NgForm) {
    if (form != null)
      form.reset;
    this.order = {
      name: '',
      mobileNumber: '',
      address: '',
      state: '',
      country: '',
      zipCode: '',
      productName: '',
      productDescription: '',
      price: '',
      size: '',
      quantity: '',
      total: ''
    }
  }

  public SaveOrder() {

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

  public savecart(getCart: CartItem) {
    this.cartService.SaveCart(getCart).toPromise();
  }

  public async OnSubmit(form: NgForm): Promise<void> {
    this.order = form.value;
    await this.cartService.SaveOrder(form.value).toPromise();
    this.router.navigateByUrl('error');
    this.cartService.orderItems=[];
    this.resetForm(form);
  }
}
