import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CartServiceService } from '../shared/cart-service.service';
import { DashBoardService } from '../shared/dash-board.service';

import { HomePageComponent } from './home-page.component';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let dashBoardServiceMock: jasmine.SpyObj<DashBoardService>;
  let cartServiceMock: jasmine.SpyObj<CartServiceService>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageComponent ],
      providers:[
        {
          provide:CartServiceService,
         useValue: jasmine.createSpyObj<CartServiceService>('CartServiceService',['addToCart'])
        },
        {
          provide:DashBoardService,
         useValue: jasmine.createSpyObj<DashBoardService>('DashBoardService',['getdetails'])
        }
       ],
       imports: [FormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    cartServiceMock = TestBed.inject(CartServiceService) as jasmine.SpyObj<CartServiceService>;
    dashBoardServiceMock=TestBed.inject(DashBoardService) as jasmine.SpyObj<DashBoardService>;
  });

  fdescribe('On HomePage', () => {
    const testForm = <NgForm>{
      value: {
        productName: 'ReeBok',
        productDescription: 'TShirt',
        price: '899',
        size: 'L',
        category: 'Men'
      }
    };
    
    beforeEach(()=>{
      component.ngOnInit();
    })

    it('should call addTocart', () => {
      const req=component.addToCart(testForm.value);
      cartServiceMock.addToCart(testForm.value,"s");
      expect(component.cartService.addToCart).toHaveBeenCalledWith(testForm.value,"s");
    });
    
  })

});
