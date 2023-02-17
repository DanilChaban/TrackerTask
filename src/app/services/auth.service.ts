import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {environment} from "../../environments/environment";
import {User} from "../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token = '';

  constructor(private httpClient: HttpClient) {
  }

  register(registerData: User): Observable<User> {
    const url = environment.apiUrl + '/auth/sign-up';
    return this.httpClient.post<User>(url, registerData)
  }

  login(loginData: User): Observable<{token: string}> {
    const url = environment.apiUrl + '/auth/sign-in';
    return this.httpClient.post<{token: string}>(url, loginData)
      .pipe(
        tap(({token}) => {
          localStorage.setItem('auth-token', token);
          this.setToken(token);
        })
      )
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken(): string {
    return localStorage.getItem('auth-token')!;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth-token');
  }
}
