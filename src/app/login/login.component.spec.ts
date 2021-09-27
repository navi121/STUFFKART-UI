import { HttpErrorResponse } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { UserService } from '../shared/user.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let routerMock: jasmine.SpyObj<Router>;
  let userServiceMock: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        {
          provide: Router,
          useValue: jasmine.createSpyObj<Router>('Router', ['navigateByUrl'])
        },
        {
          provide: UserService,
          useValue: jasmine.createSpyObj<UserService>('UserService', ['loginUser'])
        }
      ],
      imports: [FormsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    routerMock = <jasmine.SpyObj<Router>>TestBed.inject(Router);
    userServiceMock = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    userServiceMock.loginUser.and.returnValue(of());
  });

  fdescribe('On Submit', () => {
    const testForm = <NgForm>{
      value: {
        Email: 'naveenchpt@gmail.com',
        Password: 'nn2000'
      }
    };

    beforeEach(fakeAsync(() => {
      component.OnSubmit(testForm);
      tick();
    }));

    it('should have set form data with given test data', () => {
      const req = userServiceMock.loginUser(testForm.value);
      expect(component.login.Email).toEqual('naveenchpt@gmail.com');
      expect(component.login.Password).toEqual('nn2000');
    });


    it('should have called loginUser', () => {
      expect(userServiceMock.loginUser).toHaveBeenCalledWith(testForm.value);
    });

    it('should redirect to home page', () => {
      expect(routerMock.navigateByUrl).toHaveBeenCalledOnceWith('home');
    });

  })

  fdescribe('On error', () => {

    const errorResponse = new HttpErrorResponse({
      error: { code: `some code`, message: `some message.` },
      status: 400,
      statusText: 'Bad Request',
   });

    beforeEach(() => {
      userServiceMock.loginUser.and.returnValue(throwError(errorResponse));
      component.errorMessage=true;
    });

    it('if invalid credentials are entered , user login should throw an error', () => {
      expect(component.errorMessage).toEqual(true);
    });
  })

});
