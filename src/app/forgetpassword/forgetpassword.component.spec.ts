import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { UserService } from '../shared/user.service';

import { ForgetpasswordComponent } from './forgetpassword.component';

describe('ForgetpasswordComponent', () => {
  let component: ForgetpasswordComponent;
  let fixture: ComponentFixture<ForgetpasswordComponent>;
  let userServiceMock: jasmine.SpyObj<UserService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgetpasswordComponent ],
      providers:[
        {
          provide: Router,
          useValue: jasmine.createSpyObj<Router>('Router', ['navigateByUrl'])
        },
        {
          provide:UserService,
         useValue: jasmine.createSpyObj<UserService>('UserService', ['resetUser'])
        }
       ],
       imports: [FormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetpasswordComponent);
    component = fixture.componentInstance;
    userServiceMock = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    userServiceMock.resetUser.and.returnValue(of());
    routerMock = <jasmine.SpyObj<Router>>TestBed.inject(Router);
  });

  fdescribe('On Submit', () => {
    const testForm = <NgForm>{
      value: {
        Email: 'naveenchpt@gmail.com'
      }
    };

    beforeEach(fakeAsync(() => {
      component.OnSubmit(testForm);
      tick();
    }));

    it('should have set form data with given test data', () => {
      const req = userServiceMock.resetUser(testForm.value);
      expect(component.reset.Email).toEqual('naveenchpt@gmail.com');
    });


    it('should have called resetUser', () => {
      expect(userServiceMock.resetUser).toHaveBeenCalledWith(testForm.value);
    });

    it('should redirect to resetPassword page', () => {
      expect(routerMock.navigateByUrl).toHaveBeenCalledOnceWith('pass');
    });

  });
  
  fdescribe('On error', () => {

    const errorResponse = new HttpErrorResponse({
      error: { code: `some code`, message: `some message.` },
      status: 400,
      statusText: 'Bad Request',
   });

    beforeEach(() => {
      userServiceMock.resetUser.and.returnValue(throwError(errorResponse));
      component.errorMessage=true;
    });

    it('if invalid credentials are entered , admin login should throw an error', () => {
      expect(component.errorMessage).toEqual(true);
    });
  })

});
