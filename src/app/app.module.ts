import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserService } from './shared/user.service';
import { HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { ErrormessageComponent } from './errormessage/errormessage.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { CarouselComponent } from './carousel/carousel.component';
import { AdminuploadComponent } from './adminupload/adminupload.component';
import { CartdetailsComponent } from './cartdetails/cartdetails.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { MyOrdersComponent } from './my-orders/my-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    HomePageComponent,
    LoginComponent,
    ErrormessageComponent,
    NavbarComponent,
    CarouselComponent,
    AdminuploadComponent,
    CartdetailsComponent,
    CheckoutComponent,
    ForgetpasswordComponent,
    ResetpasswordComponent,
    AdminLoginComponent,
    MyOrdersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    NgxPaginationModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [UserService],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
