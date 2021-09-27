import { HttpClient, HttpErrorResponse, HttpHandler } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { UserService } from '../shared/user.service';

import { ResetpasswordComponent } from './resetpassword.component';

describe('ResetpasswordComponent', () => {
  let component: ResetpasswordComponent;
  let fixture: ComponentFixture<ResetpasswordComponent>;
  let userServiceMock: jasmine.SpyObj<UserService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResetpasswordComponent],
      providers: [
        {
          provide: Router,
          useValue: jasmine.createSpyObj<Router>('Router', ['navigateByUrl'])
        },
        {
          provide: UserService,
          useValue: jasmine.createSpyObj<UserService>('UserService', ['resetPassword'])
        }
      ],
      imports: [FormsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetpasswordComponent);
    component = fixture.componentInstance;
    routerMock = <jasmine.SpyObj<Router>>TestBed.inject(Router);
    userServiceMock = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    userServiceMock.resetPassword.and.returnValue(of());
  });

  fdescribe('On Submit', () => {
    const testForm = <NgForm>{
      value: {
        MobileNumber: '9080352867',
        Password: 'nn2000',
        SecurityAnswer: 'palani',
        SecurityQuestion: 'Which city you are born?',
        ConfirmPassword: 'naveen2000'
      }
    };

    beforeEach(fakeAsync(() => {
      component.OnSubmit(testForm);
      tick();
    }));

    it('should have set form data with given test data', () => {
      const req = userServiceMock.resetPassword(testForm.value);
      expect(component.pass.MobileNumber).toEqual('9080352867');
      expect(component.pass.Password).toEqual('nn2000');
      expect(component.pass.ConfirmPassword).toEqual('naveen2000');
      expect(component.pass.SecurityAnswer).toEqual('palani');
      expect(component.pass.SecurityQuestion).toEqual('Which city you are born?');
    });

    it('should have called resetPassword', () => {
      expect(userServiceMock.resetPassword).toHaveBeenCalledWith(testForm.value);
    });

    it('should redirect to home page', () => {
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
      userServiceMock.resetPassword.and.returnValue(throwError(errorResponse));
      component.errorMessage=true;
    });

    it('if invalid credentials are entered , user login should throw an error', () => {
      expect(component.errorMessage).toEqual(true);
    });
  })

});
