import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartServiceService } from '../shared/cart-service.service';
import { DashBoardService } from '../shared/dash-board.service';
import { UserService } from '../shared/user.service';
@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isLoggedIn$: Observable<boolean>;
  public searchText:any;
  public keyword: string;
  public constructor(public userService: UserService, public dashBoard : DashBoardService, public cartService : CartServiceService) { }

  public ngOnInit(): void {
    this.isLoggedIn$=this.userService.isLoggedIn;
  }

  public clear() {
    this.cartService.clearBuyNow();
  }

  public logOut() {
    localStorage.removeItem('loggedUser');
    this.userService.logOut();
  }

  public search(){
    this.keyword=this.searchText;
    this.dashBoard.searchProduct(this.keyword);
  }

  public searchMen(){
    this.keyword="Men";
    this.dashBoard.searchCategory(this.keyword);
  }

  public searchWomen(){
    this.keyword="Women";
    this.dashBoard.searchCategory(this.keyword);
  }
  
  public searchKid(){
    this.keyword="KId";
    this.dashBoard.searchCategory(this.keyword);
  }
}
