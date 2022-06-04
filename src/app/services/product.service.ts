import { HttpClient } from '@angular/common/http';
import { apiUrl } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { ProductInfo } from '../models/product-info';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productUrl = `${apiUrl}/product`;
  private categoryUrl = `${apiUrl}/category`;

  constructor(private http: HttpClient) {}

  getAllInPage(page: number, size: number): Observable<any> {
    const url = `${this.productUrl}?page=${page}&size=${size}`;
    return this.http
      .get(url)
      .pipe
      // tap(_ => console.log(_)),
      ();
  }

  getCategoryInPage(
    categoryType: number,
    page: number,
    size: number
  ): Observable<any> {
    const url = `${this.categoryUrl}/${categoryType}?page=${page}&size=${size}`;
    return this.http
      .get(url)
      .pipe
      // tap(data => console.log(data))
      ();
  }

  getDetail(id: String): Observable<ProductInfo> {
    const url = `${this.productUrl}/${id}`;
    return this.http.get<ProductInfo>(url).pipe(
      catchError((_) => {
        console.log('Get Detail Failed');
        return of(new ProductInfo());
      })
    );
  }

  update(productInfo: ProductInfo): Observable<ProductInfo> {
    const url = `${apiUrl}/seller/product/${productInfo.productId}/edit`;
    return this.http.put<ProductInfo>(url, productInfo);
  }

  create(productInfo: ProductInfo): Observable<ProductInfo> {
    const url = `${apiUrl}/seller/product/new`;
    return this.http.post<ProductInfo>(url, productInfo);
  }

  delete(productInfo: ProductInfo): Observable<any> {
    const url = `${apiUrl}/seller/product/${productInfo.productId}/delete`;
    return this.http.delete(url);
  }

  searchProducts(theKeyword: string): Observable<ProductInfo[]> {
    const searchUrl = `${this.productUrl}/search?name=${theKeyword}`;
    return this.http.get<ProductInfo[]>(searchUrl);
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
