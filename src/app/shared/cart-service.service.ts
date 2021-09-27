import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartItem, PlaceOrder } from './user.model';
import { UserService } from './user.service';
import { concat } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  n: number = 0;
  items: CartItem[] = [];
  orderItems: PlaceOrder[] = [];
  buyItem: CartItem[] = [];
  orderDetail: PlaceOrder[] = [];
  cartDetail: CartItem[] = [];
  public cartItems: any = [];
  cartTotal: number

  readonly rootUrl = 'http://localhost:50278';
  public constructor(private http: HttpClient, public userService: UserService) { }

  public addToCart(product: CartItem, size: string) {
    if (this.items.find(x => x.productName == product.productName)) {
      window.alert('product already added');
    }
    else {
      product.size = size;
      this.items.push(product);
      this.buyItem.push(product);
    }
  }

  public placeOrder(product: CartItem) {
    this.buyItem.push(product);
  }

  public SaveOrder(order: PlaceOrder) {
    this.n = 0;
    while (this.n < this.items.length) {
      let neworder = new PlaceOrder();
      var arr = this.items[this.n];
      neworder.productName = arr.productName;
      neworder.productDescription = arr.productDescription;
      neworder.quantity = arr.quantity;
      neworder.size = arr.size;
      neworder.total = arr.total;
      neworder.price = arr.price;
      neworder.address = order.address;
      neworder.country = order.country;
      neworder.mobileNumber = order.mobileNumber;
      neworder.name = order.name;
      neworder.zipCode = order.zipCode;
      neworder.state = order.state;
      this.orderItems.push(neworder);
      this.n++;
    };

    return this.http.post(this.rootUrl + '/PlaceOrder/' + this.userService.userDisplayName, this.orderItems);
  }

  public SaveCart(product: CartItem) {
    const body: CartItem = {
      productName: product.productName,
      productDescription: product.productDescription,
      size: product.size,
      price: product.price,
      total: product.total,
      quantity: product.quantity,
      image: product.image
    }
    return this.http.post(this.rootUrl + '/AddCartDetails/' + this.userService.userDisplayName, body);
  }

  public getCartDetails() {
    this.http.get(this.rootUrl + '/GetCartDetails/' + this.userService.userDisplayName).toPromise().then(res => this.cartDetail = res as CartItem[]);
  }

  public getOrderDetails() {
    this.http.get(this.rootUrl + '/GetOrderDetail/' + this.userService.userDisplayName).toPromise().then(res => this.orderDetail = res as PlaceOrder[]);
  }

  public getItems() {
    return this.items;
  }

  public clearCart() {
    this.cartTotal = 0;
    this.cartItems = [];
    this.items = [];
    this.orderItems = [];
  }

  public clearBuyNow() {
    this.buyItem = [];
    this.orderItems = [];
  }

  public plusProduct(getCart: CartItem) {
    var n = Number(getCart.quantity);
    n++;
    getCart.quantity = String(n);
    var finalp = Number(getCart.price) * n;
    getCart.total = String(finalp);
    this.cartItems.push({
      productName: getCart.productName,
      qty: 1,
      price: getCart.price
    })
    this.cartTotal = 0
    this.cartItems.forEach((item: any) => {
      this.cartTotal += (item.qty * item.price)
    })
  }

  public minusProduct(getCart: CartItem) {
    var n = Number(getCart.quantity);
    if (n != 0) {
      n--;
      getCart.quantity = String(n);
      var finalp = Number(getCart.price);
      finalp = finalp * n;
      getCart.total = String(finalp);
      this.cartTotal -= Number(getCart.price);
      if (n == 0) {
        this.cartItems = [];
      }
    }
  }
}
