import { apiUrl } from './../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { JwtResponse } from './../response/jwt-response';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUserSubject: BehaviorSubject<JwtResponse>;
  public currentUser: Observable<JwtResponse>;
  public nameTerms = new Subject<string>();
  public name$ = this.nameTerms.asObservable();
  constructor(private http: HttpClient, private cookieService: CookieService) {
    const memo = localStorage.getItem('currentUser')!;
    this.currentUserSubject = new BehaviorSubject<JwtResponse>(
      JSON.parse(memo)
    );
    this.currentUser = this.currentUserSubject.asObservable();
    cookieService.set('currentUser', memo);
  }

  get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(loginForm: any): Observable<JwtResponse | null> {
    const url = `${apiUrl}/login`;
    return this.http.post<JwtResponse>(url, loginForm).pipe(
      tap((user) => {
        if (user && user.token) {
          this.cookieService.set('currentUser', JSON.stringify(user));
          if (loginForm.remembered) {
            localStorage.setItem('currentUser', JSON.stringify(user));
          }
          console.log(user.name);
          this.nameTerms.next(user.name);
          this.currentUserSubject.next(user);
          return user;
        }
      }),
      catchError(this.handleError('Login Failed', null))
    );
  }

  logout() {
    this.currentUserSubject.next(new JwtResponse());
    localStorage.removeItem('currentUser');
    this.cookieService.delete('currentUser');
  }

  signUp(user: User): Observable<User> {
    const url = `${apiUrl}/register`;
    return this.http.post<User>(url, user);
  }

  update(user: User): Observable<User> {
    const url = `${apiUrl}/profile`;
    return this.http.put<User>(url, user);
  }

  get(email: string): Observable<User> {
    const url = `${apiUrl}/profile/${email}`;
    return this.http.get<User>(url);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}