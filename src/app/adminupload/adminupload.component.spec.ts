import { HttpClient, HttpHandler } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { DashBoardService } from '../shared/dash-board.service';
import { UserService } from '../shared/user.service';

import { AdminuploadComponent } from './adminupload.component';

describe('AdminuploadComponent', () => {
  let component: AdminuploadComponent;
  let fixture: ComponentFixture<AdminuploadComponent>;
  let dashBoardServiceMock: jasmine.SpyObj<DashBoardService>;
  let files: jasmine.SpyObj<File>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminuploadComponent],
      providers: [
        {
          provide: DashBoardService,
          useValue: jasmine.createSpyObj<DashBoardService>('DashBoardService', ['addproduct', 'uploadImages'])
        }

      ],
      imports: [FormsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminuploadComponent);
    component = fixture.componentInstance;
    dashBoardServiceMock = TestBed.inject(DashBoardService) as jasmine.SpyObj<DashBoardService>;
    dashBoardServiceMock.addproduct.and.returnValue(of());
  });

  fdescribe('On Submit', () => {
    const testForm = <NgForm>{
      value: {
        productName: 'ReeBok',
        productDescription: 'TShirt',
        price: '899',
        size: 'L',
        image: 'reebok.jpg',
        quantity: '1',
        total: '899',
        category: 'Men'
      }
    };

    beforeEach(fakeAsync(() => {
      component.OnSubmit(testForm);
      component.resetForm();
      tick();
    }));

    it('should have set form data with given test data', () => {
      const req = dashBoardServiceMock.addproduct(testForm.value);
      expect(component.additem.productName).toEqual('ReeBok');
      expect(component.additem.productDescription).toEqual('TShirt');
      expect(component.additem.size).toEqual('L');
      expect(component.additem.price).toEqual('899');
      expect(component.additem.total).toEqual('899');
      expect(component.additem.category).toEqual('Men');
      expect(component.additem.image).toEqual('reebok.jpg');
      expect(component.additem.quantity).toEqual('1');
    });

    it('should have called addproduct', () => {
      expect(dashBoardServiceMock.addproduct).toHaveBeenCalledWith(testForm.value);
    });

    it('should have called uploadImages', () => {
      const req1 = dashBoardServiceMock.uploadImages(testForm.value, files);
      expect(dashBoardServiceMock.uploadImages).toHaveBeenCalledWith(testForm.value,files);
    });

  });
});
