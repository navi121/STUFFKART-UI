import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddItem, User, UserLog, CartItem, Reset, Pass, Admin, Img } from './user.model';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { DashBoardService } from './dash-board.service';
@Injectable()

export class UserService {
  public userDisplayName: string | null;
  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public header: any;

  public get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  readonly rootUrl = 'http://localhost:50280';
  constructor(private http: HttpClient,
    private router: Router,private dashboard: DashBoardService) { }

  public loginUser(login: UserLog): Observable<any> {
    this.loggedIn.next(true);
    localStorage.setItem('loggedUser', login.Email);
    this.userDisplayName = localStorage.getItem('loggedUser');
    const body: UserLog = {
      Password: login.Password,
      Email: login.Email,
    }
    return this.http.post(this.rootUrl + '/UserLogin', body,{responseType: 'text'});
  }

  public logOut() {
    this.loggedIn.next(false);
    localStorage.removeItem('token');
    this.dashboard.list=[];
    this.router.navigateByUrl('/login');
  }

  public resetUser(reset: Reset): Observable<any> {
    const body: Reset = {
      Email: reset.Email
    }
    return this.http.post(this.rootUrl + '/ForgetPassword', body);
  }

  public resetPassword(pass: Pass) {
    const body: Pass = {
      ConfirmPassword: pass.ConfirmPassword,
      Password: pass.Password,
      MobileNumber: pass.MobileNumber,
      SecurityAnswer: pass.SecurityAnswer,
      SecurityQuestion: pass.SecurityQuestion
    }
    return this.http.put(this.rootUrl + '/UserResetPassword/' + pass.MobileNumber, body);
  }

  public registerUser(user: User) {
    const body: User = {
      MobileNumber: user.MobileNumber,
      Password: user.Password,
      Email: user.Email,
      FirstName: user.FirstName,
      LastName: user.LastName,
      SecurityAnswer: user.SecurityAnswer,
      SecurityQuestion: user.SecurityQuestion
    }
    return this.http.post(this.rootUrl + '/AddUser', body);
  }

  public adminLogin(admin: Admin): Observable<any> {
    const body: Admin = {
      Password: admin.Password,
      Email: admin.Email
    }
    return this.http.post(this.rootUrl + '/AdminUserLogin', body);
  }
}
