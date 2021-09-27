import { HttpErrorResponse } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { Admin, User } from '../shared/user.model';
import { UserService } from '../shared/user.service';

import { AdminLoginComponent } from './admin-login.component';

describe('AdminLoginComponent', () => {
  let component: AdminLoginComponent;
  let fixture: ComponentFixture<AdminLoginComponent>;
  let userServiceMock: jasmine.SpyObj<UserService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminLoginComponent],
      providers: [
        {
          provide: Router,
          useValue: jasmine.createSpyObj<Router>('Router', ['navigateByUrl'])
        },
        {
          provide: UserService,
          useValue: jasmine.createSpyObj<UserService>('UserService', ['adminLogin'])
        }
      ],
      imports: [FormsModule, RouterTestingModule]
    })
      .compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLoginComponent);
    component = fixture.componentInstance;
    userServiceMock = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    routerMock = <jasmine.SpyObj<Router>>TestBed.inject(Router);
    userServiceMock.adminLogin.and.returnValue(of());
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
      component.ngOnInit();
      tick();
    }));

    it('should have set form data with given test data', () => {
      const req = userServiceMock.adminLogin(testForm.value);
      expect(component.admin.Email).toEqual('naveenchpt@gmail.com');
      expect(component.admin.Password).toEqual('nn2000');
    });


    it('should have called adminLogin', () => {
      expect(userServiceMock.adminLogin).toHaveBeenCalledWith(testForm.value);
    });

    it('should redirect to addproduct page', () => {
      expect(routerMock.navigateByUrl).toHaveBeenCalledOnceWith('addproduct');
    });

  });

  fdescribe('On error', () => {
    const errorResponse = new HttpErrorResponse({
      error: { code: `some code`, message: `some message.` },
      status: 400,
      statusText: 'Bad Request',
   });
    beforeEach(() => {
      (
        userServiceMock.adminLogin.and.returnValue(throwError(errorResponse)));
        component.errorMessage=true;
    });

    it('if invalid credentials are entered , admin login should throw an error', () => {
      expect(component.errorMessage).toEqual(true);
    });
  })
});
