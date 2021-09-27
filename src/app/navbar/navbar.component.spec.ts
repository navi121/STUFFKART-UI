import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { DashBoardService } from '../shared/dash-board.service';
import { Search } from '../shared/user.model';
import { UserService } from '../shared/user.service';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let userServiceMock: jasmine.SpyObj<UserService>;
  let dashBoardServiceMock: jasmine.SpyObj<DashBoardService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [
        {
          provide: UserService,
          useValue: jasmine.createSpyObj<UserService>('UserService', ['logOut'])
        },
        {
          provide: DashBoardService,
          useValue: jasmine.createSpyObj<DashBoardService>('DashBoardService', ['searchCategory','searchProduct'])
        }
      ],
      imports: [FormsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    userServiceMock = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    dashBoardServiceMock = TestBed.inject(DashBoardService) as jasmine.SpyObj<DashBoardService>;
  });

  fdescribe('function Calls', () => {
    var searchText = "allen solly";
    var keyword= "Men";

    it('should have called logOut function', () => {
      const req=userServiceMock.logOut();
      expect(userServiceMock.logOut).toHaveBeenCalledTimes(1);
    });

    it('should have called searchCategory()', () => {
       const req=dashBoardServiceMock.searchCategory(keyword);
       expect(dashBoardServiceMock.searchCategory).toHaveBeenCalledWith(keyword);
    });

    it('should have called search()', () => {
      const req=dashBoardServiceMock.searchProduct(searchText);
      expect(dashBoardServiceMock.searchProduct).toHaveBeenCalledWith(searchText);
    });

  })
});
