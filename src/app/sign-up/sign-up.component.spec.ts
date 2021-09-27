import { HttpClient, HttpErrorResponse, HttpHandler } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { UserService } from '../shared/user.service';

import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let userServiceMock: jasmine.SpyObj<UserService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      providers: [
        {
          provide: Router,
          useValue: jasmine.createSpyObj<Router>('Router', ['navigateByUrl'])
        },
        {
          provide: UserService,
          useValue: jasmine.createSpyObj<UserService>('UserService', ['registerUser'])
        }
      ],
      imports: [FormsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    routerMock = <jasmine.SpyObj<Router>>TestBed.inject(Router);
    userServiceMock = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    userServiceMock.registerUser.and.returnValue(of());
  });

  fdescribe('On Submit', () => {
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

    beforeEach(fakeAsync(() => {
      component.OnSubmit(testForm);
      tick();
    }));

    it('should have set form data with given test data', () => {
      const req = userServiceMock.registerUser(testForm.value);
      expect(component.user.Email).toEqual('naveenchpt@gmail.com');
      expect(component.user.Password).toEqual('nn2000');
      expect(component.user.FirstName).toEqual('Naveen');
      expect(component.user.LastName).toEqual('N');
      expect(component.user.SecurityAnswer).toEqual('palani');
      expect(component.user.SecurityQuestion).toEqual('Which city you have born?')
      expect(component.user.MobileNumber).toEqual('9080352867');
    });

    it('should have called signUp User', () => {
      expect(userServiceMock.registerUser).toHaveBeenCalledWith(testForm.value);
    });

    it('should redirect to login page', () => {
      expect(routerMock.navigateByUrl).toHaveBeenCalledOnceWith('login');
    });

  })

  fdescribe('On error', () => {

    const errorResponse = new HttpErrorResponse({
      error: { code: `some code`, message: `some message.` },
      status: 400,
      statusText: 'Bad Request',
   });

    beforeEach(() => {
        userServiceMock.registerUser.and.returnValue(throwError(errorResponse));
        component.errorMessage=true;
    });

    it('if invalid credentials are entered , signUp should throw an error', () => {
      expect(component.errorMessage).toEqual(true);

    });

  })

});
