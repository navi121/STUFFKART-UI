import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from '../shared/user.model';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  public admin: Admin;
  public errorMessage: boolean=false;
  public constructor(private userService: UserService,
    private router: Router) { }

  public ngOnInit(): void {
    this.resetForm();
  }

  public resetForm(form?: NgForm) {
    if (form != null)
      form.reset;
  }

  public async OnSubmit(form: NgForm): Promise<void> {
    this.admin=form.value;
    try {
      await this.userService.adminLogin(form.value).toPromise();
      this.router.navigateByUrl('addproduct');
      this.resetForm(form);
    }
    catch (errorResponse) {
      if (errorResponse.status === 401) {
        this.errorMessage = true;
      }
    }
  }
}