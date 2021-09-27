import { TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let userServiceMock: jasmine.SpyObj<UserService>;
  let routerMock: jasmine.SpyObj<Router>;
  let localStorageServiceSpy = jasmine.createSpyObj<typeof localStorage>('localStorage', ['getItem', 'setItem'])
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          useValue: jasmine.createSpyObj<Router>('Router', ['navigateByUrl'])
        },
        {
          provide: localStorage,
          useValue: localStorageServiceSpy
        },
        {
          provide: UserService,
          useValue: jasmine.createSpyObj<UserService>('UserService', ['loginUser', 'logOut', 'resetUser', 'resetPassword', 'registerUser', 'adminLogin'])
        }
      ],
      imports: [FormsModule, RouterTestingModule]
    });
    service = TestBed.inject(UserService);

  });

  beforeEach(() => {
    routerMock = <jasmine.SpyObj<Router>>TestBed.inject(Router);
    userServiceMock = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    localStorageServiceSpy.getItem.and.returnValue('naveenchpt@gmail.com');
  });

  fdescribe('User', () => {
    const testForm = <NgForm>{
      value: {
        Email: 'naveenchpt@gmail.com',
        Password: 'nn2000',
        FirstName: 'Naveen',
        LastName: 'N',
        SecurityAnswer: 'palani',
        SecurityQuestion: 'Which city you have born?',
        MobileNumber: '9080352867'
      }
    };

    it('should have set localStorage values and should have called loginUser', () => {
      const req = userServiceMock.loginUser(testForm.value);
      const req1 = localStorageServiceSpy.setItem('loggedUser', testForm.value);
      userServiceMock.userDisplayName = localStorageServiceSpy.getItem('loggedUser');
      expect(userServiceMock.loggedIn).toBeTruthy;
      expect(localStorageServiceSpy.setItem).toHaveBeenCalledWith('loggedUser', testForm.value);
      expect(localStorageServiceSpy.setItem).toHaveBeenCalledTimes(1);
      expect(userServiceMock.loginUser).toHaveBeenCalledWith(testForm.value);
      expect(userServiceMock.userDisplayName).toEqual('naveenchpt@gmail.com');
    });

    it('should have redirect to login when user is loggedOut', () => {
      const req = routerMock.navigateByUrl('/login');
      expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/login');
      expect(userServiceMock.loggedIn).toBeFalsy;
    });

    it('should have called resetUser', () => {
      const req = userServiceMock.resetUser(testForm.value);
      expect(userServiceMock.resetUser).toHaveBeenCalledWith(testForm.value);
    });

    it('should have called resetPassword', () => {
      const req = userServiceMock.resetPassword(testForm.value);
      expect(userServiceMock.resetPassword).toHaveBeenCalledWith(testForm.value);
    });

    it('should have called registerUser', () => {
      const req = userServiceMock.registerUser(testForm.value);
      expect(userServiceMock.registerUser).toHaveBeenCalledWith(testForm.value);
    });

    it('should have called adminLogin', () => {
      const req = userServiceMock.adminLogin(testForm.value);
      expect(userServiceMock.adminLogin).toHaveBeenCalledWith(testForm.value);
    });
    
    it('should get boolean value whether user is logged in or not if loggedin it should return true', () =>{
      expect(userServiceMock.isLoggedIn).toBeTruthy;
    })
  });

});
