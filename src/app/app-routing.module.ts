import { AddProductComponent } from './pages/add-product/add-product.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { CheckoutSuccessComponent } from './pages/checkout-success/checkout-success.component';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { OrderComponent } from './pages/order/order.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { Role } from 'src/app/enum/role';
import { AuthGuard } from './_guards/auth.guard';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { CardComponent } from './pages/card/card.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  { path: 'shop', component: CardComponent },
  { path: 'search/:keyword', component: SearchPageComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'category/:id', component: CardComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout-success', component: CheckoutSuccessComponent },
  {
    path: 'order/:id',
    component: OrderDetailComponent,
    canActivate: [AuthGuard],
  },
  { path: 'order', component: OrderComponent, canActivate: [AuthGuard] },
  { path: 'seller', redirectTo: 'seller/product', pathMatch: 'full' },
  {
    path: 'seller/product',
    component: ProductListComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Manager, Role.Employee] },
  },
  {
    path: 'profile',
    component: UserEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'seller/product/:id/edit',
    component: ProductEditComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Manager, Role.Employee] },
  },
  {
    path: 'seller/product/new',
    component: AddProductComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Manager] },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
