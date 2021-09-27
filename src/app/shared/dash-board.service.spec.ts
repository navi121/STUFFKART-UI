import { TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';

import { DashBoardService } from './dash-board.service';

describe('DashBoardService', () => {
  let service: DashBoardService;
  let dashBoardServiceMock: jasmine.SpyObj<DashBoardService>;
  let files: jasmine.SpyObj<File>;
  let id: jasmine.SpyObj<Int32List>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: DashBoardService,
          useValue: jasmine.createSpyObj<DashBoardService>('DashBoardService', ['addproduct','uploadImages','getdetails','searchProduct','searchCategory'])
        }
      ],
      imports: [FormsModule]
    });
    service = TestBed.inject(DashBoardService);
  });

  beforeEach(() => {
    dashBoardServiceMock = TestBed.inject(DashBoardService) as jasmine.SpyObj<DashBoardService>;
  });

  fdescribe('DashBoard Product', () => {
    var searchText="allen solly";
    var category="men";

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

    it('should have set form data with given test data and should have called addproduct', () => {
      const req = dashBoardServiceMock.addproduct(testForm.value);
      expect(dashBoardServiceMock.addproduct).toHaveBeenCalledOnceWith(testForm.value);
    });


    it('should have called uploadImages', () => {
      const req = dashBoardServiceMock.uploadImages(id,files);
      expect(dashBoardServiceMock.uploadImages).toHaveBeenCalledWith(id,files);
    });

    it('should have called getdetails', () => {
      expect(dashBoardServiceMock.getdetails).toHaveBeenCalled;
    });

    it('should have called searchProduct', () => {
      const req=dashBoardServiceMock.searchProduct(searchText)
      expect(dashBoardServiceMock.searchProduct).toHaveBeenCalledWith(searchText);
    });

    it('should have called searchCategory', () => {
      const req=dashBoardServiceMock.searchCategory(category);
      expect(dashBoardServiceMock.searchCategory).toHaveBeenCalledWith(category);
    });


  });

});
