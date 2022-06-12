import { apiUrl } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { UserService } from './user.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { JwtResponse } from './../response/jwt-response';
import { Item } from './../models/item';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ProductInOrder } from '../models/product-in-order';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartUrl = `${apiUrl}/cart`;

  localMap = {};

  private itemsSubject: BehaviorSubject<Item[]>;
  private totalSubject: BehaviorSubject<number>;
  public items: Observable<Item[]>;
  public total: Observable<number>;

  private currentUser: JwtResponse;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private userService: UserService
  ) {
    this.itemsSubject = new BehaviorSubject<Item[]>([]);
    this.items = this.itemsSubject.asObservable();
    this.totalSubject = new BehaviorSubject<number>(0);
    this.total = this.totalSubject.asObservable();
    this.userService.currentUser.subscribe((user) => (this.currentUser = user));
  }

  private getLocalCart(): ProductInOrder[] {
    if (this.cookieService.check('cart')) {
      this.localMap = JSON.parse(this.cookieService.get('cart'));
      return Object.values(this.localMap);
    } else {
      this.localMap = {};
      return [];
    }
  }

  getCart(): Observable<ProductInOrder[] | ProductInOrder> {
    const localCart = this.getLocalCart();
    if (this.currentUser) {
      if (localCart.length > 0) {
        return this.http.post<Cart>(this.cartUrl, localCart).pipe(
          tap((_) => {
            this.clearLocalCart();
          }),
          map((cart) => cart.products),
          catchError((_) => of([]))
        );
      } else {
        return this.http.get<Cart>(this.cartUrl).pipe(
          map((cart) => cart.products),
          catchError((_) => of([]))
        );
      }
    } else {
      return of(localCart);
    }
  }

  addItem(productInOrder: any): Observable<boolean> {
    if (!this.currentUser) {
      if (this.cookieService.check('cart')) {
        this.localMap = JSON.parse(this.cookieService.get('cart'));
      }
      if (!this.localMap[productInOrder.productId]) {
        this.localMap[productInOrder.productId] = productInOrder;
      } else {
        this.localMap[productInOrder.productId].count += productInOrder.count;
      }
      this.cookieService.set('cart', JSON.stringify(this.localMap));
      return of(true);
    } else {
      const url = `${this.cartUrl}/add`;
      return this.http.post<boolean>(url, {
        quantity: productInOrder.count,
        productId: productInOrder.productId,
      });
    }
  }

  update(productInOrder: any): Observable<ProductInOrder> {
    if (this.currentUser) {
      const url = `${this.cartUrl}/${productInOrder.productId}`;
      return this.http.put<ProductInOrder>(url, productInOrder.count);
    }
  }

  remove(productInOrder: any) {
    if (!this.currentUser) {
      delete this.localMap[productInOrder.productId];
      return of(null);
    } else {
      const url = `${this.cartUrl}/${productInOrder.productId}`;
      return this.http.delete(url).pipe();
    }
  }

  checkout(): Observable<any> {
    const url = `${this.cartUrl}/checkout`;
    return this.http.post(url, null).pipe();
  }

  storeLocalCart() {
    this.cookieService.set('cart', JSON.stringify(this.localMap));
  }

  clearLocalCart() {
    console.log('clear local cart');
    this.cookieService.delete('cart');
    this.localMap = {};
  }
}
