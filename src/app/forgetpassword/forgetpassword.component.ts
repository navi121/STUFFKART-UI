import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { Reset } from '../shared/user.model';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {

  public reset: Reset;
  public errorMessage: boolean = false;
  public constructor(private userService: UserService,
    public readonly router: Router) { }

  public ngOnInit(): void {
    this.resetForm();
  }

  public resetForm(form?: NgForm) {
    if (form != null)
      form.reset;
  }

  public async OnSubmit(form: NgForm): Promise<void> {
    this.reset=form.value;
    try {
      await this.userService.resetUser(form.value).toPromise();
      this.router.navigateByUrl('pass');
    }
    catch (errorResponse) {
      if (errorResponse.status === 400) {
        this.errorMessage = true;
      }
    }

  }
}
