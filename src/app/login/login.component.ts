import { Component, OnInit } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ErrormessageComponent } from '../errormessage/errormessage.component';
import { UserLog } from '../shared/user.model';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public login: UserLog;
  public loginUser: any;
  public invalidLogin = false;
  public isLoggedIn$: Observable<boolean>;
  public user: Observable<UserLog>;
  public errorMessage: boolean = false;
  public msg: null;

  public constructor(private userService: UserService,
    public readonly router: Router) { }
    
  public ngOnInit(): void {
    this.resetForm();
  }

  public onclick() {
    localStorage.removeItem('loggedUser');
  }

  public resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.login = {
      Email: '',
      Password: '',
    }
  }

  public async OnSubmit(form: NgForm): Promise<void> {
    this.login = form.value;
    try {
      await this.userService.loginUser(form.value).toPromise();
      this.router.navigateByUrl('home');
    }
    catch (errorMessage) {
      if (errorMessage.status === 401) {
        this.errorMessage = true;
      }
    }
  }
}
