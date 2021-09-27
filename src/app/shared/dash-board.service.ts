import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddItem } from './user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DashBoardService {
  list: AddItem[];

  readonly rootUrl = 'http://localhost:50278';
  public constructor(private http: HttpClient) { }

  public addproduct(additem: AddItem) {
    const body: AddItem = {
      productName: additem.productName,
      productDescription: additem.productDescription,
      price: additem.price,
      size: additem.size,
      image: additem.image,
      quantity: additem.quantity,
      total: additem.total,
      category: additem.category
    }
    return this.http.post(this.rootUrl + '/AddProduct', body);
  }

  public uploadImages(id: Int32List, files: string | Blob) {
    const formData = new FormData();
    formData.append("files", files);
    return this.http.post(this.rootUrl + '/UploadImage/' + id, formData);
  }

  public getdetails() {
    this.http.get(this.rootUrl + '/GetProductsDetails').toPromise().then(res => this.list = res as AddItem[]);
  }

  public searchProduct(searchText: string) {
    this.http.get(this.rootUrl + '/SearchProduct/' + searchText).toPromise().then(res => this.list = res as AddItem[]);
  }

  public searchCategory(category: string) {
    this.http.get(this.rootUrl + '/DivideCategory/' + category).toPromise().then(res => this.list = res as AddItem[]);
  }
  
}
