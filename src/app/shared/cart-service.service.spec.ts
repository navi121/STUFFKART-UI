import { TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';

import { CartServiceService } from './cart-service.service';
import { UserService } from './user.service';

describe('CartServiceService', () => {
  let service: CartServiceService;
  let cartServiceMock: jasmine.SpyObj<CartServiceService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CartServiceService,
          useValue: jasmine.createSpyObj<CartServiceService>('CartServiceService', ['addToCart','SaveCart','getItems','clearCart','SaveOrder','placeOrder','plusProduct','minusProduct'])
        }
      ],
      imports: [FormsModule]
    });
    service = TestBed.inject(CartServiceService);
  });

  beforeEach(() => {
    cartServiceMock = TestBed.inject(CartServiceService) as jasmine.SpyObj<CartServiceService>;
  });

  fdescribe('CartItems', () => {
    var size="L";
    const testForm = <NgForm>{
      value: {
        productName: 'ReeBok',
        productDescription: 'TShirt',
        price: '899',
        size: 'L',
        quantity: '1',
        total: '899'
      }
    };

    it('should have set form data with given test data and should have called addToCart', () => {
      const req = cartServiceMock.addToCart(testForm.value,size);
      expect(service.addToCart).toHaveBeenCalledOnceWith(testForm.value,size);
    });

    it('should have called SaveCart', () => {
      const req = cartServiceMock.SaveCart(testForm.value);
      expect(service.SaveCart).toHaveBeenCalledWith(testForm.value);
    });

    it('should have called SaveOrder', () => {
      const req = cartServiceMock.SaveOrder(testForm.value);
      expect(service.SaveOrder).toHaveBeenCalledWith(testForm.value);
    });

    it('should have called SaveOrder', () => {
      const req = cartServiceMock.placeOrder(testForm.value);
      expect(service.placeOrder).toHaveBeenCalledWith(testForm.value);
    });

    it('should have called getCartDetails', () => {
      expect(service.getCartDetails).toHaveBeenCalled;
    });

    it('should have called getOrderDetails', () => {
      expect(service.getOrderDetails).toHaveBeenCalled;
    });

    it('should have called getItems', () => {
      expect(service.getItems).toHaveBeenCalled;
    });

    it('should have called clearCart', () => {
      expect(service.clearCart).toHaveBeenCalled;
    });

    it('should have called plusProduct', () => {
      const req = cartServiceMock.plusProduct(testForm.value);
      expect(service.plusProduct).toHaveBeenCalledWith(testForm.value);
    });

    it('should have called minusProduct', () => {
      const req = cartServiceMock.minusProduct(testForm.value);
      expect(service.minusProduct).toHaveBeenCalledWith(testForm.value);
    });

  });

});
