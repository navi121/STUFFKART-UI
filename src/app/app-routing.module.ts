import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminuploadComponent } from './adminupload/adminupload.component';
import { CartdetailsComponent } from './cartdetails/cartdetails.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ErrormessageComponent } from './errormessage/errormessage.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { MyOrdersComponent } from './my-orders/my-orders.component';
const routes: Routes = [
  {path:'loggedUser', component:SignUpComponent},
  {path:'home', component:HomePageComponent},
  {path:'login',component: LoginComponent},
  {path:'signup',component:SignUpComponent},
  {path:'addproduct',component:AdminuploadComponent},
  {path:'cart',component:CartdetailsComponent},
  {path:'checkout',component:CheckoutComponent},
  {path:'error',component:ErrormessageComponent},
  {path:'forget',component:ForgetpasswordComponent},
  {path:'pass',component:ResetpasswordComponent},
  {path:'admin',component:AdminLoginComponent},
  {path:'navbar',component:NavbarComponent},
  {path:'order',component:MyOrdersComponent},
  {path:'',redirectTo:'/login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
