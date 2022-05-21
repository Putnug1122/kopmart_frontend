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
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'category/:id', component: CardComponent },
  { path: 'cart', component: CartComponent },
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
    path: 'seller/product/:id/edit',
    component: ProductEditComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Manager, Role.Employee] },
  },
  {
    path: 'seller/product/:id/new',
    component: ProductEditComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Employee] },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
