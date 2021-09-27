import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Pass } from '../shared/user.model';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  public pass: Pass;
  public errorMessage: boolean = false;
  constructor(private userService: UserService,
    public readonly router: Router) { }

  ngOnInit(): void {
    this.resetForm();
  }

  public resetForm(form?: NgForm) {
    if (form != null)
      form.reset;
  }

  public async OnSubmit(form: NgForm): Promise<void> {
    this.pass = form.value;
    try {
      await this.userService.resetPassword(form.value).toPromise();
      this.router.navigateByUrl('login');
      this.resetForm(form);
    }
    catch (errorMessage) {
      if (errorMessage.status === true) {
        this.errorMessage = true;
      }
    }

  }

}
