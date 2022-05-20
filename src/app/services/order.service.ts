import { Order } from './../models/order';
import { catchError, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orderUrl = `${apiUrl}/order`;

  constructor(private http: HttpClient) {}

  getPage(page = 1, size = 10): Observable<any> {
    return this.http.get(`${this.orderUrl}?page=${page}&size=${size}`);
  }

  show(id: any): Observable<Order> {
    return this.http
      .get<Order>(`${this.orderUrl}/${id}`)
      .pipe(catchError((_) => of(new Order())));
  }

  cancel(id: any): Observable<Order> {
    return this.http
      .patch<Order>(`${this.orderUrl}/cancel/${id}`, null)
      .pipe(catchError((_) => of(new Order())));
  }

  finish(id: any): Observable<Order> {
    return this.http
      .patch<Order>(`${this.orderUrl}/finish/${id}`, null)
      .pipe(catchError((_) => of(new Order())));
  }
}
