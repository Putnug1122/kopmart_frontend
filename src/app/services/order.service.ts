import { Order } from './../models/order';
import { catchError, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  baseUrl = environment.baseUrl;
  private orderUrl = `${this.baseUrl}/order`;

  constructor(private http: HttpClient) {}

  getPage(page = 1, size = 10): Observable<any> {
    return this.http.get(`${this.orderUrl}?page=${page}&size=${size}`);
  }

  show(id): Observable<Order> {
    return this.http
      .get<Order>(`${this.orderUrl}/${id}`)
      .pipe(catchError((_) => of(null)));
  }

  cancel(id): Observable<Order> {
    return this.http
      .patch<Order>(`${this.orderUrl}/cancel/${id}`, null)
      .pipe(catchError((_) => of(null)));
  }

  finish(id): Observable<Order> {
    return this.http
      .patch<Order>(`${this.orderUrl}/finish/${id}`, null)
      .pipe(catchError((_) => of(null)));
  }
}
