import { ErrorInterceptorService } from './_interceptors/error-interceptor.service';
import { NavigationComponent } from './parts/navigation/navigation.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './pages/card/card.component';
import { CartComponent } from './pages/cart/cart.component';
import { LoginComponent } from './pages/login/login.component';
import { OrderComponent } from './pages/order/order.component';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { PaginationComponent } from './parts/pagination/pagination.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { JwtInterceptorService } from './_interceptors/jwt-interceptor.service';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';
import { CheckoutSuccessComponent } from './pages/checkout-success/checkout-success.component';
import { NgToastModule } from 'ng-angular-popup';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CartComponent,
    LoginComponent,
    OrderComponent,
    OrderDetailComponent,
    ProductDetailComponent,
    ProductListComponent,
    SignupComponent,
    UserEditComponent,
    NavigationComponent,
    PaginationComponent,
    HomeComponent,
    SearchComponent,
    ProductEditComponent,
    CheckoutSuccessComponent,
    ChangePasswordComponent,
    SearchPageComponent,
    AddProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgToastModule,
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
