import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public user: User;
  public errorMessage: boolean = false;
  public constructor(private userService: UserService,
    public readonly router: Router) { }

  public ngOnInit(): void {
    this.resetForm();
  }
  public resetForm(form?: NgForm) {
    if (form != null)
      form.reset;
    this.user = {
      Password: '',
      Email: '',
      FirstName: '',
      LastName: '',
      SecurityQuestion: '',
      SecurityAnswer: '',
      MobileNumber: ''
    }
  }

  public async OnSubmit(form: NgForm): Promise<void> {
    this.user = form.value;
    try {
      await this.userService.registerUser(form.value).toPromise();
      this.router.navigateByUrl('login');
      this.resetForm(form);
    }
    catch (errorResponse) {
      if (errorResponse.status === 400) {
        this.errorMessage = true;
      }
    }
  }
}
